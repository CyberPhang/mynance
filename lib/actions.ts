"use server";

import { registerSchema, newTransactionSchema } from "./schemas";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return "Invalid Credentials";
                default:
                    return "Something went wrong.";
            }
        }
        throw e;
    }
}

type FormState = | {
    errors?: {
        email?: string[]
        password?: string[]
    },
} | undefined

export async function signUp(state: FormState, formData: FormData) {
    const values = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = !!(await db.user.findUnique({ where: { email } }));

    if (userExists) {
        return { errors: {
            email: ["Email already registered"]
        } };
    }

    try {
        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        await db.balance.create({
            data: {
                userId: user.id,
                amount: 0,
            },
        });

    } catch (e) {
        return {
            message: "An error occurred while creating your account: " + e, 
        };
    }

    await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
    });

    return { message: "Successfully created account" };
}

export async function logout() {
    await signOut();
}

type TransactionFormState = | {
    errors?: {
        amount?: string[]
        category?: string[]
    },
    message?: string,
} | undefined

export async function createNewDeposit(state: TransactionFormState, formData: FormData) {
    const values = {
        amount: Number(formData.get("amount")),
        category: formData.get("category"),
    };

    console.log("Action invoked");

    const validatedFields = newTransactionSchema.safeParse(values);

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return { message: "Something went wrong" };
    }

    const { amount, category } = validatedFields.data;

    await db.balance.update({
        where: {
            userId: session.user.id,
        },
        data: {
            amount: {
                increment: amount
            }
        }
    });

    await db.income.create({
        data: {
            userId: session.user.id,
            amount,
            category,
        }
    });

    revalidatePath("/dashboard/income");
    
    return { message: "Successfully deposited income" };
}

export async function createNewExpense(state: TransactionFormState, formData: FormData) {
    const values = {
        amount: Number(formData.get("amount")),
        category: formData.get("category"),
    };

    console.log("Action invoked");

    const validatedFields = newTransactionSchema.safeParse(values);

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return { message: "Something went wrong" };
    }

    const { amount, category } = validatedFields.data;

    await db.balance.update({
        where: {
            userId: session.user.id,
        },
        data: {
            amount: {
                decrement: amount
            }
        }
    });

    await db.expense.create({
        data: {
            userId: session.user.id,
            amount,
            category,
        }
    });

    revalidatePath("/dashboard/expenses");
    
    return { message: "Successfully added expense" };
}
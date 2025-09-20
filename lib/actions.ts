"use server";

import { registerSchema, newTransactionSchema, newBudgetSchema } from "./schemas";
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
                amount: 0,
                user: {
                    connect: {
                        id: user.id
                    },
                },
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
                increment: amount,
            },
        },
    });

    await db.income.create({
        data: {
            amount,
            category,
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    });

    revalidatePath("/dashboard/income");
    
    return { message: "Successfully deposited income" };
}

export async function createNewExpense(state: TransactionFormState, formData: FormData) {
    const values = {
        amount: Number(formData.get("amount")),
        category: formData.get("category"),
    };

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
                decrement: amount,
            },
        },
    });

    await db.expense.create({
        data: {
            amount,
            category,
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    });

    revalidatePath("/dashboard/expenses");
    
    return { message: "Successfully added expense" };
}

type BudgetFormState = {
    message?: string,
    errors?: {
        housing?: string[],
        groceries?: string[],
        entertainment?: string[],
        transportation?: string[],
        other?: string[],
    }
} | void

export async function createNewBudget(state: BudgetFormState, formData: FormData) {
    const values = {
        housing: Number(formData.get("housing")),
        groceries: Number(formData.get("groceries")),
        entertainment: Number(formData.get("entertainment")),
        transportation: Number(formData.get("transportation")),
        other: Number(formData.get("other")),
    }

    const validatedFields = newBudgetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors }
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return { message: "Something went wrong" };
    }

    const now = new Date();
    const splicedDate = now.toUTCString().split(" ");
    const currMonth: string = splicedDate[2] + " " + splicedDate[3];

    const budgetPeriod = await db.budgetPeriod.create({
        data: {
            month: currMonth,
            user: { 
                connect: { 
                    id: session.user.id,
                },
            },
        },
    });
    
    const { housing, groceries, entertainment, transportation, other } = validatedFields.data;

    await db.budgetCategory.create({
        data: {
            category: "housing",
            amount: housing,
            period: {
                connect: {
                    id: budgetPeriod.id,
                },
            },
        }
    });
    
    await db.budgetCategory.create({
        data: {
            category: "groceries",
            amount: groceries,
            period: {
                connect: {
                    id: budgetPeriod.id,
                },
            },
        }
    });

    await db.budgetCategory.create({
        data: {
            category: "entertainment",
            amount: entertainment,
            period: {
                connect: {
                    id: budgetPeriod.id,
                },
            },
        }
    });

    await db.budgetCategory.create({
        data: {
            category: "transportation",
            amount: transportation,
            period: {
                connect: {
                    id: budgetPeriod.id,
                },
            },
        }
    });

    await db.budgetCategory.create({
        data: {
            category: "other",
            amount: other,
            period: {
                connect: {
                    id: budgetPeriod.id,
                },
            },
        }
    });

    revalidatePath("/dashboard/budgeting");
}
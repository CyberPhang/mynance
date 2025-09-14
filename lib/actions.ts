"use server";

import { registerSchema } from "./schemas";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { db } from "./db";

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
    message?: string,
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
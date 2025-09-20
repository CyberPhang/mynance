import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/schemas";
import { User } from "./lib/generated/prisma";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<User | null> {
    try {
        const user = await db.user.findUnique({ 
            where: { email } 
        });
        return user; 
    } catch (e) {
        console.log("Failed to fetch user: " + e);
        throw new Error("Failed to fetch user");
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt', 
    },
    providers: [
        Credentials({
            credentials: {
                email: { 
                    type: "email",
                    label: "email",
                    placeholder: "john.doe@example.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "******",
                },
            }, 
            authorize: async (credentials) => {
                const parsedCredentials = loginSchema.safeParse(credentials);
                
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }
                console.log("Invalid Credentials");
                return null;
            }   
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (typeof token.id !== "string") {
                throw new Error("Something went wrong");
            }
            session.user.id = token.id;
            return session;
        },
    }
});
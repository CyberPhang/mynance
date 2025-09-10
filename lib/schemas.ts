import z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        error: "Invalid password",
    }),
})

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        error: "Password must be greater than 6 characters",
    }).max(32, {
        error: "Password must be fewer than 32 characters."
    }),
})
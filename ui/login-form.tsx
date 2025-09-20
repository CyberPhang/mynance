"use client";

import { loginSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { font } from "./fonts";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

const LoginForm = () => {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="flex h-full items-center justify-center">
            <Card className="w-[400px] shadow-md">
                <CardHeader>
                    <span className="flex flex-col items-center justify-center gap-2">
                        <span className={`${font.className} text-3xl`}>
                            <CardTitle>Welcome Back</CardTitle>
                        </span>
                        <CardDescription>Enter your credentials.</CardDescription>
                    </span>
                    <CardAction></CardAction>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="flex flex-col gap-4" action={formAction}>
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="email"
                                                placeholder="john.doe@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password"
                                                placeholder="******"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full cursor-pointer" type="submit" disabled={isPending}>
                                Login
                            </Button>
                            {/* <Button className="w-full cursor-pointer" variant="outline">
                                <FcGoogle />
                            </Button> */}
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full cursor-pointer text-muted-foreground" variant="link" asChild>
                        <Link href="/register">
                            Don&apos;t have an account?
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
 
export default LoginForm;
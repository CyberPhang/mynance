"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { newBudgetSchema } from "@/lib/schemas";
import { createNewBudget } from "@/lib/actions";
import { useActionState } from "react";

export function NewBudgetForm() {
    const form = useForm<z.infer<typeof newBudgetSchema>>({
        resolver: zodResolver(newBudgetSchema),
        defaultValues: {
            housing: 0,
            groceries: 0,
            entertainment: 0,
            transportation: 0,
            other: 0,
        },
    });

    const [errorMessage, formAction, isPending] = useActionState(
        createNewBudget,
        undefined,
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary">New Budget</Button>
            </SheetTrigger>
            <SheetContent className="bg-background text-primary">
                <SheetHeader>
                    <SheetTitle>
                        New Budget
                    </SheetTitle>
                    <SheetDescription>
                        Create a budget for this month. Enter in the corresponding budget limits for each of the 
                        expense categories. 
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form id="depositForm" action={formAction} className="space-y-8">
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <FormField 
                                control={form.control}
                                name="housing"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Housing and Utilities</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage?.errors?.housing}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="groceries"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Groceries</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage?.errors?.groceries}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="entertainment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shopping and Entertainment</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage?.errors?.entertainment}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="transportation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transportation</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage?.errors?.transportation}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="other"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Other</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage?.errors?.other}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            {errorMessage?.message}
                        </div>
                    </form>
                </Form>
                <SheetFooter>
                    <Button type="submit" form="depositForm" disabled={isPending} variant="default">
                        Create
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
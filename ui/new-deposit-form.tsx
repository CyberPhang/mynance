"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import z from "zod";
import { newTransactionSchema } from "@/lib/schemas";
import { createNewDeposit } from "@/lib/actions";
import { useActionState } from "react";

export function NewDepositForm() {
    const form = useForm<z.infer<typeof newTransactionSchema>>({
        resolver: zodResolver(newTransactionSchema),
        defaultValues: {
            amount: 0,
            category: "earned",
        }
    });

    const [errorMessage, formAction, isPending] = useActionState(
        createNewDeposit,
        undefined,
    );

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary">New Deposit</Button>
            </SheetTrigger>
            <SheetContent className="bg-background text-primary">
                <SheetHeader>
                    <SheetTitle>
                        New Deposit
                    </SheetTitle>
                    <SheetDescription>
                        Enter the amount and the category for this deposit. Click create when you're done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form id="depositForm" action={formAction} className="space-y-8">
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <FormField 
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errorMessage?.errors?.amount}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="earned">Earned</SelectItem>
                                                <SelectItem value="investments">Investments</SelectItem>
                                                <SelectItem value="passive">Passive</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{errorMessage?.errors?.category}</FormMessage>
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
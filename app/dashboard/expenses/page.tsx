import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllExpenseCategories } from "@/lib/db";
import Expenses from "@/ui/tables/expenses";
import ExpenseCategoryChart from "@/ui/expense-category-chart";
import { Suspense } from "react";
import { NewExpenseForm } from "@/ui/new-expense-form";
import ExpenseCard from "@/ui/expense-card";

const ExpensePage = async () => {
    const expenseCategories = await getAllExpenseCategories();

    return ( 
        <div className="flex w-screen h-screen items-center justify-center ">
            <div className="flex flex-col w-[90%] h-[90%] gap-12">
                <div className="flex flex-row justify-between">
                    <h1 className="font-semibold text-3xl">
                        Expenses
                    </h1>
                    <NewExpenseForm />
                </div>
                <ExpenseCard />
                <Suspense>
                    <ExpenseCategoryChart expenseCategories={expenseCategories.map(
                        ({ category, amount}) => 
                        ({ category, amount: amount.toNumber()})
                    )}/>
                </Suspense>
                <Suspense>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Expense History</CardTitle>
                            <CardDescription>See all your past payments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Expenses />
                        </CardContent>
                    </Card>
                </Suspense>
            </div>
        </div>
    );
}
 
export default ExpensePage;
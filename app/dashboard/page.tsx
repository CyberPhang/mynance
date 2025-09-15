import { auth } from "@/auth";
import { Suspense } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HiOutlineTrendingDown } from "react-icons/hi";
import { getBalance, getRecentIncome, getRecentExpenses, getAllIncomeCategories, getAllExpenseCategories } from "@/lib/db";
import DashboardCardFallback from "@/ui/dashboard-card-fallback";
import IncomeCategoryChart from "@/ui/income-category-chart";
import ExpenseCategoryChart from "@/ui/expense-category-chart";
import { font } from "@/ui/fonts";
import IncomeCard from "@/ui/income-card";

const DashboardPage = async () => { 
    const session = await auth();
    const balance = await getBalance(session?.user?.id);
    const incomeCategories = await getAllIncomeCategories();
    const expenseCategories = await getAllExpenseCategories();

    const USDollar = new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "USD",
    });

    const parsedBalance = balance ? balance.toNumber() : 0;

    return ( 
        <div className="flex w-screen h-screen items-center justify-center ">
            <div className="flex flex-col w-[90%] h-[90%] gap-12">
                <h1 className="font-semibold text-3xl">
                    Dashboard
                </h1>
                <Suspense fallback={<DashboardCardFallback />}>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <IncomeCard />
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Total Expenses</CardDescription>
                                <CardTitle className="text-2xl text-destructive font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {USDollar.format(await getRecentExpenses(session?.user?.id))}
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                                    Your expenses in the past 30 days <HiOutlineTrendingDown className="size-4" />
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Current Balance</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {USDollar.format(parsedBalance)}
                                </CardTitle>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                                    Your total saved balance 
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </Suspense>
                <div className="grid gap-6 grid-cols-2">
                    <Suspense>
                        <IncomeCategoryChart incomeCategories={incomeCategories.map(
                            ({ category, amount}) => 
                            ({ category, amount: amount.toNumber()})
                        )}/>
                    </Suspense>
                    <Suspense>
                        <ExpenseCategoryChart expenseCategories={expenseCategories.map(
                            ({ category, amount}) => 
                            ({ category, amount: amount.toNumber()})
                        )}/>
                    </Suspense>
                </div>
                <div className={`hidden lg:block text-9xl ${font.className}`}>
                    <h1 className="flex items-center justify-center">
                        Mynance
                    </h1>
                </div>
            </div>
        </div>
    );
}
 
export default DashboardPage;

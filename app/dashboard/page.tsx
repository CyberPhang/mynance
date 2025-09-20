import { Suspense } from "react";
import { getAllIncomeCategories, getAllExpenseCategories } from "@/lib/db";
import DashboardCardFallback from "@/ui/dashboard-card-fallback";
import IncomeCategoryChart from "@/ui/income-category-chart";
import ExpenseCategoryChart from "@/ui/expense-category-chart";
import { font } from "@/ui/fonts";
import IncomeCard from "@/ui/income-card";
import ExpenseCard from "@/ui/expense-card";
import BalanceCard from "@/ui/balance-card";

const DashboardPage = async () => { 
    const incomeCategories = await getAllIncomeCategories();
    const expenseCategories = await getAllExpenseCategories();

    return ( 
        <div className="flex w-screen h-screen items-center justify-center ">
            <div className="flex flex-col w-[90%] h-[90%] gap-12">
                <h1 className="font-semibold text-3xl">
                    Dashboard
                </h1>
                <Suspense fallback={<DashboardCardFallback />}>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <IncomeCard />
                        <ExpenseCard />
                        <BalanceCard />
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

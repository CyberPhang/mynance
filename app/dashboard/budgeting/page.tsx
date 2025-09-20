import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import BalanceCard from "@/ui/balance-card";
import Budgets from "@/ui/tables/budgets";
import { Suspense } from "react";
import { NewBudgetForm } from "@/ui/new-budget-form";
import { Progress } from "@/components/ui/progress";
import { getRecentExpenses, getCurrentBudget } from "@/lib/db";

const BudgetingPage = async () => {
    
    const expenses = await getRecentExpenses();
    const budget = await getCurrentBudget();

    return (  
        <div className="flex w-screen h-screen items-center justify-center ">
            <div className="flex flex-col w-[90%] h-[90%] gap-12">
                <div className="flex flex-row justify-between">
                    <h1 className="font-semibold text-3xl">
                        Budgeting
                    </h1>
                    <NewBudgetForm />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Budget Progress</CardTitle>
                        <CardDescription>
                            See how you&apos;re keeping up with your budget this month. The progress 
                            bar below shows how much of your budget you&apos;ve used up. If no progress 
                            bar appears, then you don&apos;t have an active budget, and you can create one 
                            by clicking the button on the top right.
                        </CardDescription>
                    </CardHeader>
                    {budget && <CardContent>
                        <Suspense>
                            <Progress value={expenses / budget * 100}/>
                        </Suspense>
                    </CardContent>}
                </Card>
                <BalanceCard />
                <Card>
                    <CardHeader>
                        <CardTitle>Your Current Budget</CardTitle>
                        <CardDescription>See your current budget.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Suspense>
                            <Budgets />
                        </Suspense>
                    </CardContent>
                </Card>
                
            </div>
        </div>
    );
}
 
export default BudgetingPage;
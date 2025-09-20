import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllIncomeCategories } from "@/lib/db";
import Deposits from "@/ui/tables/deposits";
import IncomeCard from "@/ui/income-card";
import IncomeCategoryChart from "@/ui/income-category-chart";
import { Suspense } from "react";
import { NewDepositForm } from "@/ui/new-deposit-form";

const IncomePage = async () => {
    const incomeCategories = await getAllIncomeCategories();

    return ( 
        <div className="flex w-screen h-screen items-center justify-center ">
            <div className="flex flex-col w-[90%] h-[90%] gap-12">
                <div className="flex flex-row justify-between">
                    <h1 className="font-semibold text-3xl">
                        Income
                    </h1>
                    <NewDepositForm />
                </div>
                <IncomeCard />
                <Suspense>
                    <IncomeCategoryChart incomeCategories={incomeCategories.map(
                        ({ category, amount}) => 
                        ({ category, amount: amount.toNumber()})
                    )}/>
                </Suspense>
                <Suspense>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Income History</CardTitle>
                            <CardDescription>See all your past deposits.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Deposits />
                        </CardContent>
                    </Card>
                </Suspense>
            </div>
        </div>
    );
}
 
export default IncomePage;
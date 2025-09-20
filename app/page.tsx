"use client";

import { font } from "@/ui/fonts";
import { Suspense } from "react";
import Navbar from "@/ui/navbar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart } from "recharts";
import IncomeCategoryChart from "@/ui/income-category-chart";
import ExpenseCategoryChart from "@/ui/expense-category-chart";

export default function Home() {

  const chartData = [
    { type: "earned", amount: 4000 },
    { type: "investments", amount: 1250 },
    { type: "passive", amount: 500 },
    { type: "other", amount: 250 },
  ];

  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>
        <main className="flex flex-col items-center gap-6">
          <h1 className={`max-w-3xl text-center space-y-4 text-7xl ${font.className}`}>
            Mynance: The only personal finance app you need.
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-[50%]">
            <Card className="@container/card ">
              <CardHeader>
                <CardDescription>Total Income</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  $6,000.00
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your income for this month <HiOutlineTrendingUp className="size-4" />
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Total Expenses</CardDescription>
                <CardTitle className="text-2xl text-destructive font-semibold tabular-nums @[250px]/card:text-3xl">
                  $4,750.00
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your expenses for this month <HiOutlineTrendingDown className="size-4" />
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Current Savings</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  $20,000
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your total saved balance 
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-6 grid-cols-2 w-[80%]">
              <IncomeCategoryChart 
                incomeCategories={[
                  { category: "earned", amount: 4000 },
                  { category: "investments", amount: 1250 },
                  { category: "passive", amount: 500 },
                  { category: "other", amount: 250 },
                ]}
              />
              <ExpenseCategoryChart 
                expenseCategories={[
                  { category: "housing", amount: 3000 },
                  { category: "groceries", amount: 500 },
                  { category: "entertainment", amount: 500 },
                  { category: "transportation", amount: 250 },
                  { category: "other", amount: 500 }
                ]}
              />
          </div>
        </main>
      </Suspense>
    </>

  );
}

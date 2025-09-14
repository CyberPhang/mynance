"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

type ExpenseCategoryChartProps = {
    expenseCategories: { 
        category: string,
        amount: number,
    }[]
};

const ExpenseCategoryChart = (props: ExpenseCategoryChartProps) => {
    const expenseCategoryConfig = {
        housing: {
            label: "Housing, Utilities",
            color: "#f54a00",
        },
        groceries: {
            label: "Groceries",
            color: "#009689",
        },
        entertainment: {
            label: "Shopping, Entertainment",
            color: "#104e64",
        },
        transportation: {
            label: "Transportation",
            color: "#ffba00"
        },
        other: {
            label: "Other",
            color: "#fd9a00",
        },
    } satisfies ChartConfig;

    let expenseCategoryData = [
        {type: "housing", amount: 0},
        {type: "groceries", amount: 0},
        {type: "entertainment", amount: 0},
        {type: "transportation", amount: 0},
        {type: "other", amount: 0},
    ];

    for (const { category, amount } of props.expenseCategories) {
        switch (category) {
            case "housing":
                expenseCategoryData[0].amount += amount;
                break;
            case "groceries":
                expenseCategoryData[1].amount += amount;
                break;
            case "entertainment":
                expenseCategoryData[2].amount += amount;
                break;
            case "transportation":
                expenseCategoryData[3].amount += amount;
                break;
            case "other":
                expenseCategoryData[4].amount += amount;
                break;
        } 
    }

    return (  
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Your Expense Sources</CardTitle>
                <CardDescription>From the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config = {expenseCategoryConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <Pie 
                            data={expenseCategoryData} 
                            dataKey="amount" 
                            nameKey="type"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />}/>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
 
export default ExpenseCategoryChart;
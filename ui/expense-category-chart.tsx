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
import { Cell, Pie, PieChart } from "recharts";

type ExpenseCategoryChartProps = {
    expenseCategories: { 
        category: string,
        amount: number,
    }[]
};

const ExpenseCategoryChart = (props: ExpenseCategoryChartProps) => {
    type expenseCategoryConfigType = {
        housing: {
            label: string,
            color: string,
        },
        groceries: {
            label: string,
            color: string,
        },
        entertainment: {
            label: string,
            color: string,
        },
        transportation: {
            label: string,
            color: string,
        },
        other: {
            label: string,
            color: string,
        },
    };

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

    const expenseCategoryData = [
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
                <CardDescription>For this month</CardDescription>
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
                        >
                            {expenseCategoryData.map((entry) => (
                                <Cell 
                                    key={`cell-${entry.type}`} 
                                    fill={expenseCategoryConfig[entry.type as keyof expenseCategoryConfigType].color} 
                                />
                            ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />}/>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
 
export default ExpenseCategoryChart;
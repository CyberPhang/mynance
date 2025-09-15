"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

type IncomeCategoryChartProps = {
    incomeCategories: { 
        category: string,
        amount: number,
    }[]
};

const IncomeCategoryChart = (props: IncomeCategoryChartProps) => {
    type incomeCategoryConfigType = {
        earned: {
            label: string,
            color: string,
        },
        investments: {
            label: string,
            color: string,
        },
        passive: {
            label: string,
            color: string,
        },
        other: {
            label: string,
            color: string,
        },
    };
    
    const incomeCategoryConfig = {
        earned: {
            label: "Earned",
            color: "#f54a00",
        },
        investments: {
            label: "Investments",
            color: "#009689",
        },
        passive: {
            label: "Passive",
            color: "#104e64",
        },
        other: {
            label: "Other",
            color: "#ffba00",
        },
    } satisfies ChartConfig;

    let incomeCategoryData = [
        {type: "earned", amount: 0},
        {type: "investments", amount: 0},
        {type: "passive", amount: 0},
        {type: "other", amount: 0},
    ];

    for (const { category, amount } of props.incomeCategories) {
        switch (category) {
            case "earned":
                incomeCategoryData[0].amount += amount;
                break;
            case "investments":
                incomeCategoryData[1].amount += amount;
                break;
            case "passive":
                incomeCategoryData[2].amount += amount;
                break;
            case "other":
                incomeCategoryData[3].amount += amount;
                break;
        } 
    }

    return (  
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Your Income Sources</CardTitle>
                <CardDescription>From the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config = {incomeCategoryConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart accessibilityLayer>
                        <Pie 
                            data={incomeCategoryData} 
                            dataKey="amount" 
                            nameKey="type"
                        >
                            {incomeCategoryData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${entry.type}`}
                                    fill={incomeCategoryConfig[entry.type as keyof incomeCategoryConfigType].color}
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
 
export default IncomeCategoryChart;
import { db } from "@/lib/db";
import { columns } from "./budget-columns";
import { DataTable } from "./data-table";
import { auth } from "@/auth";

export type Budget = {
    id: string,
    amount: number,
    spent: number,
    remaining: number,
    usage: string,
    category: string,
}

async function getData(): Promise<Budget[]> {
    const session = await auth();

    const now = new Date();
    const splicedDate = now.toUTCString().split(" ");
    const currMonth: string = splicedDate[2] + " " + splicedDate[3];
    
    const rawBudgetData = await db.budgetPeriod.findMany({
        where: {
            userId: session?.user?.id,
            month: currMonth,
        },
        select: {
            month: true,
            categories: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 1,
    });

    const rawExpenseData = await db.expense.findMany({
        where: {
            userId: session?.user?.id,
            createdAt: {
                gt: new Date(now.getFullYear(), now.getMonth()),
            },
        },
    });

    const categorySpending: Map<string, number> = new Map();

    for (const expense of rawExpenseData) {
        const val = categorySpending.get(expense.category) || 0;
        categorySpending.set(expense.category, val + expense.amount.toNumber());
    }

    const budgetPeriod = rawBudgetData[0];

    return budgetPeriod ? budgetPeriod.categories.map(({ id, amount, category }) => (
        {
            id: id.toString(),
            amount: amount.toNumber(),
            spent: categorySpending.get(category) || 0,
            remaining: amount.toNumber() - (categorySpending.get(category) || 0),
            usage: 100 * (categorySpending.get(category) || 0) / amount.toNumber() + "%",
            category: category.charAt(0).toUpperCase() + category.slice(1)
        }
    )) : [];
}

export default async function Budgets() {
    const data = await getData();

    return (
        <div className="container mx-auto py-16">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
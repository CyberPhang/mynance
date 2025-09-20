"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
    id: string,
    amount: number,
    category: string,
    date: string,
}

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
]
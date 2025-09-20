"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Budget } from "@/ui/tables/budgets";

export const columns: ColumnDef<Budget>[] = [
    {
        accessorKey: "category",
        header: "Category",
    },
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
        accessorKey: "spent",
        header: () => <div className="text-right">Spent</div>,
        cell: ({ row }) => {
            const spent = parseFloat(row.getValue("spent"));
            const formatted = new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
            }).format(spent);

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "remaining",
        header: () => <div className="text-right">Remaining</div>,
        cell: ({ row }) => {
            const spent = parseFloat(row.getValue("remaining"));
            const formatted = new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
            }).format(spent);

            return <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "usage",
        header: "Usage",
    },
]
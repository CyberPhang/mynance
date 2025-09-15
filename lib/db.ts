import { PrismaClient } from "./generated/prisma";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export async function getBalance(userId?: string) {
    const balance = await db.balance.findUnique({
        where: { userId }
    });

    return balance?.amount;
}

// TODO: Make these operations O(1)
export async function getRecentIncome(userId?: string) {
    const now = new Date();
    const earliest = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30);

    const incomes = await db.income.findMany({ 
        where: { 
            createdAt: {
                gt: earliest,
            },
        },
    });

    let total = 0;
    for (const income of incomes) {
        total += income.amount.toNumber();
    }

    return total;
}

export async function getRecentExpenses(userId?: string) {
    const now = new Date();
    const earliest = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30);

    const expenses = await db.expense.findMany({ 
        where: { 
            createdAt: {
                gt: earliest,
            },
        },
    });

    let total = 0;
    for (const expense of expenses) {
        total += expense.amount.toNumber();
    }

    return total;
}

export async function getAllIncomeCategories(userId?: string) {
    return await db.income.findMany({
        select: {
            category: true,
            amount: true,
        },
        where: {
            userId,
        },
    });
}

export async function getAllExpenseCategories(userId?: string) {
    return await db.expense.findMany({
        select: {
            category: true,
            amount: true,
        },
        where: {
            userId,
        },
    });
}
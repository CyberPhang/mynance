import { db } from "@/lib/db";
import { columns, Deposit } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@/auth";

async function getData(): Promise<Deposit[]> {
    const session = await auth();

    const rawData = await db.income.findMany({
        where: {
            userId: session?.user?.id
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    function format(s: string) {
        if (s.length == 0) {
            return "";
        } else {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
    }

    return rawData.map(({ id, createdAt, userId, amount, category }) => 
        ({
            id,
            amount: amount.toNumber(),
            category: format(category),
            date: createdAt.toDateString(),
        })
    );
}

export default async function Deposits() {
    const data = await getData();

    return (
        <div className="container mx-auto py-16">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
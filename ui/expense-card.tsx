import { auth } from "@/auth";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { getRecentExpenses } from "@/lib/db";
import { HiOutlineTrendingDown } from "react-icons/hi";

const ExpenseCard = async () => {
    const session = await auth();

    const USDollar = new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "USD",
    });

    return (  
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>Total Expenses</CardDescription>
                <CardTitle className="text-2xl text-destructive font-semibold tabular-nums @[250px]/card:text-3xl">
                    {USDollar.format(await getRecentExpenses(session?.user?.id))}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                    Your expenses for this month <HiOutlineTrendingDown className="size-4" />
                </div>
            </CardFooter>
        </Card>
    );
}
 
export default ExpenseCard;
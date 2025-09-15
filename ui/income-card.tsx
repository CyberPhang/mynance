import { auth } from "@/auth";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { getRecentIncome } from "@/lib/db";
import { HiOutlineTrendingUp } from "react-icons/hi";

const IncomeCard = async () => {
    const session = await auth();

    const USDollar = new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "USD",
    });

    return ( 
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>Total Income</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {USDollar.format(await getRecentIncome(session?.user?.id))}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                    Your income in the past 30 days <HiOutlineTrendingUp className="size-4" />
                </div>
            </CardFooter>
        </Card>
    );
}
 
export default IncomeCard;
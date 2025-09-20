import { auth } from "@/auth";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { getBalance } from "@/lib/db";

const BalanceCard = async () => {
    const session = await auth();
    const balance = await getBalance(session?.user?.id);

    const USDollar = new Intl.NumberFormat('en-us', {
        style: "currency",
        currency: "USD",
    });

    const parsedBalance = balance ? balance.toNumber() : 0;

    return (  
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>Current Balance</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {USDollar.format(parsedBalance)}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                    Your total saved balance 
                </div>
            </CardFooter>
        </Card>
    );
}
 
export default BalanceCard;
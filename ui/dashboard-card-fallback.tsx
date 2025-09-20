import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from "react-icons/hi";

const DashboardCardFallback = () => {
    return (  
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card data-slot="skeleton" className="@container/card bg-accent animate-pulse">
                <CardHeader>
                    <CardDescription>
                        Total Income
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        <Skeleton className="h-[36px] w-full bg-muted"/>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                        Your income for this month <HiOutlineTrendingUp className="size-4" />
                    </div>
                </CardFooter>
            </Card>
            <Card data-slot="skeleton" className="@container/card bg-accent animate-pulse">
                <CardHeader>
                    <CardDescription>
                        Total Expenses
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        <Skeleton className="h-[36px] w-full bg-muted"/>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                        Your expenses for this month <HiOutlineTrendingDown className="size-4" />
                    </div>
                </CardFooter>
            </Card>
            <Card data-slot="skeleton" className="@container/card bg-accent animate-pulse">
                <CardHeader>
                    <CardDescription>
                        Current Balance
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        <Skeleton className="h-[36px] w-full bg-muted"/>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                        Your total saved balance
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
 
export default DashboardCardFallback;
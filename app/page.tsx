"use client";

import { font } from "@/ui/fonts";
import { Suspense } from "react";
import Navbar from "@/ui/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

export default function Home() {

  const chartData = [
    { month: "January", value: 5868.55 }, 
    { month: "February", value: 5994.57 },
    { month: "March", value: 5849.72 },
    { month: "April", value: 5633.07 },
    { month: "May", value: 5604.14 },
    { month: "June", value: 5935.94 },
    { month: "July", value: 6189.01 }, 
    { month: "August", value: 6238.01 },
    { month: "September", value: 6415.54 }
  ];

  const chartConfig = {
    month: {
      label: "Month",
      color: "var(--color-background)",
    },
  } satisfies ChartConfig

  return (
    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
    //       <li className="mb-2 tracking-[-.01em]">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
    //           app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li className="tracking-[-.01em]">
    //         Save and see your changes instantly.
    //       </li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
    
    
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>
        <main className="flex flex-col items-center gap-6">
          <h1 className={`max-w-3xl text-center space-y-4 text-7xl ${font.className}`}>
            Mynance: The only personal finance app you need.
          </h1>
          {/* <h3 className="text-center space-y-4 py-15 text-3xl text-slate-400">
            A financial application built just for <span className="underline"> you</span>.
          </h3>
          <h2 className="space-y-10 text-5xl py-15 text-slate-400">
            Welcome to Mynance.
          </h2> */}
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="@container/card w-[250px]">
              <CardHeader>
                <CardDescription>Total Income</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  $6,000.00
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your income this month <HiOutlineTrendingUp className="size-4" />
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Total Expenses</CardDescription>
                <CardTitle className="text-2xl text-destructive font-semibold tabular-nums @[250px]/card:text-3xl">
                  $4,750.00
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your expenses this month <HiOutlineTrendingDown className="size-4" />
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Current Savings</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  $20,000
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your total saved balance 
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Portfolio Growth</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  2.18%
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
                  Your portfolio growth this month
                </div>
              </CardFooter>
            </Card>
          </div>
          <Card className="@container/card w-1/2">
            <CardHeader>
              <CardTitle>Your Portfolio</CardTitle>
              <CardDescription>Year to date</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer config={chartConfig} className="min-h-[300px] w-full" >
                <LineChart accessibilityLayer data={chartData}>
                  <XAxis
                    dataKey="month"
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={[4500, 6500]} 
                  />
                  <Line 
                    dataKey="value" 
                    radius={4}
                    type="natural"
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </main>
      </Suspense>
    </>

  );
}

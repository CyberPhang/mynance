"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { font } from "./fonts";
import { Home, BriefcaseBusiness, BanknoteArrowDown, DollarSign, ChevronUp, User2, PowerIcon} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { logout } from "@/lib/actions";

type AppSidebarProps = {
    email: string | null | undefined,
}

const AppSidebar = (props: AppSidebarProps) => {
    const pathname = usePathname();

    const items = [
        {
            title: "Home",
            url: "/dashboard",
            icon: <Home />,
        },

        {
            title: "Income",
            url: "/dashboard/income",
            icon: <BriefcaseBusiness />,
        },

        {
            title: "Expenses",
            url: "/dashboard/expenses",
            icon: <BanknoteArrowDown />,
        },

        {
            title: "Budgeting",
            url: "/dashboard/budgeting",
            icon: <DollarSign />,
        },
    ];

    return ( 
        <Sidebar> 
            <SidebarHeader className={`${font.className} font-semibold text-2xl`}>
                <span className="flex justify-center">
                    Mynance
                </span>
            </SidebarHeader>
            <SidebarContent>
                {items.map((item) => {
                    const isActive = pathname === item.url;

                    return <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={item.url} >
                                {item.icon}
                                {item.title}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                })}
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> 
                    {props.email}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <form action={logout}>
                        <Button type="submit" variant={"ghost"} asChild>
                            <button type="submit">
                                <PowerIcon /> 
                                Sign out
                            </button>
                        </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
 
export default AppSidebar;
import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/ui/sidebar";
import { Suspense } from "react";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const session = await auth();

    return ( 
        <SidebarProvider>
            <Suspense>
                <AppSidebar 
                    email={session?.user?.email}
                />
            </Suspense>
            {children}
        </SidebarProvider>
    );
}
 
export default DashboardLayout;
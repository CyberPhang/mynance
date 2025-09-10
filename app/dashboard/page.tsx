import { Button } from "@/components/ui/button";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

const DashboardPage = () => { 
    return ( 
        <div>
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <Button type="submit">
                    <PowerIcon />
                    Sign out
                </Button>
            </form>
        </div>
    );
}
 
export default DashboardPage;

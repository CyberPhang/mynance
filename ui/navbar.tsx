import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    return ( <header>
          <nav className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 text-2xl align-text-bottom">
            {/* <Link href="/" className="font-semibold text-3xl ">
              Mynance
            </Link>
            <div className="flex gap-24">
              <Link href="/about">
                About
              </Link>
              <Link href="/features">
                Features
              </Link>
              <Link href="/contact">
                Contact
              </Link>
            </div>
            <div className="flex gap-4">
              <Link href="/login cursor-pointer">
                <Button className="text-xl text-slate-950 cursor-pointer" variant="secondary">
                  Login
                </Button>
              </Link>
              or 
              <Link href="/register cursor-pointer">
                <Button className="text-xl text-slate-950 cursor-pointer" variant="secondary">
                  Register
                </Button>
              </Link>
            </div> */}
            
            <Link href="/" className="font-semibold text-3xl ">
              Mynance
            </Link>
            <Link href="/about">
              About
            </Link>
            <Link href="/features">
              Features
            </Link>
            <Link href="/contact">
              Contact
            </Link>
            <div className="flex gap-4">
              <Link href="/login">
                <Button className="text-xl text-slate-950 cursor-pointer" variant="secondary">
                  Login
                </Button>
              </Link>
              or 
              <Link href="/register">
                <Button className="text-xl text-slate-950 cursor-pointer" variant="secondary">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </header> 
    );
}
 
export default Navbar;
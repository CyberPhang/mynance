"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
    return (
        <div className="flex items-center w-1/2 gap-x-2">
            <Button 
                
                className="w-full cursor-pointer" 
                variant="outline" 
                onClick={() => {}}
            >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button 
                
                className="w-full cursor-pointer" 
                variant="outline" 
                onClick={() => {}}
            >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}
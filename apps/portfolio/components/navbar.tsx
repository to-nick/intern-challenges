"use client";

import Logo from "@/assets/images/nick-torrens-high-resolution-logo-grayscale-transparent.jpeg";
import Link from "next/link";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useState } from "react";

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    function handleClick(){
        setIsOpen(!isOpen);
    }

    return(
        <nav className="flex flex-col items-center p-4 w-full bg-transparent dark:bg-transparent absolute top-0 left-0">
            <div className="flex justify-between items-center bg-transparent dark:bg-transparent w-full">
                <div>
                    <img src={Logo.src} alt="Logo" className="h-15 w-10n p-2" />
                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="hidden md:flex">
                        <div className="flex gap-10 text-[clamp(0.75rem,3vw,2rem)]">
                            <Link 
                                href="/"
                                onClick={()=>setIsOpen(false)}>
                                    Home
                            </Link>
                            <Link 
                                href="/about"
                                onClick={()=>setIsOpen(false)}>
                                    About
                            </Link>
                            <Link 
                                href="/projects"
                                onClick={()=>setIsOpen(false)}>
                                    Projects
                            </Link>
                            <Link 
                                href="/blog"
                                onClick={()=>setIsOpen(false)}>
                                    Blog
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center"><ThemeToggle /></div>
                    <button className={`flex flex-col gap-1.5 w-10 cursor-pointer items-center md:hidden`} onClick={handleClick}>
                        <span className={`w-6 bg-black dark:bg-white h-0.5 transition-all duration-300 ${
                            isOpen ? 'rotate-45 translate-y-2' : ''
                        }`}></span>
                        <span className={`w-6 bg-black dark:bg-white h-0.5 transition-all duration-300 ${
                            isOpen ? 'opacity-0' : ''
                        }`}></span>
                        <span className={`w-6 bg-black dark:bg-white h-0.5 transition-all duration-300 ${
                            isOpen ? '-rotate-45 -translate-y-2' : ''
                        }`}></span>
                    </button>
                </div>
            </div>
            
            {isOpen && (
            <div className={`${isOpen ? "flex gap-4 absolute top-19 left-0 w-full bg-white dark:bg-black items-center justify-center" : "hidden"}`}>
                <div className="flex flex-col gap-4 text-[clamp(0.75rem,3vw,2rem)] text-center">
                    <Link 
                        href="/"
                        onClick={()=>setIsOpen(false)}>
                            Home
                    </Link>
                    <Link 
                        href="/about"
                        onClick={()=>setIsOpen(false)}>
                            About
                    </Link>
                    <Link 
                        href="/projects"
                        onClick={()=>setIsOpen(false)}>
                            Projects
                    </Link>
                    <Link 
                        href="/blog"
                        onClick={()=>setIsOpen(false)}>
                            Blog
                    </Link>
                </div>
            </div>)}
        </nav>
    )
}
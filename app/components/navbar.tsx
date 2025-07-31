"use client";

import React,{useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {
   const pathname = usePathname();

   const highlight = (path:string)=> 
    `text-black hover:underline font-sans ${ pathname == path ? " font-bold" :""}`;

  return (
    <nav className="bg-gray-300 p-5 shadow-md">


        <div className ="flex justify-between items-center">
            <h1 className = "text-black  font-bold font-mono text-3xl "> Cine Finder </h1>

            <div className="flex space-x-8">
                <Link className={highlight("/")} href="/">Home</Link>
                <Link className={highlight("/movieList")} href="/movieList">Movie List</Link>
                <Link className={highlight("/movieDetail")} href="/movieDetail">Movie Detail</Link>
      
            </div>
        </div>
    
    </nav>
  );
}



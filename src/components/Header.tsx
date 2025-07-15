"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mr-2">
              <span className="text-sm font-bold">e</span>
            </div>
            <span className="font-semibold">eduSponsor</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-sm hover:text-indigo-200">Home</Link>
            <Link href="#" className="text-sm hover:text-indigo-200">Features</Link>
            <Link href="#" className="text-sm hover:text-indigo-200">Students</Link>
            <Link href="#" className="text-sm hover:text-indigo-200">Contact</Link>
          </nav>
          
          <div className="hidden md:block">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100">
              Get Started
            </Button>
          </div>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
} 
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-indigo-600 z-50 shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="#"
              className="text-white hover:text-indigo-200"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-white hover:text-indigo-200"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-white hover:text-indigo-200"
              onClick={toggleMenu}
            >
              Students
            </Link>
            <Link
              href="#"
              className="text-white hover:text-indigo-200"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  School, 
  Users, 
  GraduationCap, 
  BarChart3, 
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSidebarState } from "@/hooks/useSidebarState";
import DashboardHeader from "@/components/dashboard/Header";

interface SidebarLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all relative group ${
        isActive ? "bg-blue-900 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <div className="min-w-[24px]">{icon}</div>
      {isCollapsed ? (
        <div className="absolute left-12 bg-gray-800 text-white px-2 py-1 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {label}
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isCollapsed, toggleSidebar } = useSidebarState();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside 
        className={`bg-[#1a2236] border-r border-gray-700 transition-all duration-300 flex flex-col ${
          isCollapsed ? "w-[72px]" : "w-[250px]"
        } h-screen fixed left-0 top-0 z-30`}
      >
        {/* Logo */}
        <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed && <span className="text-white font-bold">
            <Image src="/Logo Concept white 1.svg" alt="Logo" width={140} height={140} />
            </span>}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-full hover:bg-gray-700 text-white"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          <SidebarLink 
            href="/dashboard" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            href="/dashboard/school-admin" 
            icon={<School size={20} />} 
            label="School Admin" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            href="/dashboard/sponsor" 
            icon={<Users size={20} />} 
            label="Sponsor" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            href="/dashboard/students" 
            icon={<GraduationCap size={20} />} 
            label="Students" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            href="/dashboard/analytics" 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            href="/dashboard/payments" 
            icon={<CreditCard size={20} />} 
            label="Payments" 
            isCollapsed={isCollapsed} 
          />
        </nav>
        
        {/* Footer */}
        <div className="px-3 py-4 space-y-2 border-t border-gray-700">
          <SidebarLink 
            href="/dashboard/support" 
            icon={<HelpCircle size={20} />} 
            label="Support" 
            isCollapsed={isCollapsed} 
          />
          <SidebarLink 
            href="/dashboard/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            isCollapsed={isCollapsed} 
          />
        </div>
      </aside>
      
      {/* Main content */}
      <div 
        className={`flex-1 flex flex-col ${
          isCollapsed ? "ml-[72px]" : "ml-[250px]"
        } transition-all duration-300`}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

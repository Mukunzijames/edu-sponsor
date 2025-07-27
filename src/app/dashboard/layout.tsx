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
  ChevronRight,
  HandCoins
} from "lucide-react";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useRole } from "@/hooks/useRole";
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
        isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
      }`}
    >
      <div className="min-w-[24px]">{icon}</div>
      {isCollapsed ? (
        <div className="absolute z-50 invisible px-2 py-1 text-gray-800 transition-all bg-white rounded-md shadow-md opacity-0 left-12 group-hover:opacity-100 group-hover:visible whitespace-nowrap">
          {label}
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Link>
  );
};

// Icon mapping for the navigation items
const iconMap = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  School: <School size={20} />,
  Users: <Users size={20} />,
  HandCoins: <HandCoins size={20} />,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const { isSponsor, isSchool } = useRole();

  // Define navigation items based on user role
  const getNavigationItems = () => {
    if (isSponsor) {
      return [
        {
          href: "/dashboard",
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard"
        },
        {
          href: "/dashboard/school",
          icon: <School size={20} />,
          label: "School"
        },
        {
          href: "/dashboard/sponsorship",
          icon: <Users size={20} />,
          label: "Sponsorship"
        }
      ];
    }
    
    if (isSchool) {
      return [
        {
          href: "/dashboard",
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard"
        },
        {
          href: "/dashboard/donations",
          icon: <HandCoins size={20} />,
          label: "Donations"
        },
        {
          href: "/dashboard/school",
          icon: <School size={20} />,
          label: "School"
        }
      ];
    }

    // Default fallback (should not reach here with proper auth)
    return [
      {
        href: "/dashboard",
        icon: <LayoutDashboard size={20} />,
        label: "Dashboard"
      }
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          isCollapsed ? "w-[72px]" : "w-[250px]"
        } h-screen fixed left-0 top-0 z-30`}
      >
        {/* Logo */}
        <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed && <span className="font-bold text-gray-800">
            <Image src="/Logo Concept white 1.svg" alt="Logo" width={140} height={140} />
            </span>}
          <button 
            onClick={toggleSidebar} 
            className="p-1 text-gray-600 rounded-full hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navigationItems.map((item) => (
            <SidebarLink 
              key={item.href}
              href={item.href} 
              icon={item.icon} 
              label={item.label} 
              isCollapsed={isCollapsed} 
            />
          ))}
        </nav>
        
        {/* Footer */}
        <div className="px-3 py-4 space-y-2 border-t border-gray-200">
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

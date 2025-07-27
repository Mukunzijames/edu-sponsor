"use client";

import { useState, useEffect } from "react";

export function useSidebarState() {
  // Initialize state with default value (not collapsed)
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);
  
  // Save state to localStorage whenever it changes
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };
  
  return { isCollapsed, toggleSidebar };
} 
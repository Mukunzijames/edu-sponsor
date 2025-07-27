// User roles enum
export enum UserRole {
  SPONSOR = 'Sponsor',
  SCHOOL = 'School'
}

// Role-based permissions
export const rolePermissions = {
  [UserRole.SPONSOR]: [
    '/dashboard',
    '/dashboard/school',
    '/dashboard/sponsorship',
    '/dashboard/settings'
  ],
  [UserRole.SCHOOL]: [
    '/dashboard',
    '/dashboard/donations', 
    '/dashboard/school',
    '/dashboard/settings'
  ]
};

// Navigation items for each role
export const getNavigationItemsForRole = (role: string) => {
  const navigationConfig = {
    [UserRole.SPONSOR]: [
      {
        href: "/dashboard",
        icon: "LayoutDashboard",
        label: "Dashboard"
      },
      {
        href: "/dashboard/school",
        icon: "School",
        label: "School"
      },
      {
        href: "/dashboard/sponsorship",
        icon: "Users",
        label: "Sponsorship"
      }
    ],
    [UserRole.SCHOOL]: [
      {
        href: "/dashboard",
        icon: "LayoutDashboard",
        label: "Dashboard"
      },
      {
        href: "/dashboard/donations",
        icon: "HandCoins",
        label: "Donations"
      },
      {
        href: "/dashboard/school",
        icon: "School",
        label: "School"
      }
    ]
  };

  return navigationConfig[role as UserRole] || [
    {
      href: "/dashboard",
      icon: "LayoutDashboard",
      label: "Dashboard"
    }
  ];
};

// Check if user has permission to access a route
export const hasPermission = (userRole: string, route: string): boolean => {
  const allowedRoutes = rolePermissions[userRole as UserRole] || [];
  return allowedRoutes.some(allowedRoute => 
    route === allowedRoute || route.startsWith(allowedRoute + '/')
  );
};

// Check if user is sponsor
export const isSponsor = (userRole: string): boolean => {
  return userRole === UserRole.SPONSOR;
};

// Check if user is school
export const isSchool = (userRole: string): boolean => {
  return userRole === UserRole.SCHOOL;
};

// Get user role display name
export const getRoleDisplayName = (role: string): string => {
  const roleNames = {
    [UserRole.SPONSOR]: 'Sponsor',
    [UserRole.SCHOOL]: 'School Administrator'
  };
  
  return roleNames[role as UserRole] || 'User';
};

// Utility to manually trigger auth refresh
export const triggerAuthRefresh = (): void => {
  if (typeof window !== 'undefined') {
    console.log('🔄 Manually triggering auth refresh');
    window.dispatchEvent(new CustomEvent('auth-refresh'));
  }
}; 
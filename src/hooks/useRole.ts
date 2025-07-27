import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { isSponsor, isSchool, hasPermission, getRoleDisplayName, UserRole } from '@/lib/auth-utils';

export const useRole = () => {
  const { user, refreshUser } = useAuth();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = user?.Role || '';
    console.log('🎭 Role Hook - User changed:', user, 'Role:', role);
    setUserRole(role);
  }, [user]);

  // Force refresh of user data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refreshUser();
    }, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval);
  }, [refreshUser]);

  const roleState = useMemo(() => {
    const computed = {
      userRole,
      isSponsor: isSponsor(userRole),
      isSchool: isSchool(userRole),
      hasPermission: (route: string) => hasPermission(userRole, route),
      roleDisplayName: getRoleDisplayName(userRole),
      isValidRole: userRole === UserRole.SPONSOR || userRole === UserRole.SCHOOL,
    };

    console.log('🎭 Role State Computed:', computed);
    return computed;
  }, [userRole]);

  return roleState;
}; 
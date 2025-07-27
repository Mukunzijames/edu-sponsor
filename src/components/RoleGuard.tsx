import { ReactNode } from 'react';
import { useRole } from '@/hooks/useRole';
import { UserRole } from '@/lib/auth-utils';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

/**
 * RoleGuard component to conditionally render content based on user roles
 * 
 * @param children - Content to render if user has permission
 * @param allowedRoles - Array of roles that can see the content
 * @param fallback - Optional fallback content to render if user doesn't have permission
 */
export const RoleGuard = ({ children, allowedRoles, fallback = null }: RoleGuardProps) => {
  const { userRole } = useRole();
  
  const hasAccess = allowedRoles.includes(userRole as UserRole);
  
  if (!hasAccess) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

/**
 * Convenience components for specific roles
 */
export const SponsorOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <RoleGuard allowedRoles={[UserRole.SPONSOR]} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const SchoolOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <RoleGuard allowedRoles={[UserRole.SCHOOL]} fallback={fallback}>
    {children}
  </RoleGuard>
); 
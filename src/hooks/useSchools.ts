"use client";

import { useQuery } from '@tanstack/react-query';
import { schoolService, School } from '../services/schoolService';

export function useSchools() {
  return useQuery<School[], Error>({
    queryKey: ['schools'],
    queryFn: schoolService.getAllSchools,
    retry: 1, // Only retry once
    retryDelay: 1000, // Wait 1 second before retry
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes (React Query v4+ uses gcTime instead of cacheTime)
  });
}

export function useSchool(id: string) {
  return useQuery<School, Error>({
    queryKey: ['schools', id],
    queryFn: () => schoolService.getSchoolById(id),
    enabled: !!id,
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
} 
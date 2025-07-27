"use client";

import { useQuery } from '@tanstack/react-query';
import { schoolService, School } from '../services/schoolService';

export function useSchools() {
  return useQuery<School[], Error>({
    queryKey: ['schools'],
    queryFn: schoolService.getAllSchools,
  });
}

export function useSchool(id: string) {
  return useQuery<School, Error>({
    queryKey: ['schools', id],
    queryFn: () => schoolService.getSchoolById(id),
    enabled: !!id,
  });
} 
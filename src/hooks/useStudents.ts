"use client";

import { useQuery } from '@tanstack/react-query';
import { studentService, Student } from '../services/studentService';

export function useStudentsBySchool(schoolId: string | null) {
  return useQuery<Student[], Error>({
    queryKey: ['students', schoolId],
    queryFn: () => {
      if (!schoolId) throw new Error('School ID is required');
      return studentService.getStudentsBySchoolId(schoolId);
    },
    enabled: !!schoolId,
  });
}

export function useStudent(id: string | null) {
  return useQuery<Student, Error>({
    queryKey: ['student', id],
    queryFn: () => {
      if (!id) throw new Error('Student ID is required');
      return studentService.getStudentById(id);
    },
    enabled: !!id,
  });
} 
"use client";

import api from './api';

export interface Student {
  Id: string;
  Name: string;
  Age: string;
  Gender: string;
  Address: string;
  Phone: string;
  Email: string;
  Status: string;
  Avatar: string;
  ParentName: string;
  SchoolId: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateStudentData {
  name: string;
  age: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  parentName: string;
  schoolId: string;
}

export const studentService = {
  getStudentsBySchoolId: async (schoolId: string): Promise<Student[]> => {
    const response = await api.get(`/api/schools/${schoolId}/students`);
    return response.data;
  },
  
  getStudentById: async (id: string): Promise<Student> => {
    const response = await api.get(`/api/students/${id}`);
    return response.data;
  },

  createStudent: async (data: CreateStudentData): Promise<Student> => {
    const response = await api.post('/api/students', data);
    return response.data;
  }
}; 
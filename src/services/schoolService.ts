"use client";

import api from './api';

export interface School {
  Id: string;
  Name: string;
  Description?: string;
  District?: string;
  Status?: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateSchoolData {
  name: string;
  description: string;
  district: string;
}

export const schoolService = {
  getAllSchools: async (): Promise<School[]> => {
    const response = await api.get('/api/schools');
    return response.data;
  },
  
  getSchoolById: async (id: string): Promise<School> => {
    const response = await api.get(`/api/schools/${id}`);
    return response.data;
  },

  createSchool: async (data: CreateSchoolData): Promise<School> => {
    const response = await api.post('/api/schools', data);
    return response.data;
  }
}; 
"use client";

import api from './api';

export interface School {
  Id: string;
  Name: string;
  Description?: string;
  District?: string;
  Status: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export const schoolService = {
  getAllSchools: async (): Promise<School[]> => {
    const response = await api.get('/api/schools');
    return response.data;
  },
  
  getSchoolById: async (id: string): Promise<School> => {
    const response = await api.get(`/api/schools/${id}`);
    return response.data;
  }
}; 
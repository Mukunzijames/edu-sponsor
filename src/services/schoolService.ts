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

// Fallback data for when API is not available
const fallbackSchools: School[] = [
  {
    Id: "1",
    Name: "Green Hills Academy",
    Description: "A prestigious international school focused on academic excellence",
    District: "Kigali",
    Status: true,
    CreatedAt: "2024-01-15T10:00:00Z",
    UpdatedAt: "2024-01-15T10:00:00Z"
  },
  {
    Id: "2",
    Name: "Kigali International School",
    Description: "Premier educational institution with modern facilities",
    District: "Gasabo",
    Status: true,
    CreatedAt: "2024-01-16T10:00:00Z",
    UpdatedAt: "2024-01-16T10:00:00Z"
  },
  {
    Id: "3",
    Name: "St. Mary's Secondary",
    Description: "Catholic school providing quality education since 1960",
    District: "Nyarugenge",
    Status: true,
    CreatedAt: "2024-01-17T10:00:00Z",
    UpdatedAt: "2024-01-17T10:00:00Z"
  },
  {
    Id: "4",
    Name: "Riviera High School",
    Description: "Modern secondary school with focus on science and technology",
    District: "Kicukiro",
    Status: false,
    CreatedAt: "2024-01-18T10:00:00Z",
    UpdatedAt: "2024-01-18T10:00:00Z"
  },
  {
    Id: "5",
    Name: "Unity Academy",
    Description: "Community-focused school promoting unity and excellence",
    District: "Gasabo",
    Status: true,
    CreatedAt: "2024-01-19T10:00:00Z",
    UpdatedAt: "2024-01-19T10:00:00Z"
  },
  {
    Id: "6",
    Name: "Hope Primary School",
    Description: "Primary education with emphasis on foundational skills",
    District: "Kigali",
    Status: true,
    CreatedAt: "2024-01-20T10:00:00Z",
    UpdatedAt: "2024-01-20T10:00:00Z"
  }
];

export const schoolService = {
  getAllSchools: async (): Promise<School[]> => {
    try {
      const response = await api.get('/api/schools');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch schools from API, using fallback data:', error);
      
      // Return fallback data when API is not available
      return new Promise((resolve) => {
        setTimeout(() => resolve(fallbackSchools), 500); // Simulate network delay
      });
    }
  },
  
  getSchoolById: async (id: string): Promise<School> => {
    try {
      const response = await api.get(`/api/schools/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Failed to fetch school ${id} from API, using fallback data:`, error);
      
      // Return fallback data when API is not available
      const school = fallbackSchools.find(s => s.Id === id);
      if (school) {
        return Promise.resolve(school);
      } else {
        throw new Error(`School with ID ${id} not found`);
      }
    }
  }
}; 
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
  ParentName: string;
  SchoolId: string;
  CreatedAt: string;
  UpdatedAt: string;
}

// Fallback student data for when API is not available
const fallbackStudents: Student[] = [
  // Green Hills Academy (School ID: 1)
  {
    Id: "1",
    Name: "Maria Uwimana",
    Age: "14",
    Gender: "Female",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123456",
    Email: "maria.uwimana@email.com",
    ParentName: "Agnes Uwimana",
    SchoolId: "1",
    CreatedAt: "2024-01-15T08:00:00Z",
    UpdatedAt: "2024-01-15T08:00:00Z"
  },
  {
    Id: "2",
    Name: "Jean Baptiste Nkurunziza",
    Age: "15",
    Gender: "Male",
    Address: "Kigali, Nyarugenge District",
    Phone: "+250788123457",
    Email: "jean.baptiste@email.com",
    ParentName: "Pierre Nkurunziza",
    SchoolId: "1",
    CreatedAt: "2024-01-16T09:00:00Z",
    UpdatedAt: "2024-01-16T09:00:00Z"
  },
  {
    Id: "3",
    Name: "Grace Mukamana",
    Age: "16",
    Gender: "Female",
    Address: "Kigali, Kicukiro District",
    Phone: "+250788123458",
    Email: "grace.mukamana@email.com",
    ParentName: "Rose Mukamana",
    SchoolId: "1",
    CreatedAt: "2024-01-17T10:00:00Z",
    UpdatedAt: "2024-01-17T10:00:00Z"
  },
  {
    Id: "4",
    Name: "Samuel Niyonzima",
    Age: "17",
    Gender: "Male",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123459",
    Email: "samuel.niyonzima@email.com",
    ParentName: "David Niyonzima",
    SchoolId: "1",
    CreatedAt: "2024-01-18T11:00:00Z",
    UpdatedAt: "2024-01-18T11:00:00Z"
  },
  // Kigali International School (School ID: 2)
  {
    Id: "5",
    Name: "Alice Mukashema",
    Age: "13",
    Gender: "Female",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123460",
    Email: "alice.mukashema@email.com",
    ParentName: "Christine Mukashema",
    SchoolId: "2",
    CreatedAt: "2024-01-19T08:30:00Z",
    UpdatedAt: "2024-01-19T08:30:00Z"
  },
  {
    Id: "6",
    Name: "Eric Habimana",
    Age: "14",
    Gender: "Male",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123461",
    Email: "eric.habimana@email.com",
    ParentName: "Joseph Habimana",
    SchoolId: "2",
    CreatedAt: "2024-01-20T09:30:00Z",
    UpdatedAt: "2024-01-20T09:30:00Z"
  },
  {
    Id: "7",
    Name: "Faith Uwera",
    Age: "15",
    Gender: "Female",
    Address: "Kigali, Nyarugenge District",
    Phone: "+250788123462",
    Email: "faith.uwera@email.com",
    ParentName: "Immaculee Uwera",
    SchoolId: "2",
    CreatedAt: "2024-01-21T10:30:00Z",
    UpdatedAt: "2024-01-21T10:30:00Z"
  },
  // St. Mary's Secondary (School ID: 3)
  {
    Id: "8",
    Name: "Peter Kagame Jr",
    Age: "16",
    Gender: "Male",
    Address: "Kigali, Nyarugenge District",
    Phone: "+250788123463",
    Email: "peter.kagame@email.com",
    ParentName: "Paul Kagame",
    SchoolId: "3",
    CreatedAt: "2024-01-22T08:00:00Z",
    UpdatedAt: "2024-01-22T08:00:00Z"
  },
  {
    Id: "9",
    Name: "Solange Mujyamura",
    Age: "17",
    Gender: "Female",
    Address: "Kigali, Nyarugenge District",
    Phone: "+250788123464",
    Email: "solange.mujyamura@email.com",
    ParentName: "Beatrice Mujyamura",
    SchoolId: "3",
    CreatedAt: "2024-01-23T09:00:00Z",
    UpdatedAt: "2024-01-23T09:00:00Z"
  },
  {
    Id: "10",
    Name: "Claude Hategeka",
    Age: "18",
    Gender: "Male",
    Address: "Kigali, Kicukiro District",
    Phone: "+250788123465",
    Email: "claude.hategeka@email.com",
    ParentName: "Emmanuel Hategeka",
    SchoolId: "3",
    CreatedAt: "2024-01-24T10:00:00Z",
    UpdatedAt: "2024-01-24T10:00:00Z"
  },
  // Riviera High School (School ID: 4)
  {
    Id: "11",
    Name: "Diane Umutesi",
    Age: "15",
    Gender: "Female",
    Address: "Kigali, Kicukiro District",
    Phone: "+250788123466",
    Email: "diane.umutesi@email.com",
    ParentName: "Francine Umutesi",
    SchoolId: "4",
    CreatedAt: "2024-01-25T08:15:00Z",
    UpdatedAt: "2024-01-25T08:15:00Z"
  },
  {
    Id: "12",
    Name: "Patrick Nshimiyimana",
    Age: "16",
    Gender: "Male",
    Address: "Kigali, Kicukiro District",
    Phone: "+250788123467",
    Email: "patrick.nshimiyimana@email.com",
    ParentName: "Augustin Nshimiyimana",
    SchoolId: "4",
    CreatedAt: "2024-01-26T09:15:00Z",
    UpdatedAt: "2024-01-26T09:15:00Z"
  },
  // Unity Academy (School ID: 5)
  {
    Id: "13",
    Name: "Ange Uwimana",
    Age: "14",
    Gender: "Female",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123468",
    Email: "ange.uwimana@email.com",
    ParentName: "Marie Uwimana",
    SchoolId: "5",
    CreatedAt: "2024-01-27T08:45:00Z",
    UpdatedAt: "2024-01-27T08:45:00Z"
  },
  {
    Id: "14",
    Name: "Kevin Munyeshyaka",
    Age: "15",
    Gender: "Male",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123469",
    Email: "kevin.munyeshyaka@email.com",
    ParentName: "Martin Munyeshyaka",
    SchoolId: "5",
    CreatedAt: "2024-01-28T09:45:00Z",
    UpdatedAt: "2024-01-28T09:45:00Z"
  },
  // Hope Primary School (School ID: 6)
  {
    Id: "15",
    Name: "Esther Umuhoza",
    Age: "12",
    Gender: "Female",
    Address: "Kigali, Kigali District",
    Phone: "+250788123470",
    Email: "esther.umuhoza@email.com",
    ParentName: "Vestine Umuhoza",
    SchoolId: "6",
    CreatedAt: "2024-01-29T08:20:00Z",
    UpdatedAt: "2024-01-29T08:20:00Z"
  },
  {
    Id: "16",
    Name: "Isaac Nzeyimana",
    Age: "13",
    Gender: "Male",
    Address: "Kigali, Kigali District",
    Phone: "+250788123471",
    Email: "isaac.nzeyimana@email.com",
    ParentName: "Jerome Nzeyimana",
    SchoolId: "6",
    CreatedAt: "2024-01-30T09:20:00Z",
    UpdatedAt: "2024-01-30T09:20:00Z"
  },
  
  // Additional students for Green Hills Academy (School ID: 1)
  {
    Id: "17",
    Name: "Emmanuel Mukiza",
    Age: "15",
    Gender: "Male",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123472",
    Email: "emmanuel.mukiza@email.com",
    ParentName: "Jeanette Mukiza",
    SchoolId: "1",
    CreatedAt: "2024-02-01T08:00:00Z",
    UpdatedAt: "2024-02-01T08:00:00Z"
  },
  {
    Id: "18",
    Name: "Clarisse Ingabire",
    Age: "16",
    Gender: "Female",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123473",
    Email: "clarisse.ingabire@email.com",
    ParentName: "Odette Ingabire",
    SchoolId: "1",
    CreatedAt: "2024-02-02T09:00:00Z",
    UpdatedAt: "2024-02-02T09:00:00Z"
  },
  
  // Additional students for Kigali International School (School ID: 2)
  {
    Id: "19",
    Name: "Prince Niyonshuti",
    Age: "14",
    Gender: "Male",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123474",
    Email: "prince.niyonshuti@email.com",
    ParentName: "Francine Niyonshuti",
    SchoolId: "2",
    CreatedAt: "2024-02-03T08:30:00Z",
    UpdatedAt: "2024-02-03T08:30:00Z"
  },
  {
    Id: "20",
    Name: "Yvette Uwimana",
    Age: "15",
    Gender: "Female",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123475",
    Email: "yvette.uwimana@email.com",
    ParentName: "Claudine Uwimana",
    SchoolId: "2",
    CreatedAt: "2024-02-04T09:30:00Z",
    UpdatedAt: "2024-02-04T09:30:00Z"
  },
  
  // Additional students for St. Mary's Secondary (School ID: 3)
  {
    Id: "21",
    Name: "Albert Muhire",
    Age: "17",
    Gender: "Male",
    Address: "Kigali, Nyarugenge District",
    Phone: "+250788123476",
    Email: "albert.muhire@email.com",
    ParentName: "Josephine Muhire",
    SchoolId: "3",
    CreatedAt: "2024-02-05T08:00:00Z",
    UpdatedAt: "2024-02-05T08:00:00Z"
  },
  {
    Id: "22",
    Name: "Viviane Umurungi",
    Age: "16",
    Gender: "Female",
    Address: "Kigali, Nyarugenge District",
    Phone: "+250788123477",
    Email: "viviane.umurungi@email.com",
    ParentName: "Thacienne Umurungi",
    SchoolId: "3",
    CreatedAt: "2024-02-06T09:00:00Z",
    UpdatedAt: "2024-02-06T09:00:00Z"
  },
  
  // Additional students for Riviera High School (School ID: 4)
  {
    Id: "23",
    Name: "Frank Uwizeyimana",
    Age: "16",
    Gender: "Male",
    Address: "Kigali, Kicukiro District",
    Phone: "+250788123478",
    Email: "frank.uwizeyimana@email.com",
    ParentName: "Josepha Uwizeyimana",
    SchoolId: "4",
    CreatedAt: "2024-02-07T08:15:00Z",
    UpdatedAt: "2024-02-07T08:15:00Z"
  },
  {
    Id: "24",
    Name: "Sandrine Mukamana",
    Age: "15",
    Gender: "Female",
    Address: "Kigali, Kicukiro District",
    Phone: "+250788123479",
    Email: "sandrine.mukamana@email.com",
    ParentName: "Esperance Mukamana",
    SchoolId: "4",
    CreatedAt: "2024-02-08T09:15:00Z",
    UpdatedAt: "2024-02-08T09:15:00Z"
  },
  
  // Additional students for Unity Academy (School ID: 5)
  {
    Id: "25",
    Name: "Jonathan Mugisha",
    Age: "14",
    Gender: "Male",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123480",
    Email: "jonathan.mugisha@email.com",
    ParentName: "Claudette Mugisha",
    SchoolId: "5",
    CreatedAt: "2024-02-09T08:45:00Z",
    UpdatedAt: "2024-02-09T08:45:00Z"
  },
  {
    Id: "26",
    Name: "Joselyne Mukaremera",
    Age: "15",
    Gender: "Female",
    Address: "Kigali, Gasabo District",
    Phone: "+250788123481",
    Email: "joselyne.mukaremera@email.com",
    ParentName: "Devotha Mukaremera",
    SchoolId: "5",
    CreatedAt: "2024-02-10T09:45:00Z",
    UpdatedAt: "2024-02-10T09:45:00Z"
  },
  
  // Additional students for Hope Primary School (School ID: 6)
  {
    Id: "27",
    Name: "Daniel Nzeyimana",
    Age: "12",
    Gender: "Male",
    Address: "Kigali, Kigali District",
    Phone: "+250788123482",
    Email: "daniel.nzeyimana@email.com",
    ParentName: "Consolata Nzeyimana",
    SchoolId: "6",
    CreatedAt: "2024-02-11T08:20:00Z",
    UpdatedAt: "2024-02-11T08:20:00Z"
  },
  {
    Id: "28",
    Name: "Innocent Uwimana",
    Age: "13",
    Gender: "Male",
    Address: "Kigali, Kigali District",
    Phone: "+250788123483",
    Email: "innocent.uwimana@email.com",
    ParentName: "Speciose Uwimana",
    SchoolId: "6",
    CreatedAt: "2024-02-12T09:20:00Z",
    UpdatedAt: "2024-02-12T09:20:00Z"
  }
];

export const studentService = {
  getStudentsBySchoolId: async (schoolId: string): Promise<Student[]> => {
    try {
      const response = await api.get(`/api/schools/${schoolId}/students`);
      return response.data;
    } catch (error) {
      console.warn(`Failed to fetch students for school ${schoolId} from API, using fallback data:`, error);
      
      // Debug logging
      console.log('DEBUG StudentService getStudentsBySchoolId:');
      console.log('- schoolId:', schoolId, 'type:', typeof schoolId);
      console.log('- Total fallback students:', fallbackStudents.length);
      console.log('- Sample student SchoolIds:', fallbackStudents.slice(0, 5).map(s => `${s.Name}: "${s.SchoolId}"`));
      
      // Return fallback data filtered by school ID
      const schoolStudents = fallbackStudents.filter(student => {
        const match = student.SchoolId === schoolId;
        console.log(`- Student ${student.Name} (SchoolId: "${student.SchoolId}") matches "${schoolId}": ${match}`);
        return match;
      });
      
      console.log(`Found ${schoolStudents.length} students for school ID: ${schoolId}`);
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(schoolStudents), 300); // Simulate network delay
      });
    }
  },
  
  getStudentById: async (id: string): Promise<Student> => {
    try {
      const response = await api.get(`/api/students/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Failed to fetch student ${id} from API, using fallback data:`, error);
      
      // Return fallback data when API is not available
      const student = fallbackStudents.find(s => s.Id === id);
      if (student) {
        return Promise.resolve(student);
      } else {
        throw new Error(`Student with ID ${id} not found`);
      }
    }
  },

  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await api.get('/api/students');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch all students from API, using fallback data:', error);
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(fallbackStudents), 300);
      });
    }
  }
};
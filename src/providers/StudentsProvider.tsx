"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define student type
export interface Student {
  id: number;
  name: string;
  school: string;
  grade: string;
  description: string;
  amount: number;
  sponsorAmount: number;
  tags: string[];
  isUrgent: boolean;
}

// Define location group type
export interface LocationGroup {
  location: string;
  students: Student[];
}

// Initial dummy data
const initialStudentGroups: LocationGroup[] = [
  {
    location: "Kigali",
    students: [
      {
        id: 1,
        name: "Student 1",
        school: "Utunyoni Primary School",
        grade: "S5",
        description: "Needs support for Senior 5 science fees. Passionate about engineering.",
        amount: 150,
        sponsorAmount: 120,
        tags: ["Engineering", "Tuition + Materials"],
        isUrgent: true,
      },
      {
        id: 2,
        name: "Student 2",
        school: "Utunyoni Primary School",
        grade: "S5",
        description: "Needs support for Senior 5 science fees. Passionate about engineering.",
        amount: 150,
        sponsorAmount: 120,
        tags: ["Engineering", "Tuition + Materials"],
        isUrgent: true,
      },
      {
        id: 3,
        name: "Student 3",
        school: "Utunyoni Primary School",
        grade: "S5",
        description: "Needs support for Senior 5 science fees. Passionate about engineering.",
        amount: 150,
        sponsorAmount: 120,
        tags: ["Engineering", "Tuition + Materials"],
        isUrgent: true,
      },
    ],
  },
  {
    location: "Gisenyi",
    students: [
      {
        id: 4,
        name: "Student 4",
        school: "Utunyoni Primary School",
        grade: "S5",
        description: "Needs support for Senior 5 science fees. Passionate about engineering.",
        amount: 150,
        sponsorAmount: 120,
        tags: ["Engineering", "Tuition + Materials"],
        isUrgent: true,
      },
      {
        id: 5,
        name: "Student 5",
        school: "Utunyoni Primary School",
        grade: "S5",
        description: "Needs support for Senior 5 science fees. Passionate about engineering.",
        amount: 150,
        sponsorAmount: 120,
        tags: ["Engineering", "Tuition + Materials"],
        isUrgent: true,
      },
      {
        id: 6,
        name: "Student 6",
        school: "Utunyoni Primary School",
        grade: "S5",
        description: "Needs support for Senior 5 science fees. Passionate about engineering.",
        amount: 150,
        sponsorAmount: 120,
        tags: ["Engineering", "Tuition + Materials"],
        isUrgent: true,
      },
    ],
  },
];

// Define context type
interface StudentsContextType {
  studentGroups: LocationGroup[];
  searchStudents: (query: string) => LocationGroup[];
  sortStudents: (groups: LocationGroup[], sortOption: string) => LocationGroup[];
  getStudentById: (id: number) => Student | undefined;
}

// Create context
const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

// Provider component
export function StudentsProvider({ children }: { children: ReactNode }) {
  const [studentGroups] = useState<LocationGroup[]>(initialStudentGroups);

  // Search students by name, school, or description
  const searchStudents = (query: string): LocationGroup[] => {
    if (!query.trim()) return studentGroups;
    
    const lowerQuery = query.toLowerCase();
    
    return studentGroups.map(group => ({
      location: group.location,
      students: group.students.filter(student => 
        student.name.toLowerCase().includes(lowerQuery) ||
        student.school.toLowerCase().includes(lowerQuery) ||
        student.description.toLowerCase().includes(lowerQuery)
      )
    })).filter(group => group.students.length > 0);
  };

  // Sort students by different criteria
  const sortStudents = (groups: LocationGroup[], sortOption: string): LocationGroup[] => {
    return groups.map(group => {
      const sortedStudents = [...group.students].sort((a, b) => {
        switch (sortOption) {
          case "Most urgent":
            return a.isUrgent === b.isUrgent ? 0 : a.isUrgent ? -1 : 1;
          case "Least urgent":
            return a.isUrgent === b.isUrgent ? 0 : a.isUrgent ? 1 : -1;
          case "Highest amount":
            return b.amount - a.amount;
          case "Lowest amount":
            return a.amount - b.amount;
          default:
            return 0;
        }
      });
      
      return {
        ...group,
        students: sortedStudents
      };
    });
  };

  // Get student by ID
  const getStudentById = (id: number): Student | undefined => {
    for (const group of studentGroups) {
      const student = group.students.find(s => s.id === id);
      if (student) return student;
    }
    return undefined;
  };

  return (
    <StudentsContext.Provider value={{ studentGroups, searchStudents, sortStudents, getStudentById }}>
      {children}
    </StudentsContext.Provider>
  );
}

// Custom hook to use the students context
export function useStudents() {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentsProvider");
  }
  return context;
} 
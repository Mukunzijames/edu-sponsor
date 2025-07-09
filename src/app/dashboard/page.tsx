"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import StudentCard from "@/components/dashboard/StudentCard";
import { useStudents, LocationGroup } from "@/providers/StudentsProvider";

export default function DashboardPage() {
  const { studentGroups, searchStudents, sortStudents } = useStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Most urgent");
  const [filteredGroups, setFilteredGroups] = useState<LocationGroup[]>(studentGroups);

  // Update filtered groups when search query or sort option changes
  useEffect(() => {
    const searched = searchStudents(searchQuery);
    const sorted = sortStudents(searched, sortOption);
    setFilteredGroups(sorted);
  }, [searchQuery, sortOption, searchStudents, sortStudents]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center">
          <div className="bg-white border border-gray-300 rounded-full px-4 py-1 flex items-center mr-4">
            <span className="text-sm mr-2">Activate sponsor account</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8V12M12 16V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Search for specific student name and find a student that you're ready to sponsor
      </p>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search Student"
          className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No students found matching your search criteria.</p>
        </div>
      ) : (
        filteredGroups.map((group, index) => (
          <div key={index} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{group.location}</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort:</span>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="Most urgent">Most urgent</option>
                  <option value="Least urgent">Least urgent</option>
                  <option value="Highest amount">Highest amount</option>
                  <option value="Lowest amount">Lowest amount</option>
                </select>
                <Link href={`/dashboard/location/${group.location}`} className="ml-4 text-blue-500 hover:text-blue-700 flex items-center">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

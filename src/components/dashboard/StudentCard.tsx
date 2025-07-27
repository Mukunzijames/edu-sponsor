"use client";

import Link from "next/link";
import { BookmarkIcon } from "lucide-react";

interface StudentCardProps {
  student: {
    id: number;
    name: string;
    school: string;
    grade: string;
    description: string;
    amount: number;
    sponsorAmount: number;
    tags: string[];
    isUrgent: boolean;
  };
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          <div>
            {student.isUrgent && (
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full mr-2">
                Urgent
              </span>
            )}
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              {student.grade}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-500">
          <BookmarkIcon size={18} />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">{student.school}</p>
        <p className="text-sm font-medium mb-2">{student.description}</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          <span className="text-gray-500 text-sm mr-1">$</span>
          <span className="font-medium">{student.amount}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {student.tags.map((tag, index) => (
          <div key={index} className="flex items-center text-xs text-gray-600">
            {index === 0 ? (
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" fill="none" />
                <path
                  d="M12 6.5V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 15V17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8.5 7.5L9.5 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14.5 15L15.5 16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6 12H8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15.5 12H18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8.5 16.5L9.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14.5 9L15.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 6V18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15 9.5C15 8.12 13.88 7 12.5 7H9.5C8.12 7 7 8.12 7 9.5C7 10.88 8.12 12 9.5 12H14.5C15.88 12 17 13.12 17 14.5C17 15.88 15.88 17 14.5 17H9.5C8.12 17 7 15.88 7 14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {tag}
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-between items-center">
        <div>
          <div className="text-2xl font-semibold">${student.sponsorAmount}</div>
          <div className="text-xs text-gray-500">/${student.amount}</div>
        </div>
        <Link
          href={`/dashboard/student/${student.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View More
        </Link>
      </div>
    </div>
  );
} 
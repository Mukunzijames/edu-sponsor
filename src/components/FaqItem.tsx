import { ReactNode } from "react";

interface FaqItemProps {
  question: string;
  answer?: string;
  icon?: ReactNode;
}
// FaqItem component
// This component displays a single FAQ item with an optional icon
export default function FaqItem({ question, answer, icon }: FaqItemProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start">
        <div className="mr-3 text-green-500">
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">{question}</h3>
          {answer && <p className="text-gray-600 text-sm mt-2">{answer}</p>}
        </div>
      </div>
    </div>
  );
} 
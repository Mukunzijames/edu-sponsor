import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  title: string;
  content: string;
  author: string;
  rating?: number;
}

export default function TestimonialCard({
  title,
  content,
  author,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">
          <div className="flex">
            {Array.from({ length: rating }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-400"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ))}
          </div>
        </div>
        <p className="text-center font-semibold text-sm mb-4">{title}</p>
        <p className="text-center text-gray-600 text-sm mb-6">{content}</p>
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          <span className="font-semibold text-sm">{author}</span>
        </div>
      </CardContent>
    </Card>
  );
} 
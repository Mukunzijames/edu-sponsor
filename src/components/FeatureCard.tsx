import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  iconBgColor = "bg-green-100",
  iconColor = "text-green-600",
}: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
        <h3 className="text-center font-semibold text-lg mb-2">{title}</h3>
        <p className="text-center text-gray-600 text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
} 
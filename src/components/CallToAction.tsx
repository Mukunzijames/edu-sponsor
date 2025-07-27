import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  className?: string;
}

export default function CallToAction({
  title,
  description,
  buttonText,
  className = "",
}: CallToActionProps) {
  return (
    <section className={`py-16 bg-indigo-600 text-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="mb-8 text-lg opacity-90">{description}</p>
          <Link href="/register">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 
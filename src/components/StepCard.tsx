interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export default function StepCard({
  number,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center mx-auto mb-4 font-bold">
        {number}
      </div>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="text-sm opacity-80">
        {description}
      </p>
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="ml-2 text-2xl font-bold">edusponsor</span>
        </div>
        <div className="flex gap-4">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6">
            Sign Up
          </Button>
          <Button variant="outline" className="bg-white text-black hover:bg-gray-100 border-black rounded-full px-6">
            Log In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-bold leading-tight">
            Sponsor a<br />
            Future.<br />
            Change a Life.
          </h1>
          <p className="text-blue-500 text-xl">
            Connecting students in need with sponsors who care.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6">
              Donate
            </Button>
            <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="rounded-3xl overflow-hidden border-4 border-blue-500">
            <div className="relative w-full aspect-square md:aspect-[4/5]">
              <div className="absolute inset-0 bg-amber-100 flex items-center justify-center">
                <p className="text-gray-500">Student Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

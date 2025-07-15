import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallToAction from "@/components/CallToAction";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import FaqAccordion from "@/components/FaqAccordion";

export default function Home() {
  const faqItems = [
    {
      question: "How can I become a sponsor on EduSponsor?",
      answer: "Sign up on the EduSponsor platform, browse student profiles, and choose who you'd like to support. You can start sponsoring immediately with a simple and secure donation process."
    },
    {
      question: "What details do I receive when I start supporting a student?",
      answer: "You receive the student's name, school, academic needs, photo, and background story. Progress reports, attendance, and achievements are shared regularly to keep you connected to your impact."
    },
    {
      question: "How will I know how my sponsored student is doing?",
      answer: "You'll receive regular updates on attendance, grades, and milestones. Schools also share photos, videos, and notes from your sponsored student, giving you a full picture of their progress."
    },
    {
      question: "Can I support more than one student?",
      answer: "Yes, EduSponsor allows you to sponsor multiple students at once. You can manage all your sponsorships from your dashboard and track each student's journey individually."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sponsor a <br />Future.<br />
              Change a Life.
            </h1>
            
            <p className="mb-8 max-w-md">
              Get student sponsorship delivered with trust—connecting 
              real needs to real impact through a verified two-way 
              communication system.
            </p>
            
            <Link href="/register">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden">
              <Image 
                src="/mockup.svg" 
                alt="Student sponsorship platform mockup" 
                width={550} 
                height={450}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Verified Registration"
              description="Verified schools can register a profile of students in need, creating a trusted connection between sponsors and students."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              }
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />

            <FeatureCard 
              title="Real-Time Progress Updates"
              description="Real-time progress updates, academic achievements, photos and videos of students' performance, and personal messages on the platform."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              }
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />

            <FeatureCard 
              title="Quality & Effort-proof"
              description="Our education support is more than just a basic donation; it works to ensure quality and effort from both students and schools."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              }
              iconBgColor="bg-pink-100"
              iconColor="text-pink-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-wider mb-2">SIMPLE STEP-BY-STEP PROCESS</p>
            <h2 className="text-3xl font-bold">Let's see how it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard 
              number="01"
              title="Schools Submit Student Profiles"
              description="We find schools in need of aid for their students' education. They create profiles for students who need sponsorship and submit for verification."
            />

            <StepCard 
              number="02"
              title="Sponsors Browse & Select Students"
              description="Sponsors find the perfect student to support based on their interests, goals, and needs. They can choose how much they'd like to contribute each month."
            />

            <StepCard 
              number="03"
              title="Sponsorship Is Activated"
              description="Once a sponsor selects a student, the sponsorship is activated. Funds go directly to the school for the student's education, with full transparency."
            />

            <StepCard 
              number="04"
              title="Sponsor Receives Updates"
              description="Sponsors receive regular updates on their student's progress, including academic achievements, photos, and personal messages throughout the year."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl font-bold text-gray-900">Meet Client Satisfaction</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              title="Life-Changing Impact"
              content="Sponsoring a student through eduSponsor has given me a direct connection to real progress. It's rewarding to know I'm part of something that creates educational impact."
              author="Maria Chapman"
            />
            
            <TestimonialCard 
              title="Transparency and Trustworthy"
              content="The platform is well-designed and user-friendly. I could see my verified student's details and receive updates from the school."
              author="James Morgan"
            />
            
            <TestimonialCard 
              title="Simple, Safe, Effective"
              content="As a first-time sponsor, I appreciated how easy it was to use their platform. I can see my supporting real students through the process."
              author="Emma Nguyen"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-2">FREQUENT QUESTIONS</p>
            <h2 className="text-3xl font-bold text-gray-900">Do you have any question</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction 
        title="Ready to make a difference?"
        description="Join thousands of sponsors who are changing lives through education. Your support can help a student achieve their dreams."
        buttonText="Become a Sponsor Today"
      />

      <Footer />
    </div>
  );
}

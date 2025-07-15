// frontend/src/app/page.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; // We'll use this later

export default function HomePage() {
  return (
    <main className="flex flex-col items-center bg-white">
      <div className="text-center max-w-4xl mx-auto px-4 pt-20 md:pt-32">
        {/* The main headline, using our serif font for impact */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-brand-secondary leading-tight animate-fade-in-up">
          Stop Fighting the Curriculum. <br />
          <span className="text-brand-primary">
            Start Inspiring the Future.
          </span>
        </h1>

        {/* The descriptive paragraph */}
        <p
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          LearnBridgeEdu is the AI Co-Teacher for Ghana. We transform the SBC
          from a document into a dynamic, engaging, and personalized learning
          experience for every teacher and student.
        </p>

        {/* The call-to-action buttons */}
        <div
          className="mt-8 flex justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-8 py-6 text-base"
          >
            I'm a Teacher <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-bold border-2 border-brand-secondary text-brand-secondary px-8 py-6 text-base hover:bg-brand-secondary/5"
          >
            I'm a Student
          </Button>
        </div>
      </div>

      {/* Visually stunning hero image representing collaboration and technology */}
      <div
        className="relative w-full max-w-6xl mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="aspect-video rounded-t-xl overflow-hidden border-8 border-b-0 border-black shadow-2xl">
          <Image
            src="/hero-visual.jpg"
            alt="Diverse group of students in Ghana collaborating with technology in a modern classroom setting"
            fill
            style={{ objectFit: "cover" }}
            className="saturate-150"
            priority={true}
          />
        </div>
      </div>
    </main>
  );
}

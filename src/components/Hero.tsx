import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-accent to-background py-20 px-4">
      <div className="container max-w-6xl mx-auto text-center animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6">
          Collaborate, Grow, Succeed
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join a Network of Skilled Building Professionals
        </p>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          The private community where artisans and construction companies exchange advice,
          tackle challenges together, and find new opportunities to thrive.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
          Join the Community <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
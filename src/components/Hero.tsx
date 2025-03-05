
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary/95 to-primary py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" />
      
      <div className="container max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left space-y-6 animate-fade-up mx-auto md:mx-0 max-w-md md:max-w-none">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Votre sous-traitance est désormais entre de bonnes mains
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Gérez, centralisez, pilotez vos sous-traitants au même endroit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-white hover:bg-white/90 text-primary text-lg w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 text-lg w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Découvrir les fonctionnalités
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

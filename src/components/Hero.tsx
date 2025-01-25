import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="min-h-[80vh] flex items-center justify-between bg-primary py-20 px-4">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left md:max-w-[50%] animate-fade-up">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            La communauté privée des artisans du bâtiment.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Rejoignez une communauté privée d'artisans et d'entreprises du bâtiment :
            Un espace d'entraide et d'opportunités pour les professionnels du bâtiment, 
            où la collaboration permet de construire ensemble le bâtiment de demain.
          </p>
          <div className="text-5xl mb-12">🤝</div>
          <Button 
            size="lg" 
            className="bg-white hover:bg-white/90 text-primary"
            onClick={() => {
              document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Rejoindre la communauté <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {!isMobile && (
          <div className="hidden md:block w-full max-w-[350px] animate-fade-up">
            <img 
              src="/lovable-uploads/29a58e67-540f-431e-b7f6-d21e5face096.png"
              alt="Interface de la communauté WhatsApp Le coup de main"
              className="w-full h-auto rounded-[40px] shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};
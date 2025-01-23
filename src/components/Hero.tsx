import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-primary py-20 px-4">
      <div className="container max-w-6xl mx-auto text-center animate-fade-up">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white p-4 flex items-center justify-center">
          <img 
            src="/lovable-uploads/e85d39bf-e67c-461f-924f-bc5580a4ad96.png" 
            alt="Le coup de main"
            className="w-24 h-24 object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Rejoignez la communauté privée des artisans indépendants et entreprise bâtiment
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
          Rejoignez une communauté privée d'artisans et d'entreprises du bâtiment engagés, 
          où la collaboration, entraide et opportunités professionnelles se rencontrent 
          pour construire ensemble le bâtiment de demain
        </p>
        <div className="text-5xl mb-12">🤝</div>
        <Button size="lg" className="bg-white hover:bg-white/90 text-primary">
          Rejoindre la communauté <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
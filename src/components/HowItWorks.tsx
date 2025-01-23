import { CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

type Step = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const steps: Step[] = [
  {
    title: "Inscription",
    description: "Remplissez notre formulaire ou prenez rendez-vous si vous n'êtes pas parrainé",
  },
  {
    title: "Accès",
    description: "Vous êtes invité à rejoindre la communauté privée sur Whatsapp",
  },
  {
    title: "Collaboration",
    description: "Commencez à partager, apprendre et trouver des opportunités immédiatement",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-secondary text-white">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          La communauté privée des artisans indépendants et des entreprises bâtiment
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">
                {step.icon || <CheckCircle2 className="h-12 w-12 text-primary" />}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
              {index === 0 && (
                <a 
                  href="#not-recommended" 
                  className="text-primary hover:text-primary/90 underline mt-2 inline-block"
                >
                  Cliquez-ici pour savoir comment rejoindre
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
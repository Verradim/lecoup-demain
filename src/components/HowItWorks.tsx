
import { CheckCircle2 } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const steps: Step[] = [
  {
    title: "Inscription gratuite",
    description: "Créez votre compte gratuitement en quelques clics pour accéder à la plateforme",
  },
  {
    title: "Créez votre profil",
    description: "Renseignez les informations de votre entreprise (SIRET, coordonnées, etc.)",
  },
  {
    title: "Ajoutez vos sous-traitants",
    description: "Enregistrez les informations de vos sous-traitants pour faciliter la gestion",
  },
  {
    title: "Importez vos chantiers",
    description: "Ajoutez vos devis et créez les chantiers que vous souhaitez déléguer",
  },
  {
    title: "Générez vos contrats",
    description: "Créez facilement vos contrats de sous-traitance en sélectionnant tout ou partie de vos chantiers",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-secondary text-white">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="mb-6 flex justify-center">
                {step.icon || <CheckCircle2 className="h-12 w-12 text-primary" />}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-primary"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

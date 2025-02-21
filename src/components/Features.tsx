
import { FileCheck, Users, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Générez vos contrats de sous-traitance en quelques clics",
    description: "Créez des contrats professionnels et conformes à la législation en vigueur rapidement et simplement."
  },
  {
    icon: Users,
    title: "Centralisez vos sous-traitants",
    description: "Gardez toutes les informations de vos sous-traitants au même endroit pour une gestion simplifiée."
  },
  {
    icon: ShieldCheck,
    title: "Sécurisez vos relations",
    description: "Assurez-vous de la conformité de vos contrats et protégez votre entreprise."
  },
  {
    icon: Zap,
    title: "Gagnez du temps",
    description: "Automatisez la création de vos contrats et concentrez-vous sur votre cœur de métier."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simplifiez la gestion de vos sous-traitants
          </h2>
          <p className="text-xl text-gray-600">
            Une solution complète pour gérer efficacement vos contrats de sous-traitance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

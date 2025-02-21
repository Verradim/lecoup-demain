
import { Check, Building2, User, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const offers = [
  {
    name: "Starter",
    description: "Pour les artisans qui veulent tester le service et gérer quelques contrats ponctuels.",
    price: "Gratuit",
    period: "pour toujours",
    features: [
      "2 contrats par mois",
      "Jusqu'à 3 sous-traitants",
      "1 profil utilisateur",
    ],
    buttonText: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    description: "Pour les artisans et PME qui ont une activité régulière et veulent optimiser leur gestion.",
    price: "29€",
    period: "par mois",
    features: [
      "Jusqu'à 10 contrats",
      "Sous-traitants illimités",
      "1 profil utilisateur",
      "Chantiers illimités",
    ],
    buttonText: "Choisir l'offre Pro",
    popular: true,
  },
  {
    name: "Business",
    description: "Pour les entreprises du bâtiment avec une gestion avancée des contrats et des sous-traitants.",
    price: "Sur devis",
    period: "",
    features: [
      "Contrats illimités",
      "Sous-traitants illimités",
      "Jusqu'à 5 utilisateurs",
      "Chantiers illimités",
      "Utilisateurs supplémentaires",
    ],
    buttonText: "Contacter l'équipe",
    popular: false,
  },
];

export const Offers = () => {
  return (
    <section className="py-20 px-4 bg-background" id="offers">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos offres
          </h2>
          <p className="text-xl text-muted-foreground">
            Choisissez l'offre qui correspond à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <Card 
              key={index}               
              className={`relative flex flex-col ${
                offer.popular 
                  ? "border-primary shadow-lg scale-105" 
                  : "border-border"
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Plus populaire
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{offer.name}</CardTitle>
                <CardDescription className="min-h-[60px]">{offer.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{offer.price}</span>
                    {offer.period && (
                      <span className="text-muted-foreground ml-2">{offer.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-x-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={offer.popular ? "default" : "outline"}
                  onClick={() => {
                    document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {offer.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

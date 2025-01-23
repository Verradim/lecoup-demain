import { Users, Briefcase, MessageSquare, Target, HandshakeIcon, TrendingUp, Share2, HelpingHand, Clock, UserPlus, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    title: "Pour les artisans indépendants",
    items: [
      { 
        icon: MessageSquare, 
        title: "Échanger et apprendre avec vos pairs",
        text: "Rejoignez un groupe d'artisans passionnés pour partager des conseils, bonnes pratiques et retours d'expérience." 
      },
      { 
        icon: HelpingHand, 
        title: "Trouver de l'aide en cas d'imprévus",
        text: "Une urgence sur un chantier ? Posez vos questions et recevez une aide immédiate de la communauté." 
      },
      { 
        icon: TrendingUp, 
        title: "Développer votre activité",
        text: "Découvrez des conseils pratiques pour attirer plus de clients et faire grandir votre activité." 
      },
      { 
        icon: Briefcase, 
        title: "Accéder à de nouvelles opportunités",
        text: "Collaborez avec des entreprises qui cherchent à déléguer des chantiers ou qui ont besoin de main-d'œuvre ponctuelle." 
      },
      { 
        icon: Share2, 
        title: "Augmenter votre visibilité",
        text: "Partagez vos réalisations et vos contenus avec la communauté pour booster votre image et trouver plus de clients." 
      },
      { 
        icon: HandshakeIcon, 
        title: "S'entraider pour réussir ensemble",
        text: "Bénéficiez d'un réseau solidaire où chacun s'entraide pour avancer plus vite." 
      },
    ],
  },
  {
    title: "Pour les entreprises du bâtiment",
    items: [
      { 
        icon: Users, 
        title: "Échanger avec d'autres professionnels",
        text: "Bénéficiez d'un espace pour discuter des meilleures pratiques, partager des ressources ou résoudre des problèmes ensemble." 
      },
      { 
        icon: Clock, 
        title: "Gagner du temps dans la recherche de partenaires",
        text: "Plus besoin de passer des heures à chercher des contacts : notre communauté vous connecte directement à des indépendants compétents." 
      },
      { 
        icon: UserPlus, 
        title: "Trouver rapidement des renforts qualifiés",
        text: "Accédez à un réseau d'artisans indépendants fiables pour combler un manque ponctuel de main-d'œuvre." 
      },
      { 
        icon: Share2, 
        title: "Augmenter votre visibilité",
        text: "Partagez vos réalisations et vos contenus avec la communauté pour booster votre image et trouver plus de clients." 
      },
      { 
        icon: Lightbulb, 
        title: "Échanger avec des idées et bonnes pratiques avec pairs",
        text: "Accéder à une communauté qui partage vos enjeux (problématiques, processus, solutions)" 
      },
      { 
        icon: HandshakeIcon, 
        title: "S'entraider pour réussir ensemble",
        text: "Bénéficiez d'un réseau solidaire où chacun s'entraide pour avancer plus vite." 
      },
    ],
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          Pourquoi rejoindre la communauté Le coup de main ?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((category) => (
            <div key={category.title} className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-8">{category.title}</h3>
              {category.items.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-lg">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      {'title' in item && (
                        <h4 className="font-semibold text-secondary mb-2">{item.title}</h4>
                      )}
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
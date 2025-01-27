import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>À propos | Le Coup de Main - Communauté des artisans du bâtiment</title>
        <meta name="description" content="Découvrez Le Coup de Main, la communauté qui connecte les artisans indépendants et les entreprises du bâtiment. Ensemble, construisons l'avenir du secteur." />
        <link rel="canonical" href="https://lecoup-demain.com/about" />
        <meta property="og:title" content="À propos | Le Coup de Main - Communauté des artisans du bâtiment" />
        <meta property="og:description" content="Découvrez Le Coup de Main, la communauté qui connecte les artisans indépendants et les entreprises du bâtiment. Ensemble, construisons l'avenir du secteur." />
        <meta property="og:url" content="https://lecoup-demain.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lecoup-demain.com/lovable-uploads/logo-white1.png" />
      </Helmet>

    <div className="bg-background font-sans">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Qui sommes-nous ?</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Bienvenue dans notre communauté de professionnels du bâtiment. Nous sommes une initiative dédiée à créer des connexions solides entre artisans indépendants et entreprises du bâtiment, afin de favoriser la collaboration, l'entraide et la réussite commune.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8">Nous avons à cœur de :</h2>
          <div className="space-y-4 text-gray-700">
            <p className="pl-4 border-l-4 border-primary">
              Permettre aux artisans de développer leur activité et d'accéder à de nouvelles opportunités.
            </p>
            <p className="pl-4 border-l-4 border-primary">
              Aider les entreprises à trouver rapidement des partenaires qualifiés pour combler leurs besoins ponctuels.
            </p>
            <p className="pl-4 border-l-4 border-primary">
              Renforcer les liens entre les professionnels pour bâtir une véritable communauté solidaire.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8">Nos valeurs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">Collaboration</h3>
              <p className="text-gray-700">Ensemble, nous allons plus loin. L'entraide est au cœur de notre démarche.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">Confiance</h3>
              <p className="text-gray-700">Nous mettons un point d'honneur à connecter des professionnels qualifiés et fiables.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">Solidarité</h3>
              <p className="text-gray-700">Une communauté où chacun trouve du soutien et partage son expérience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-primary mb-2">Innovation</h3>
              <p className="text-gray-700">Nous utilisons des outils modernes pour simplifier les échanges et rendre votre quotidien plus fluide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8">Notre équipe</h2>
          <div className="text-gray-700 mb-8">
            <p className="mb-6">
              Derrière cette initiative se trouve une équipe motivée par une vision claire : réunir tous les acteurs du bâtiment dans un réseau dynamique et solidaire. Nous sommes des professionnels du bâtiment, des passionnés par le digital et des entrepreneurs partageant une mission commune : vous aider à réussir.
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/c853df75-6c65-4b60-8a19-f9f2bf811c56.png"
                alt="Dimitri Chauchoy" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">Dimitri, créateur de la communauté Le coup de main</p>
                <a 
                  href="https://www.linkedin.com/in/dimitrichauchoy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 mt-1"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Suivre sur LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-8">Pourquoi nous rejoindre ?</h2>
          <p className="text-gray-700 mb-6">
            Notre communauté est bien plus qu'un simple réseau. C'est un espace d'échanges et de collaboration qui vous permet de :
          </p>
          <ul className="space-y-4 text-gray-700 mb-8">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Trouver de l'aide en cas d'imprévu sur un chantier.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Développer votre réseau professionnel et accéder à de nouvelles opportunités.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Partager vos réalisations et augmenter votre visibilité.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Bénéficier de conseils pratiques pour améliorer votre activité.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Collaborer avec des pairs qui partagent vos défis et vos aspirations.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Rejoignez-nous dès aujourd'hui</h2>
          <p className="mb-8">
            Envie de faire partie d'une communauté engagée et solidaire ? Rejoignez-nous maintenant et commencez à collaborer avec des professionnels passionnés comme vous. Ensemble, donnons vie à vos projets et relevons les défis du bâtiment.
          </p>
          <Link to="/#join-form">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Rejoignez la communauté
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;
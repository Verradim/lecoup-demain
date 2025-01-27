import { Helmet } from "react-helmet";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { JoinForm } from "@/components/JoinForm";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>Le Coup de Main - La communauté privée des artisans indépendants et des entreprises du bâtiment</title>
        <meta name="description" content="Découvrez Le coup de Main : La communauté privée des artisans indépendants et des entreprises du bâtiment. Une initiative dédiée à créer des connexions solides entre professionnels du bâtiment." />
        <link rel="canonical" href="https://lecoup-demain.com" />
        <meta property="og:title" content="Le Coup de Main : La communauté privée des artisans indépendants et des entreprises du bâtiment" />
        <meta property="og:description" content="La communauté privée des artisans indépendants et des entreprises du bâtiment. Découvrez notre initiative dédiée à créer des connexions solides entre professionnels." />
        <meta property="og:url" content="https://lecoup-demain.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lecoup-demain.com/lovable-uploads/logo-white1.png" />
      </Helmet>
      <div className="bg-background font-sans">
        <Hero />
        <Benefits />
        <JoinForm />
        <HowItWorks />
        <Testimonials />
      </div>
    </>
  );
};

export default Index;
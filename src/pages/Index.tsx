import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { JoinForm } from "@/components/JoinForm";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Layout } from "@/components/Layout";

const Index = () => {
  return (
    <Layout
      title="Le Coup de Main - La communauté privée des artisans indépendants et des entreprises du bâtiment"
      description="Découvrez Le coup de Main : La communauté privée des artisans indépendants et des entreprises du bâtiment. Une initiative dédiée à créer des connexions solides entre professionnels du bâtiment."
      canonicalUrl="https://lecoup-demain.com"
    >
      <div className="bg-background font-sans">
        <Hero />
        <Benefits />
        <JoinForm />
        <HowItWorks />
        <Testimonials />
      </div>
    </Layout>
  );
};

export default Index;
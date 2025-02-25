
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Offers } from "@/components/Offers";
import { JoinForm } from "@/components/JoinForm";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Layout } from "@/components/Layout";

const Index = () => {
  return (
    <Layout
      title="Sous-traitance simplifiée - Gérez vos contrats de sous-traitance en quelques clics"
      description="Simplifiez la gestion de vos sous-traitants. Générez des contrats conformes, centralisez vos informations et gagnez du temps dans la gestion de vos relations de sous-traitance."
      canonicalUrl="https://lecoup-demain.com"
    >
      <div className="bg-background font-sans">
        <Hero />
        <HowItWorks />
        <Features />
        <Offers />
        <JoinForm />
        <Testimonials />
      </div>
    </Layout>
  );
};

export default Index;

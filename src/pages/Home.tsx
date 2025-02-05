import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";

const Home = () => {
  return (
    <Layout
      title="Le Coup de Main - Plateforme de mise en relation pour artisans"
      description="Le Coup de Main est une plateforme qui met en relation les artisans pour s'entraider sur leurs chantiers."
      canonicalUrl="https://lecoup-demain.com"
    >
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
    </Layout>
  );
};

export default Home;
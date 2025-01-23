import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Raleway',
        'url(https://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrEVIT9d0c8.woff2)'
      );

      try {
        await font.load();
        document.fonts.add(font);
        console.log('Raleway font loaded successfully');
      } catch (error) {
        console.error('Error loading Raleway font:', error);
      }
    };

    loadFont();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { JoinForm } from "@/components/JoinForm";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";

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
    <div className="bg-background font-sans">
      <Hero />
      <Benefits />
      <JoinForm />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Index;
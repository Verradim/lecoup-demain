
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeatureCard, Feature } from "./upcoming-features/FeatureCard";
import { VoteDialog } from "./upcoming-features/VoteDialog";
import { useFeatures } from "./upcoming-features/useFeatures";
import { LoadingFeatureCards } from "./upcoming-features/LoadingFeatureCards";

export const UpcomingFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { features, loading, handleVote } = useFeatures();

  const handleVoteClick = async (feature: Feature) => {
    if (feature.hasVoted) return;
    
    // First, register the vote without email
    const success = await handleVote(feature.id, null);
    
    if (success) {
      // Then open dialog to ask for email
      setSelectedFeature(feature);
      setDialogOpen(true);
    }
  };

  const handleVoteSubmit = async (email: string) => {
    if (!selectedFeature || !email) {
      // If no email provided, just close the dialog
      setDialogOpen(false);
      setSelectedFeature(null);
      return;
    }

    // Update the existing vote with the email
    const success = await handleVote(selectedFeature.id, email);
    
    if (success) {
      // Close dialog and reset form
      setDialogOpen(false);
      setSelectedFeature(null);
    }
  };

  const handleSuggestFeature = () => {
    // Scroll to contact form and set subject
    const contactForm = document.getElementById('join-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      
      // Set subject to feature suggestion
      const event = new CustomEvent('suggestFeature');
      document.dispatchEvent(event);
    }
  };

  return (
    <section id="upcoming-features" className="py-20 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités à venir
          </h2>
          <p className="text-xl text-gray-600">
            Votez pour les fonctionnalités que vous souhaitez voir développées en priorité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {loading ? (
            <LoadingFeatureCards />
          ) : (
            features.map((feature, index) => (
              <FeatureCard 
                key={feature.id}
                feature={feature}
                isTopVoted={index === 0}
                onVoteClick={handleVoteClick}
              />
            ))
          )}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={handleSuggestFeature}
            className="mx-auto"
          >
            Suggérer une fonctionnalité
          </Button>
        </div>

        <VoteDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          selectedFeature={selectedFeature}
          onVoteSubmit={handleVoteSubmit}
        />
      </div>
    </section>
  );
};

export default UpcomingFeatures;

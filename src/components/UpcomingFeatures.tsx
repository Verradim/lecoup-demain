
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Scan, FileText, Users, Vote } from "lucide-react";

type Feature = {
  id: string;
  name: string;
  description: string;
  icon: string;
  voteCount: number;
  hasVoted: boolean;
};

// Helper function to get the icon component based on string name
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'scan':
      return Scan;
    case 'file-text':
      return FileText;
    case 'users':
      return Users;
    default:
      return Vote;
  }
};

export const UpcomingFeatures = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch features from the database
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data: featuresData, error: featuresError } = await supabase
          .from('roadmap_features')
          .select('*')
          .order('sort_order', { ascending: true });

        if (featuresError) {
          console.error('Error fetching features:', featuresError);
          return;
        }

        // Get vote counts for each feature
        const { data: votesData, error: votesError } = await supabase
          .from('roadmap_votes')
          .select('feature_id, id');

        if (votesError) {
          console.error('Error fetching votes:', votesError);
          return;
        }

        // Count votes for each feature
        const voteCounts = votesData.reduce((acc: Record<string, number>, vote) => {
          acc[vote.feature_id] = (acc[vote.feature_id] || 0) + 1;
          return acc;
        }, {});

        // Check if user has voted (this is simplified, in a real app you'd use sessions/cookies)
        const votedFeatureIds = new Set();
        const storedVotes = localStorage.getItem('votedFeatures');
        if (storedVotes) {
          JSON.parse(storedVotes).forEach((id: string) => votedFeatureIds.add(id));
        }

        // Transform the data
        const transformedFeatures = featuresData.map((feature) => ({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          icon: feature.icon,
          voteCount: voteCounts[feature.id] || 0,
          hasVoted: votedFeatureIds.has(feature.id),
        }));

        // Sort by vote count (descending)
        transformedFeatures.sort((a, b) => b.voteCount - a.voteCount);
        
        setFeatures(transformedFeatures);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const handleVoteClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setDialogOpen(true);
  };

  const handleVoteSubmit = async () => {
    if (!selectedFeature) return;

    try {
      // Save vote to database
      const { error } = await supabase
        .from('roadmap_votes')
        .insert({
          feature_id: selectedFeature.id,
          email: email || null
        });

      if (error) {
        console.error('Error submitting vote:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement de votre vote.",
        });
        return;
      }

      // Save voted feature ID in localStorage
      const votedFeatures = JSON.parse(localStorage.getItem('votedFeatures') || '[]');
      votedFeatures.push(selectedFeature.id);
      localStorage.setItem('votedFeatures', JSON.stringify(votedFeatures));

      // Update UI
      setFeatures(features.map(f => 
        f.id === selectedFeature.id 
          ? { ...f, voteCount: f.voteCount + 1, hasVoted: true } 
          : f
      ));

      // Show success message
      toast({
        title: "Merci pour votre vote !",
        description: email 
          ? "Votre vote a été enregistré avec succès." 
          : "Votre vote a été enregistré. Pour être informé des avancées, n'hésitez pas à nous laisser votre email.",
      });

      // Close dialog and reset form
      setDialogOpen(false);
      setEmail("");
      setSelectedFeature(null);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de votre vote.",
      });
    }
  };

  const handleSuggestFeature = () => {
    // Scroll to contact form and set subject
    const contactForm = document.getElementById('join-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      
      // Set subject to feature suggestion (this would need to be implemented in JoinForm)
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
            Array(4).fill(0).map((_, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                </CardHeader>
                <CardContent className="animate-pulse">
                  <div className="h-8 w-24 bg-gray-200 rounded mt-4"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              const isTopVoted = index === 0;
              
              return (
                <Card 
                  key={feature.id} 
                  className={`bg-white ${isTopVoted ? 'border-primary' : 'border-gray-200'} shadow-sm hover:shadow-md transition-shadow duration-300`}
                >
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">
                      {feature.name}
                      {isTopVoted && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Populaire</span>}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant={feature.hasVoted ? "secondary" : "default"}
                      onClick={() => handleVoteClick(feature)}
                      disabled={feature.hasVoted}
                      className="mt-4"
                    >
                      {feature.hasVoted ? "Vous avez voté" : "Voter"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
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

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Voter pour cette fonctionnalité</DialogTitle>
              <DialogDescription>
                Laissez votre email pour être informé lorsque la fonctionnalité sera disponible.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="col-span-4">
                  Email (optionnel)
                </Label>
                <Input
                  id="email"
                  placeholder="votre@email.com"
                  className="col-span-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleVoteSubmit}>Confirmer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default UpcomingFeatures;

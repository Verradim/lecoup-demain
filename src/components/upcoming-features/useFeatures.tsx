
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Feature } from "./FeatureCard";

export const useFeatures = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
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

  const handleVote = async (featureId: string, email: string | null = null) => {
    try {
      let voteId: string | null = null;
      
      // Check if we have pending votes in localStorage
      const pendingVotes = JSON.parse(localStorage.getItem('pendingVotes') || '{}');
      
      // If this is a vote with email and we have a pending vote ID
      if (email && pendingVotes[featureId]) {
        // Update existing vote with email
        const { error } = await supabase
          .from('roadmap_votes')
          .update({ email })
          .eq('id', pendingVotes[featureId]);
          
        if (error) {
          console.error('Error updating vote with email:', error);
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Une erreur est survenue lors de l'enregistrement de votre email.",
          });
          return false;
        }
        
        // Remove from pending votes
        delete pendingVotes[featureId];
        localStorage.setItem('pendingVotes', JSON.stringify(pendingVotes));
        
        toast({
          title: "Email enregistré !",
          description: "Vous serez informé lorsque la fonctionnalité sera disponible.",
        });
        
        return true;
      }
      
      // This is a new vote (first click)
      const { data, error } = await supabase
        .from('roadmap_votes')
        .insert({
          feature_id: featureId,
          email: null
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error submitting vote:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement de votre vote.",
        });
        return false;
      }
      
      // Store the vote ID for potential email update later
      voteId = data.id;
      pendingVotes[featureId] = voteId;
      localStorage.setItem('pendingVotes', JSON.stringify(pendingVotes));

      // Save voted feature ID in localStorage
      const votedFeatures = JSON.parse(localStorage.getItem('votedFeatures') || '[]');
      votedFeatures.push(featureId);
      localStorage.setItem('votedFeatures', JSON.stringify(votedFeatures));

      // Update UI
      setFeatures(features.map(f => 
        f.id === featureId 
          ? { ...f, voteCount: f.voteCount + 1, hasVoted: true } 
          : f
      ));
      
      // First vote without email
      toast({
        title: "Merci pour votre vote !",
        description: "Votre vote a été enregistré.",
      });

      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de votre vote.",
      });
      return false;
    }
  };

  return { features, loading, handleVote };
};


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan, FileText, Users, Vote } from "lucide-react";

export type Feature = {
  id: string;
  name: string;
  description: string;
  icon: string;
  voteCount: number;
  hasVoted: boolean;
};

// Helper function to get the icon component based on string name
export const getIconComponent = (iconName: string) => {
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

interface FeatureCardProps {
  feature: Feature;
  isTopVoted: boolean;
  onVoteClick: (feature: Feature) => void;
}

export const FeatureCard = ({ feature, isTopVoted, onVoteClick }: FeatureCardProps) => {
  const IconComponent = getIconComponent(feature.icon);
  
  return (
    <Card 
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
          onClick={() => onVoteClick(feature)}
          disabled={feature.hasVoted}
          className="mt-4"
        >
          {feature.hasVoted ? "Vous avez voté" : "Voter"}
        </Button>
      </CardContent>
    </Card>
  );
};

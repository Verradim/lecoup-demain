
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoadingFeatureCards = () => {
  return (
    <>
      {Array(4).fill(0).map((_, index) => (
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
      ))}
    </>
  );
};

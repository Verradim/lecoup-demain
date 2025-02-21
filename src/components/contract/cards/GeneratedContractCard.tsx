
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { Tables } from "@/integrations/supabase/types"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

interface GeneratedContractCardProps {
  contractId: string;
}

export const GeneratedContractCard = ({ contractId }: GeneratedContractCardProps) => {
  const { data: generatedContract } = useQuery({
    queryKey: ["generated-contracts", contractId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_contracts")
        .select("*")
        .eq("contract_id", contractId)
        .single();

      if (error) throw error;
      return data as Tables<"generated_contracts">;
    },
    refetchInterval: 5000, // Rafraîchir toutes les 5 secondes jusqu'à ce que les URLs soient disponibles
  });

  if (!generatedContract?.pdf_url && !generatedContract?.preview_url) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contrat en cours de génération</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">La génération du contrat est en cours, veuillez patienter quelques instants...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document généré</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {generatedContract.preview_url && (
          <div>
            <Button 
              variant="outline" 
              onClick={() => window.open(generatedContract.preview_url!, "_blank")}
              className="w-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualiser le contrat
            </Button>
          </div>
        )}
        
        {generatedContract.pdf_url && (
          <div>
            <Button 
              onClick={() => window.open(generatedContract.pdf_url!, "_blank")}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger le PDF
            </Button>
          </div>
        )}
        
        {generatedContract.pdf_url && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Le lien de téléchargement est valide pendant 1 heure
          </p>
        )}
      </CardContent>
    </Card>
  );
};


import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContractForm } from "@/components/contract/ContractForm";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"contracts">;

const ContractEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: contract, isLoading } = useQuery({
    queryKey: ["contracts", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Contract;
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!contract) {
    return <div>Contrat non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate("/mon-espace/contrats")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux contrats
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Modifier le contrat</h1>
        <p className="text-muted-foreground mt-1">
          Modifiez les informations du contrat ci-dessous
        </p>
      </div>

      <ContractForm mode="edit" contract={contract} />
    </div>
  );
};

export default ContractEdit;


import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { ContractDetails as ContractDetailsComponent } from "@/components/contract/ContractDetails";

type Contract = Tables<"contracts">;

const ContractDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

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

  const handleDelete = async () => {
    const { error } = await supabase
      .from("contracts")
      .delete()
      .eq("id", id as string);

    if (error) throw error;
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!contract) {
    return <div>Contrat non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ContractDetailsComponent contract={contract} onDelete={handleDelete} />
    </div>
  );
};

export default ContractDetailsPage;

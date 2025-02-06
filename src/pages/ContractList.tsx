import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Contract {
  id: string;
  name: string;
  status: string;
  company_name: string;
  created_at: string;
}

const ContractList = () => {
  const navigate = useNavigate();

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Contract[];
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mes contrats</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos contrats de sous-traitance
          </p>
        </div>
        <Button onClick={() => navigate("/mon-espace/contrats/nouveau")}>
          <Plus className="w-4 h-4 mr-2" />
          Créer un nouveau contrat
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des contrats</CardTitle>
          <CardDescription>
            Tous vos contrats de sous-traitance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Chargement des contrats...</div>
          ) : contracts?.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">
                Vous n'avez pas encore créé de contrat
              </p>
              <Button onClick={() => navigate("/mon-espace/contrats/nouveau")}>
                Créer mon premier contrat
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {contracts?.map((contract) => (
                <div
                  key={contract.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/mon-espace/contrats/${contract.id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium">{contract.name}</h3>
                      <p className="text-sm text-gray-500">
                        {contract.company_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                      {contract.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractList;
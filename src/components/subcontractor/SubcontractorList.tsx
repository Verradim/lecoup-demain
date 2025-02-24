
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Subcontractor {
  id: string;
  company_name: string;
  siret: string;
  legal_representative_first_name: string;
  legal_representative_last_name: string;
}

export const SubcontractorList = () => {
  const { user } = useAuth();

  const { data: subcontractors, isLoading: loading } = useQuery({
    queryKey: ["subcontractors", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('subcontractors')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subcontractors:', error);
        toast.error("Erreur lors du chargement des sous-traitants");
        return [];
      }
      
      return data as Subcontractor[];
    },
    enabled: !!user,
  });

  if (loading) {
    return <div className="text-center py-8">Chargement des sous-traitants...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mes sous-traitants</h2>
        <Link to="/mon-espace/sous-traitants/nouveau">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un sous-traitant
          </Button>
        </Link>
      </div>

      {!subcontractors || subcontractors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Vous n'avez pas encore ajouté de sous-traitant</p>
          <Link to="/mon-espace/sous-traitants/nouveau">
            <Button>Ajouter mon premier sous-traitant</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {subcontractors.map((subcontractor) => (
            <div
              key={subcontractor.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{subcontractor.company_name}</h3>
              <p className="text-sm text-gray-600">SIRET: {subcontractor.siret}</p>
              <p className="text-sm text-gray-600">
                Représentant légal: {subcontractor.legal_representative_first_name} {subcontractor.legal_representative_last_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

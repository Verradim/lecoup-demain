import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Subcontractor {
  id: string;
  company_name: string;
  siret: string;
  legal_representative_first_name: string;
  legal_representative_last_name: string;
}

export const SubcontractorList = () => {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcontractors = async () => {
      try {
        const { data, error } = await supabase
          .from('subcontractors')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubcontractors(data || []);
      } catch (error: any) {
        console.error('Error fetching subcontractors:', error);
        toast.error("Erreur lors du chargement des sous-traitants");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcontractors();
  }, []);

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

      {subcontractors.length === 0 ? (
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

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/types/profile";
import { Project } from "@/pages/project-form/types";

type Contract = Tables<"contracts">;

interface ContractDetailsProps {
  contract: Contract;
  onDelete: () => Promise<void>;
}

export const ContractDetails = ({ contract, onDelete }: ContractDetailsProps) => {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profiles", contract.profile_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", contract.profile_id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const { data: subcontractor } = useQuery({
    queryKey: ["subcontractors", contract.subcontractor_id],
    queryFn: async () => {
      if (!contract.subcontractor_id) return null;
      const { data, error } = await supabase
        .from("subcontractors")
        .select("*")
        .eq("id", contract.subcontractor_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!contract.subcontractor_id,
  });

  const { data: project } = useQuery({
    queryKey: ["projects", contract.project_id],
    queryFn: async () => {
      if (!contract.project_id) return null;
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          work_titles (
            id,
            title,
            work_descriptions (
              id,
              description
            )
          )
        `)
        .eq("id", contract.project_id)
        .single();

      if (error) throw error;
      return data as Project;
    },
    enabled: !!contract.project_id,
  });

  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success("Contrat supprimé avec succès");
      navigate("/mon-espace/contrats");
    } catch (error: any) {
      toast.error("Erreur lors de la suppression du contrat: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/mon-espace/contrats")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux contrats
        </Button>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/mon-espace/contrats/${contract.id}/modifier`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>Détails du contrat</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Nom</h3>
            <p className="mt-1">{contract.name}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Statut</h3>
            <p className="mt-1">{contract.status}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Date de création
            </h3>
            <p className="mt-1">
              {new Date(contract.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              Dernière modification
            </h3>
            <p className="mt-1">
              {new Date(contract.updated_at).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {profile && (
        <Card>
          <CardHeader>
            <CardTitle>Donneur d'ordre</CardTitle>
            <CardDescription>Informations sur le donneur d'ordre</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Société
              </h3>
              <p className="mt-1">{profile.company_name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                SIRET
              </h3>
              <p className="mt-1">{profile.siret}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Adresse
              </h3>
              <p className="mt-1">{profile.company_address}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Représentant légal
              </h3>
              <p className="mt-1">
                {profile.legal_representative_first_name}{" "}
                {profile.legal_representative_last_name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {subcontractor && (
        <Card>
          <CardHeader>
            <CardTitle>Sous-traitant</CardTitle>
            <CardDescription>Informations sur le sous-traitant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Société
              </h3>
              <p className="mt-1">{subcontractor.company_name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                SIRET
              </h3>
              <p className="mt-1">{subcontractor.siret}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Adresse
              </h3>
              <p className="mt-1">{subcontractor.company_address}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Représentant légal
              </h3>
              <p className="mt-1">
                {subcontractor.legal_representative_first_name}{" "}
                {subcontractor.legal_representative_last_name}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {project && (
        <Card>
          <CardHeader>
            <CardTitle>Chantier</CardTitle>
            <CardDescription>Détails du chantier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Nom</h3>
              <p className="mt-1">{project.name}</p>
            </div>
            {project.description && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Description
                </h3>
                <p className="mt-1">{project.description}</p>
              </div>
            )}
            {project.work_location && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Localisation
                </h3>
                <p className="mt-1">{project.work_location}</p>
              </div>
            )}
            {project.work_titles && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  Travaux
                </h3>
                <div className="space-y-4">
                  {project.work_titles.map((title) => (
                    <div key={title.id}>
                      <h4 className="font-medium">{title.title}</h4>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {title.work_descriptions
                          .filter((desc) =>
                            contract.is_full_project
                              ? true
                              : contract.selected_work_descriptions?.includes(
                                  desc.id
                                )
                          )
                          .map((desc) => (
                            <li key={desc.id} className="text-sm">
                              {desc.description}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

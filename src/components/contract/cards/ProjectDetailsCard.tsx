
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/pages/project-form/types";
import { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"contracts">;

interface ProjectDetailsCardProps {
  project: Project;
  contract: Contract;
}

export const ProjectDetailsCard = ({ project, contract }: ProjectDetailsCardProps) => {
  return (
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
  );
};

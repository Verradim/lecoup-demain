import { Project } from "@/pages/project-form/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ProjectPreviewProps {
  project: Project;
  isFullProject: boolean;
  onFullProjectChange: (checked: boolean) => void;
}

export const ProjectPreview = ({ 
  project, 
  isFullProject,
  onFullProjectChange 
}: ProjectPreviewProps) => {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Informations du chantier</CardTitle>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="full-project"
            checked={isFullProject}
            onCheckedChange={onFullProjectChange}
          />
          <Label htmlFor="full-project" className="font-medium">
            Sous-traiter tout le projet
          </Label>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Nom du chantier</h3>
          <p className="mt-1">{project.name}</p>
        </div>
        {project.description && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
            <p className="mt-1">{project.description}</p>
          </div>
        )}
        {project.work_location && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Lieu d'exécution</h3>
            <p className="mt-1">{project.work_location}</p>
          </div>
        )}
        {project.work_titles && project.work_titles.length > 0 && (
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Intitulés de travaux</h3>
            <div className="mt-2 space-y-3">
              {project.work_titles.map((workTitle, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <p className="font-medium">{workTitle.title}</p>
                  <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                    {workTitle.descriptions.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
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
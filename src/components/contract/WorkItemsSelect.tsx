
import { Checkbox } from "@/components/ui/checkbox";
import { WorkTitle } from "@/pages/project-form/types";
import { Label } from "@/components/ui/label";

interface WorkItemsSelectProps {
  workTitles?: WorkTitle[];
  selectedDescriptions: string[];
  isFullProject: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectDescription: (descriptionId: string, checked: boolean) => void;
}

export const WorkItemsSelect = ({
  workTitles,
  selectedDescriptions,
  isFullProject,
  onSelectAll,
  onSelectDescription,
}: WorkItemsSelectProps) => {
  if (!workTitles?.length) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="selectAll"
          checked={isFullProject}
          onCheckedChange={onSelectAll}
        />
        <Label htmlFor="selectAll">Tout sélectionner</Label>
      </div>

      <div className="space-y-4 pl-2">
        {workTitles.map((title) => {
          const titleHasSelectedDesc = title.descriptions.some(
            (desc) => selectedDescriptions.includes(desc.id || '')
          );

          return (
            <div key={title.id} className="space-y-2">
              <div className="font-medium">{title.title}</div>
              <div className="pl-4 space-y-2">
                {title.descriptions.map((desc) => (
                  <div key={desc.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={desc.id}
                      checked={selectedDescriptions.includes(desc.id || '') || isFullProject}
                      onCheckedChange={(checked) => {
                        onSelectDescription(desc.id || '', checked as boolean);
                      }}
                      disabled={isFullProject}
                    />
                    <Label htmlFor={desc.id}>{desc.description}</Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

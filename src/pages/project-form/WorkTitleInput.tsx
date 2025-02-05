
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { WorkTitle } from "./types";

interface WorkTitleInputProps {
  workTitle: WorkTitle;
  titleIndex: number;
  onUpdateTitle: (titleIndex: number, value: string) => void;
  onRemoveTitle: (titleIndex: number) => void;
  onUpdateDescription: (titleIndex: number, descIndex: number, value: string) => void;
  onAddDescription: (titleIndex: number) => void;
  onRemoveDescription: (titleIndex: number, descIndex: number) => void;
}

export const WorkTitleInput = ({
  workTitle,
  titleIndex,
  onUpdateTitle,
  onRemoveTitle,
  onUpdateDescription,
  onAddDescription,
  onRemoveDescription,
}: WorkTitleInputProps) => {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="flex gap-2">
        <Input
          value={workTitle.title}
          onChange={(e) => onUpdateTitle(titleIndex, e.target.value)}
          placeholder="Ex: Plomberie"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onRemoveTitle(titleIndex)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 pl-4 border-l-2">
        {workTitle.descriptions.map((desc, descIndex) => (
          <div key={descIndex} className="flex gap-2">
            <Input
              value={desc}
              onChange={(e) => onUpdateDescription(titleIndex, descIndex, e.target.value)}
              placeholder="Ex: Alimentation en eau chaude/froide"
              className="flex-1"
            />
            {workTitle.descriptions.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onRemoveDescription(titleIndex, descIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => onAddDescription(titleIndex)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une description
        </Button>
      </div>
    </div>
  );
};

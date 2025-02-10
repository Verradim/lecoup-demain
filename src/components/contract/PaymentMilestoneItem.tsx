
import { PaymentMilestone } from "@/types/contract";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { DraggableProvided } from "@hello-pangea/dnd";

interface PaymentMilestoneItemProps {
  milestone: PaymentMilestone;
  index: number;
  totalAmount?: number;
  provided: DraggableProvided;
  onUpdate: (index: number, field: keyof PaymentMilestone, value: any) => void;
  onRemove: (index: number) => void;
}

export const PaymentMilestoneItem = ({
  milestone,
  index,
  totalAmount,
  provided,
  onUpdate,
  onRemove,
}: PaymentMilestoneItemProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="flex items-center gap-4 bg-white p-4 rounded-lg border"
    >
      <div {...provided.dragHandleProps} className="cursor-move">
        <GripVertical className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex-1 space-y-2">
        {milestone.milestone_type === "custom" ? (
          <div>
            <Label>Description</Label>
            <Input
              value={milestone.description}
              onChange={(e) => onUpdate(index, "description", e.target.value)}
              placeholder="Description de l'étape"
            />
          </div>
        ) : (
          <div className="font-medium">{milestone.description}</div>
        )}
        <div className="flex items-center gap-4">
          <div className="w-32">
            <Label>Pourcentage</Label>
            <div className="flex items-center">
              <Input
                type="number"
                value={milestone.percentage}
                onChange={(e) =>
                  onUpdate(index, "percentage", parseFloat(e.target.value) || 0)
                }
                className="w-20"
              />
              <span className="ml-1">%</span>
            </div>
          </div>
          {totalAmount && (
            <div className="text-sm text-gray-500">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format((totalAmount * milestone.percentage) / 100)}{" "}
              HT
            </div>
          )}
          {(milestone.milestone_type === "custom" ||
            milestone.milestone_type === "start" ||
            milestone.milestone_type === "end") && (
            <DatePicker
              date={milestone.milestone_date}
              onSelect={(date) => onUpdate(index, "milestone_date", date)}
              label="Date"
            />
          )}
        </div>
      </div>
      {milestone.milestone_type === "custom" && (
        <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
          Supprimer
        </Button>
      )}
    </div>
  );
};

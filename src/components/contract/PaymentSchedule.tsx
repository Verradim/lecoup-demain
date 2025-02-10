
import { useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ContractFormValues, PaymentMilestone } from "@/types/contract";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface PaymentScheduleProps {
  form: UseFormReturn<ContractFormValues>;
  projectStartDate?: Date;
  projectEndDate?: Date;
  totalAmount?: number;
}

export const PaymentSchedule = ({
  form,
  projectStartDate,
  projectEndDate,
  totalAmount,
}: PaymentScheduleProps) => {
  const [totalPercentage, setTotalPercentage] = useState(0);

  const milestones = form.watch("payment_milestones") || [];

  useEffect(() => {
    const total = milestones.reduce((sum, milestone) => sum + milestone.percentage, 0);
    setTotalPercentage(total);
  }, [milestones]);

  useEffect(() => {
    // Initialize default milestones if none exist
    if (milestones.length === 0) {
      const defaultMilestones: PaymentMilestone[] = [
        {
          description: "Signature du contrat",
          percentage: 30,
          milestone_type: "signature",
          order_index: 0,
        },
        {
          description: "Date de début des travaux",
          percentage: 40,
          milestone_date: projectStartDate,
          milestone_type: "start",
          order_index: 1,
        },
        {
          description: "Date de fin du chantier",
          percentage: 30,
          milestone_date: projectEndDate,
          milestone_type: "end",
          order_index: 2,
        },
      ];
      form.setValue("payment_milestones", defaultMilestones);
    }
  }, [form, projectStartDate, projectEndDate]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(milestones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order_index values
    const updatedItems = items.map((item, index) => ({
      ...item,
      order_index: index,
    }));

    form.setValue("payment_milestones", updatedItems);
  };

  const addCustomMilestone = () => {
    const newMilestone: PaymentMilestone = {
      description: "",
      percentage: 0,
      milestone_type: "custom",
      order_index: milestones.length,
    };

    const updatedMilestones = [...milestones, newMilestone];
    form.setValue("payment_milestones", updatedMilestones);
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    form.setValue(
      "payment_milestones",
      updatedMilestones.map((m, i) => ({ ...m, order_index: i }))
    );
  };

  const updateMilestone = (index: number, field: keyof PaymentMilestone, value: any) => {
    const updatedMilestones = milestones.map((milestone, i) => {
      if (i === index) {
        const updatedMilestone = { ...milestone, [field]: value };
        return updatedMilestone;
      }
      return milestone;
    });

    // Si une date a été mise à jour, on réordonne les étapes
    if (field === 'milestone_date') {
      const sortedMilestones = [...updatedMilestones].sort((a, b) => {
        if (!a.milestone_date) return -1;
        if (!b.milestone_date) return 1;
        return new Date(a.milestone_date).getTime() - new Date(b.milestone_date).getTime();
      });

      // Mise à jour des order_index
      const reorderedMilestones = sortedMilestones.map((m, idx) => ({
        ...m,
        order_index: idx
      }));

      form.setValue("payment_milestones", reorderedMilestones);
    } else {
      form.setValue("payment_milestones", updatedMilestones);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier de paiement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="payment-milestones">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {milestones.map((milestone, index) => (
                    <Draggable
                      key={index}
                      draggableId={`milestone-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-4 bg-white p-4 rounded-lg border"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-move"
                          >
                            <GripVertical className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="flex-1 space-y-2">
                            {milestone.milestone_type === "custom" ? (
                              <div>
                                <Label>Description</Label>
                                <Input
                                  value={milestone.description}
                                  onChange={(e) =>
                                    updateMilestone(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Description de l'étape"
                                />
                              </div>
                            ) : (
                              <div className="font-medium">
                                {milestone.description}
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <div className="w-32">
                                <Label>Pourcentage</Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={milestone.percentage}
                                    onChange={(e) =>
                                      updateMilestone(
                                        index,
                                        "percentage",
                                        parseFloat(e.target.value) || 0
                                      )
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
                                  }).format(
                                    (totalAmount * milestone.percentage) / 100
                                  )}{" "}
                                  HT
                                </div>
                              )}
                              {(milestone.milestone_type === "custom" || milestone.milestone_type === "start" || milestone.milestone_type === "end") && (
                                <div>
                                  <Label>Date</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-[200px] justify-start text-left font-normal",
                                          !milestone.milestone_date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {milestone.milestone_date ? (
                                          format(milestone.milestone_date, "PPP", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={milestone.milestone_date}
                                        onSelect={(date) =>
                                          updateMilestone(index, "milestone_date", date)
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              )}
                            </div>
                          </div>
                          {milestone.milestone_type === "custom" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMilestone(index)}
                            >
                              Supprimer
                            </Button>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex justify-between items-center mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={addCustomMilestone}
            >
              Ajouter une étape
            </Button>
            <div
              className={cn("font-medium", {
                "text-red-500": totalPercentage !== 100,
                "text-green-500": totalPercentage === 100,
              })}
            >
              Total: {totalPercentage}%
              {totalPercentage !== 100 && (
                <span className="text-sm ml-2">
                  (Le total doit être égal à 100%)
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

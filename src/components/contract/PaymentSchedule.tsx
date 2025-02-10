
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { ContractFormValues, PaymentMilestone } from "@/types/contract";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { PaymentMilestoneItem } from "./PaymentMilestoneItem";

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

    const updatedItems = items.map((item, index) => ({
      ...item,
      order_index: index,
    })) as PaymentMilestone[];

    form.setValue("payment_milestones", updatedItems);
  };

  const addCustomMilestone = () => {
    const newMilestone: PaymentMilestone = {
      description: "Nouvelle étape",
      percentage: 0,
      milestone_type: "custom",
      order_index: milestones.length,
    };

    const updatedMilestones = [...milestones, newMilestone];
    form.setValue("payment_milestones", updatedMilestones);
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index).map((m, i) => ({
      ...m,
      order_index: i,
    })) as PaymentMilestone[];

    form.setValue("payment_milestones", updatedMilestones);
  };

  const updateMilestone = (index: number, field: keyof PaymentMilestone, value: any) => {
    const updatedMilestones = milestones.map((milestone, i) => {
      if (i === index) {
        return {
          ...milestone,
          [field]: value,
        } as PaymentMilestone;
      }
      return milestone;
    });

    if (field === 'milestone_date') {
      const sortedMilestones = [...updatedMilestones].sort((a, b) => {
        if (!a.milestone_date) return -1;
        if (!b.milestone_date) return 1;
        return new Date(a.milestone_date).getTime() - new Date(b.milestone_date).getTime();
      });

      const reorderedMilestones = sortedMilestones.map((m, idx) => ({
        ...m,
        order_index: idx
      })) as PaymentMilestone[];

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
                        <PaymentMilestoneItem
                          milestone={milestone}
                          index={index}
                          totalAmount={totalAmount}
                          provided={provided}
                          onUpdate={updateMilestone}
                          onRemove={removeMilestone}
                        />
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

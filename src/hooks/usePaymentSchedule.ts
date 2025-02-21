
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues, PaymentMilestone } from "@/types/contract";
import { useEffect, useState } from "react";

export const usePaymentSchedule = (
  form: UseFormReturn<ContractFormValues>,
  projectStartDate?: Date,
  projectEndDate?: Date
) => {
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
          milestone_date: projectStartDate?.toISOString(),
          milestone_type: "start",
          order_index: 1,
        },
        {
          description: "Date de fin du chantier",
          percentage: 30,
          milestone_date: projectEndDate?.toISOString(),
          milestone_type: "end",
          order_index: 2,
        },
      ];
      form.setValue("payment_milestones", defaultMilestones);
    }
  }, [form, projectStartDate, projectEndDate]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(milestones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order_index: index,
    }));

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
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    form.setValue("payment_milestones", updatedMilestones);
  };

  const updateMilestone = (index: number, field: keyof PaymentMilestone, value: any) => {
    const updatedMilestones = milestones.map((milestone, i) => {
      if (i === index) {
        return {
          ...milestone,
          [field]: value,
        };
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
        order_index: idx,
      }));

      form.setValue("payment_milestones", reorderedMilestones);
    } else {
      form.setValue("payment_milestones", updatedMilestones);
    }
  };

  return {
    totalPercentage,
    milestones,
    handleDragEnd,
    addCustomMilestone,
    removeMilestone,
    updateMilestone,
  };
};

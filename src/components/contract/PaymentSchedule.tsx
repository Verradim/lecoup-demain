
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContractFormValues } from "@/types/contract";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { PaymentMilestoneList } from "./PaymentMilestoneList";
import { usePaymentSchedule } from "@/hooks/usePaymentSchedule";

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
  const {
    totalPercentage,
    milestones,
    handleDragEnd,
    addCustomMilestone,
    removeMilestone,
    updateMilestone,
  } = usePaymentSchedule(form, projectStartDate, projectEndDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier de paiement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PaymentMilestoneList
            milestones={milestones}
            totalAmount={totalAmount}
            onDragEnd={handleDragEnd}
            onUpdate={updateMilestone}
            onRemove={removeMilestone}
          />

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

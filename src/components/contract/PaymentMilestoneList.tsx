
import { PaymentMilestone } from "@/types/contract";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { PaymentMilestoneItem } from "./PaymentMilestoneItem";

interface PaymentMilestoneListProps {
  milestones: PaymentMilestone[];
  totalAmount?: number;
  onDragEnd: (result: any) => void;
  onUpdate: (index: number, field: keyof PaymentMilestone, value: any) => void;
  onRemove: (index: number) => void;
}

export const PaymentMilestoneList = ({
  milestones,
  totalAmount,
  onDragEnd,
  onUpdate,
  onRemove,
}: PaymentMilestoneListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};


import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContractActionsProps {
  contractId: string;
  onDelete: () => Promise<void>;
}

export const ContractActions = ({ contractId, onDelete }: ContractActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={() => navigate("/mon-espace/contrats")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux contrats
      </Button>
      <div className="space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/mon-espace/contrats/${contractId}/modifier`)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Modifier
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash className="w-4 h-4 mr-2" />
          Supprimer
        </Button>
      </div>
    </div>
  );
};

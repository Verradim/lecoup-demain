import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuccessDialog = ({ open, onOpenChange }: SuccessDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Merci d'avoir candidaté pour rejoindre Le Coup de Main, la communauté dédiée aux artisans indépendants et aux entreprises du bâtiment. 🙌
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            Vous allez recevoir un e-mail de confirmation détaillant les prochaines étapes
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate("/");
            }}
            className="w-full sm:w-auto"
          >
            J'ai compris
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
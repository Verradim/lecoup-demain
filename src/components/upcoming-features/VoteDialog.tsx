import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Feature } from "./FeatureCard";
interface VoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFeature: Feature | null;
  onVoteSubmit: (email: string) => void;
}
export const VoteDialog = ({
  open,
  onOpenChange,
  selectedFeature,
  onVoteSubmit
}: VoteDialogProps) => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    onVoteSubmit(email);
    setEmail("");
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Laissez votre email pour être informé lorsque la fonctionnalité sera disponible.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="col-span-4">
              Email
            </Label>
            <Input id="email" placeholder="votre@email.com" className="col-span-4" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Pas maintenant
          </Button>
          <Button onClick={handleSubmit}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
};
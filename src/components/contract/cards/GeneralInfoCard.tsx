
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"contracts">;

interface GeneralInfoCardProps {
  contract: Contract;
}

export const GeneralInfoCard = ({ contract }: GeneralInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations générales</CardTitle>
        <CardDescription>Détails du contrat</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Nom</h3>
          <p className="mt-1">{contract.name}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Statut</h3>
          <p className="mt-1">{contract.status}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">
            Date de création
          </h3>
          <p className="mt-1">
            {new Date(contract.created_at).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">
            Dernière modification
          </h3>
          <p className="mt-1">
            {new Date(contract.updated_at).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Subcontractor = Tables<"subcontractors">;

interface SubcontractorPreviewProps {
  subcontractor: Subcontractor;
}

export const SubcontractorPreview = ({ subcontractor }: SubcontractorPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du sous-traitant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Société</h3>
          <p className="mt-1">{subcontractor.company_name}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">SIRET</h3>
          <p className="mt-1">{subcontractor.siret}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Adresse</h3>
          <p className="mt-1">{subcontractor.company_address}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Représentant légal</h3>
          <p className="mt-1">
            {subcontractor.legal_representative_first_name} {subcontractor.legal_representative_last_name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
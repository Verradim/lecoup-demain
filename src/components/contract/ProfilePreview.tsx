import { Profile } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfilePreviewProps {
  profile: Profile;
}

export const ProfilePreview = ({ profile }: ProfilePreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du donneur d'ordre</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Société</h3>
          <p className="mt-1">{profile.company_name}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">SIRET</h3>
          <p className="mt-1">{profile.siret}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Adresse</h3>
          <p className="mt-1">{profile.company_address}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Représentant légal</h3>
          <p className="mt-1">
            {profile.legal_representative_first_name} {profile.legal_representative_last_name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
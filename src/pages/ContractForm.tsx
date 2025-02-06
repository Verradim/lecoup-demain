
import { ContractForm } from "@/components/contract/ContractForm";

const ContractFormPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Créer un nouveau contrat</h1>
        <p className="text-muted-foreground mt-1">
          Remplissez les informations ci-dessous pour créer un nouveau contrat
        </p>
      </div>

      <ContractForm mode="create" />
    </div>
  );
};

export default ContractFormPage;

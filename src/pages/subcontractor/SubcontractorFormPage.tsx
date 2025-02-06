import { SubcontractorForm } from "@/components/subcontractor/SubcontractorForm";

const SubcontractorFormPage = () => {
  return (
      <div className="container max-w-2xl py-8">
        <h1 className="text-3xl font-bold mb-8">Ajouter un sous-traitant</h1>
        <SubcontractorForm />
      </div>
  );
};

export default SubcontractorFormPage;
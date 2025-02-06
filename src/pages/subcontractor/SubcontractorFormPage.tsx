import { Layout } from "@/components/Layout";
import { SubcontractorForm } from "@/components/subcontractor/SubcontractorForm";

const SubcontractorFormPage = () => {
  return (
    <Layout
      title="Ajouter un sous-traitant - Le Coup de Main"
      description="Ajoutez un nouveau sous-traitant à votre espace"
      canonicalUrl="https://lecoup-demain.com/mon-espace/sous-traitants/nouveau"
    >
      <div className="container max-w-2xl py-8">
        <h1 className="text-3xl font-bold mb-8">Ajouter un sous-traitant</h1>
        <SubcontractorForm />
      </div>
    </Layout>
  );
};

export default SubcontractorFormPage;
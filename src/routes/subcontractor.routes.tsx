import { Route } from "react-router-dom";
import SubcontractorForm from "@/pages/subcontractor/SubcontractorFormPage";

export const SubcontractorRoutes = () => {
  return (
    <>
      <Route path="sous-traitants/nouveau" element={<SubcontractorForm />} />
    </>
  );
};
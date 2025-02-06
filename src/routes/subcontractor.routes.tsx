import { Route } from "react-router-dom";
import SubcontractorFormPage from "@/pages/subcontractor/SubcontractorFormPage";
import { SubcontractorList } from "@/components/subcontractor/SubcontractorList";

export const SubcontractorRoutes = () => {
  return (
    <>
      <Route path="sous-traitants" element={<SubcontractorList />} />
      <Route path="sous-traitants/nouveau" element={<SubcontractorFormPage />} />
    </>
  );
};
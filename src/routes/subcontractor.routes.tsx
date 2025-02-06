import { Route } from "react-router-dom";
import { SubcontractorList } from "@/components/subcontractor/SubcontractorList";
import { SubcontractorFormPage } from "@/pages/subcontractor/SubcontractorFormPage";

export const SubcontractorRoutes = () => (
  <>
    <Route path="sous-traitants" element={<SubcontractorList />} />
    <Route path="sous-traitants/nouveau" element={<SubcontractorFormPage />} />
  </>
);
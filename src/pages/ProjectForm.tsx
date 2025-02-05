
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Project } from "./project-form/types";
import { FormContent } from "./project-form/FormContent";
import { useProjectForm } from "./project-form/useProjectForm";

interface ProjectFormProps {
  project?: Project;
  mode?: "create" | "edit";
}

const ProjectForm = ({ project, mode = "create" }: ProjectFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const { formState, actions } = useProjectForm({
    project,
    mode,
    userId: user.id,
  });

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            {mode === "edit" ? "Modifier le chantier" : "Créer un nouveau chantier"}
          </h1>
          <p className="mt-2 text-gray-600">
            {mode === "edit" 
              ? "Modifiez les informations de votre chantier ci-dessous."
              : "Remplissez les informations ci-dessous pour créer votre nouveau chantier."}
          </p>
        </div>
        
        <FormContent
          formState={formState}
          actions={actions}
          mode={mode}
          project={project}
        />
      </div>
    </div>
  );
};

export default ProjectForm;

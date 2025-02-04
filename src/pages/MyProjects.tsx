import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Project {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  user_id: string;
}

const MyProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error: any) {
        toast.error("Error loading projects: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  const handleCreateProject = () => {
    toast.info("Create project functionality coming soon!");
  };

  if (!user) return null;

  return (
    <Layout
      title="My Projects - Le Coup de Main"
      description="Manage your projects on Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/my-projects"
    >
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <Button onClick={handleCreateProject} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't created any projects yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-600 mb-4">{project.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  Created on {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyProjects;
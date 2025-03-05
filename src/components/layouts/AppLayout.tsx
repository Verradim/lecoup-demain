
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export function AppLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Use the scroll restoration hook
  useScrollToTop();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, navigate, loading]);

  // Show nothing while checking authentication
  if (loading) return null;
  
  // Redirect if not authenticated
  if (!user) return null;

  return (
    <Layout
      title="Mon espace - Le Coup de Main"
      description="Gérez vos chantiers et votre profil sur Le Coup de Main"
      canonicalUrl={`https://lecoup-demain.com${location.pathname}`}
    >
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
}

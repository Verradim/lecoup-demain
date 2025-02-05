
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { AppSidebar } from "./AppSidebar";

export function AppLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout
      title="Mon espace - Le Coup de Main"
      description="Gérez vos chantiers et votre profil sur Le Coup de Main"
      canonicalUrl={`https://lecoup-demain.com${location.pathname}`}
    >
      <div className="flex w-full">
        {/* Main content area that starts below header */}
        <div className="pt-16 flex w-full min-h-[calc(100vh-4rem)]"> {/* 4rem = header height (64px) */}
          <AppSidebar />
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
}

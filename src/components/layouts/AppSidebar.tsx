
import { useLocation, Link } from "react-router-dom";
import { Building2, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      toast.success("Déconnexion réussie");
      window.location.href = "/";
    }
  };

  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)]"> {/* 4rem = header height (64px) */}
      <Sidebar className="h-full border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={isActive("/mon-espace/projets") || (isActive("/mon-espace") && !isActive("/mon-espace/profil")) ? "bg-accent" : ""}
                  >
                    <Link to="/mon-espace/projets">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>Mes Chantiers</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={isActive("/mon-espace/profil") ? "bg-accent" : ""}
                  >
                    <Link to="/mon-espace/profil">
                      <User className="w-4 h-4 mr-2" />
                      <span>Mon Profil</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Déconnexion</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

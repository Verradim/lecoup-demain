import { useLocation, Link } from "react-router-dom";
import { Building2, User, LogOut, Home, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
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
    <Sidebar className="border-r pt-16 w-auto">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isActive("/mon-espace") ? "bg-accent" : ""}
                >
                  <Link to="/mon-espace">
                    <Home className="w-4 h-4 mr-2" />
                    <span>Mon espace</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isActive("/mon-espace/projets") ? "bg-accent" : ""}
                >
                  <Link to="/mon-espace/projets">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>Mes chantiers</span>
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
                    <span>Mon profil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={isActive("/mon-espace/sous-traitants") ? "bg-accent" : ""}
                >
                  <Link to="/mon-espace/sous-traitants">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Mes sous-traitants</span>
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
  );
}

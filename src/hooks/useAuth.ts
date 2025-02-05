
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseAuthProps {
  onSuccess?: () => void;
}

export const useAuth = ({ onSuccess }: UseAuthProps = {}) => {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Connexion réussie!");
      onSuccess?.();
    } catch (error: any) {
      let errorMessage = "Une erreur est survenue lors de la connexion";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter";
      }
      
      toast.error(errorMessage);
      console.error("Login error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });

      if (signUpError) {
        if (signUpError.message.includes("Signups not allowed")) {
          throw new Error("Les inscriptions sont actuellement désactivées. Veuillez contacter l'administrateur.");
        }
        throw signUpError;
      }

      if (data?.user) {
        toast.success("Inscription réussie! Vérifiez votre email pour confirmer votre compte.");
      }

    } catch (error: any) {
      let errorMessage = error.message || "Une erreur est survenue lors de l'inscription";
      
      if (error.message.includes("User already registered")) {
        errorMessage = "Un compte existe déjà avec cet email";
      }
      
      toast.error(errorMessage);
      console.error("Signup error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signIn,
    signUp
  };
};

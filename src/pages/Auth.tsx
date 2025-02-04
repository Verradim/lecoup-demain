import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      navigate("/");
    } catch (error: any) {
      let errorMessage = "Une erreur est survenue lors de la connexion";
      
      // Handle specific error cases
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Veuillez confirmer votre email avant de vous connecter";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // First attempt to sign up the user
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // Check for specific signup disabled error
        if (signUpError.message.includes("Signups not allowed")) {
          throw new Error("Les inscriptions sont actuellement désactivées. Veuillez contacter l'administrateur.");
        }
        throw signUpError;
      }

      // If signup was successful
      if (data?.user) {
        toast.success("Inscription réussie! Vérifiez votre email pour confirmer votre compte.");
      }

    } catch (error: any) {
      let errorMessage = error.message || "Une erreur est survenue lors de l'inscription";
      
      // Handle specific error cases
      if (error.message.includes("User already registered")) {
        errorMessage = "Un compte existe déjà avec cet email";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Authentification - Le Coup de Main"
      description="Connectez-vous ou inscrivez-vous à Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/auth"
    >
      <div className="min-h-screen bg-background py-20">
        <div className="container max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-8">Connexion / Inscription</h1>
            
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  Se connecter
                </Button>
                <Button
                  type="button"
                  onClick={handleEmailSignUp}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  S'inscrire
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/mon-espace");
    }
  }, [user, navigate]);

  const handleAuthSuccess = () => {
    navigate("/mon-espace");
  };

  // If user is already logged in, don't render the auth form
  if (user) {
    return null;
  }

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
            <AuthForm onSuccess={handleAuthSuccess} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;


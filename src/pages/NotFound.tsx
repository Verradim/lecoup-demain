import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout
      title="Page non trouvée - Le Coup de Main"
      description="La page que vous recherchez n'existe pas."
      canonicalUrl="https://lecoup-demain.com/404"
    >
      <div className="container flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button>Retourner à l'accueil</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
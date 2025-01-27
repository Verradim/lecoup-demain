import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { articles } from "@/data/articles";

const Resources = () => {
  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>Ressources | Le Coup de Main - Guides et conseils pour artisans du bâtiment</title>
        <meta name="description" content="Accédez à nos ressources exclusives pour les artisans du bâtiment : guides pratiques, conseils d'experts et stratégies pour développer votre activité." />
        <link rel="canonical" href="https://lecoup-demain.com/ressources" />
        <meta property="og:title" content="Ressources | Le Coup de Main - Guides et conseils pour artisans du bâtiment" />
        <meta property="og:description" content="Accédez à nos ressources exclusives pour les artisans du bâtiment : guides pratiques, conseils d'experts et stratégies pour développer votre activité." />
        <meta property="og:url" content="https://lecoup-demain.com/ressources" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://lecoup-demain.com/lovable-uploads/logo-white1.png" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav />
        
        <h1 className="text-4xl font-bold mb-8">Ressources</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {format(new Date(article.published_at), 'dd MMMM yyyy', { locale: fr })}
                </p>
                <h2 className="text-xl font-semibold mb-3">
                  <Link 
                    to={`/ressources/${article.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{article.meta_description}</p>
                <Link
                  to={`/ressources/${article.slug}`}
                  className="text-primary hover:underline font-medium"
                >
                  Lire la suite →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default Resources;
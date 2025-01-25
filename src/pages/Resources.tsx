import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BreadcrumbNav } from "@/components/Breadcrumb";

const articles = [
  {
    id: "comment-augmenter-sa-visibilite",
    title: "Comment augmenter sa visibilité en tant qu'artisan indépendant dans le bâtiment",
    excerpt: "Découvrez les meilleures pratiques pour améliorer votre visibilité et attirer de nouveaux clients dans le secteur du bâtiment.",
    publishedAt: "2024-03-20",
  },
  // Add more static articles here as needed
];

const Resources = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav />
      
      <h1 className="text-4xl font-bold mb-8">Ressources</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">
                {format(new Date(article.publishedAt), 'dd MMMM yyyy', { locale: fr })}
              </p>
              <h2 className="text-xl font-semibold mb-3">
                <Link 
                  to={`/ressources/${article.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <Link
                to={`/ressources/${article.id}`}
                className="text-primary hover:underline font-medium"
              >
                Lire la suite →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Resources;

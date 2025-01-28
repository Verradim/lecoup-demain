import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const News = () => {
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);

  const { data: articles, isLoading } = useQuery({
    queryKey: ["news-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("publication_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const toggleArticle = (id: string) => {
    setExpandedArticles(prev =>
      prev.includes(id)
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  return (
    <Layout
      title="Actualités du bâtiment | Le Coup de Main - Informations secteur construction et rénovation"
      description="Retrouvez les dernières actualités du secteur de la construction et de la rénovation, sélectionnées pour les artisans indépendants et chefs d'entreprise du bâtiment."
      canonicalUrl="https://lecoup-demain.com/news"
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">
          Retrouvez toutes les actualités du secteur de la construction, de la rénovation pour les artisans indépendants et chefs d'entreprise du bâtiment
        </h1>

        <div 
          className="prose prose-lg max-w-none mb-12"
          itemScope 
          itemType="https://schema.org/Article"
        >
          <div 
            className={`relative overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <p className="text-gray-700">
              Bienvenue sur votre espace dédié aux actualités du bâtiment, conçu spécialement pour les chefs d'entreprise de moins de 10 salariés et les artisans indépendants. Chaque semaine, nous sélectionnons pour vous les informations les plus pertinentes pour vous accompagner dans la gestion et le développement de votre activité : tendances du secteur, stratégies pour améliorer votre visibilité, conseils en recrutement, innovations technologiques ou pratiques, et opportunités à saisir. Simplifiez vos démarches et boostez votre entreprise avec nos ressources ciblées et concrètes !
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-8">
            {articles?.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-lg shadow-sm p-6"
                itemScope 
                itemType="https://schema.org/NewsArticle"
              >
                <meta itemProp="datePublished" content={article.publication_date} />
                <meta itemProp="publisher" content="Le Coup de Main" />
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <time dateTime={article.publication_date}>
                    {format(new Date(article.publication_date), 'dd MMMM yyyy', { locale: fr })}
                  </time>
                  <div className="flex gap-2">
                    {article.categories.map((category) => (
                      <span 
                        key={category}
                        className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 
                  className="text-2xl font-semibold mb-3"
                  itemProp="headline"
                >
                  {article.title}
                </h2>
                
                <p 
                  className="text-gray-600 mb-4"
                  itemProp="description"
                >
                  {article.hook}
                </p>

                <div 
                  className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedArticles.includes(article.id) ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <p 
                    className="text-gray-700 mb-4"
                    itemProp="articleBody"
                  >
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="link"
                    onClick={() => toggleArticle(article.id)}
                    className="font-medium hover:no-underline"
                  >
                    {expandedArticles.includes(article.id) ? 'Voir moins' : 'Voir plus'}
                  </Button>

                  <a
                    href={article.article_url}
                    target="_blank"
                    rel="noopener noreferrer follow"
                    className="text-primary hover:underline font-medium"
                  >
                    Lire l'article complet →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default News;
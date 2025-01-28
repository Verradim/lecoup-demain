import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const News = () => {
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

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

  // Get unique months from articles
  const uniqueMonths = articles
    ? [...new Set(articles.map(article => article.publication_month))]
    : [];

  // Filter articles by selected month
  const filteredArticles = selectedMonth
    ? articles?.filter(article => article.publication_month === selectedMonth)
    : articles;

  return (
    <Layout
      title="Actualités du bâtiment | Le Coup de Main - Informations secteur construction et rénovation"
      description="Retrouvez les dernières actualités du secteur de la construction et de la rénovation, sélectionnées pour les artisans indépendants et chefs d'entreprise du bâtiment."
      canonicalUrl="https://lecoup-demain.com/news"
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">
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
              Bienvenue sur votre espace dédié aux actualités du bâtiment, conçu spécialement pour les chefs d'entreprise du bâtiment et les artisans indépendants. Chaque semaine, nous sélectionnons pour vous les informations les plus pertinentes pour vous accompagner dans la gestion et le développement de votre activité : tendances du secteur, stratégies pour améliorer votre visibilité, conseils en recrutement, innovations technologiques ou pratiques, et opportunités à saisir. Simplifiez vos démarches et boostez votre entreprise avec nos ressources ciblées et concrètes !
            </p>
            <button
              onClick={() => setIsIntroExpanded(!isIntroExpanded)}
              className="text-primary hover:text-primary/80 text-sm mt-2 underline"
            >
              {isIntroExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
          </div>
        </div>

        {/* Month Filter Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {uniqueMonths.map((month) => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? "default" : "outline"}
                  onClick={() => setSelectedMonth(selectedMonth === month ? null : month)}
                  className="text-sm"
                >
                  {month}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles?.map((article) => (
                  <article 
                    key={article.id}
                    className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full"
                    itemScope 
                    itemType="https://schema.org/NewsArticle"
                  >
                    <meta itemProp="datePublished" content={article.publication_date} />
                    <meta itemProp="publisher" content="Le Coup de Main" />
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <time dateTime={article.publication_date}>
                        {format(new Date(article.publication_date), 'dd MMMM yyyy', { locale: fr })}
                      </time>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.categories.map((category) => (
                        <span 
                          key={category}
                          className="bg-primary/5 px-3 py-1 rounded-full text-xs text-primary"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <h2 
                      className="text-2xl font-semibold mb-3"
                      itemProp="headline"
                    >
                      {article.title}
                    </h2>
                    
                    <p 
                      className="text-lg font-medium text-gray-700 mb-4"
                      itemProp="description"
                    >
                      {article.hook}
                    </p>

                    <div className="text-gray-700 mb-4 flex-grow">
                      <p className="text-sm" itemProp="articleBody">
                        {article.summary}
                      </p>
                    </div>

                    <a
                      href={article.article_url}
                      target="_blank"
                      rel="noopener follow"
                      className="text-primary hover:underline font-medium mt-auto inline-block"
                    >
                      Lire l'article complet →
                    </a>

                    <a
                      href={article.source_website}
                      target="_blank"
                      rel="noopener follow"
                      className="text-sm text-blue-500 hover:underline mt-4"
                    >
                      Source: {article.source_website}
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default News;
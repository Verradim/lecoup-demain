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
      {/* Hero Section with gradient background */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Actualités du bâtiment
          </h1>
          <div 
            className="prose prose-lg max-w-none mb-12"
            itemScope 
            itemType="https://schema.org/Article"
          >
            <div className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
              !isIntroExpanded ? 'max-h-32' : 'max-h-[1000px]'
            }`}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bienvenue sur votre espace dédié aux actualités du bâtiment, conçu spécialement pour les chefs d'entreprise du bâtiment et les artisans indépendants. Chaque semaine, nous sélectionnons pour vous les informations les plus pertinentes pour vous accompagner dans la gestion et le développement de votre activité : tendances du secteur, stratégies pour améliorer votre visibilité, conseils en recrutement, innovations technologiques ou pratiques, et opportunités à saisir. Simplifiez vos démarches et boostez votre entreprise avec nos ressources ciblées et concrètes !
              </p>
              <div 
                className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent ${
                  isIntroExpanded ? 'hidden' : 'block'
                }`}
              />
            </div>
            <button
              onClick={() => setIsIntroExpanded(!isIntroExpanded)}
              className="text-primary hover:text-primary/80 text-sm mt-2 underline mx-auto block"
            >
              {isIntroExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
          </div>
        </div>
      </section>

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

                  <p className="text-sm text-gray-700 mb-4 flex-grow">
                    {article.summary}
                  </p>

                  <div className="mt-auto">
                    <a
                      href={article.article_url}
                      target="_blank"
                      rel="noopener follow"
                      className="text-primary hover:underline font-medium inline-block mb-2"
                    >
                      Lire l'article complet →
                    </a>

                    <a
                      href={article.source_website}
                      target="_blank"
                      rel="noopener follow"
                      className="text-sm text-blue-500 hover:underline block"
                      itemProp="publisher"
                    >
                      Source: {article.source_website}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
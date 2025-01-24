import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { ArticleContent } from "@/components/ArticleContent";
import { Comments } from "@/components/Comments";

interface Article {
  id: string;
  title: string;
  content: string;
  published_at: string;
  meta_title: string;
  meta_description: string;
}

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setArticle(data);

        // Update meta tags
        document.title = data.meta_title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', data.meta_description);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (isLoading) {
    return <div>Chargement de l'article...</div>;
  }

  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav />
      <ArticleContent
        title={article.title}
        content={article.content}
        publishedAt={article.published_at}
      />
      <Comments articleId={article.id} />
    </div>
  );
};

export default Article;
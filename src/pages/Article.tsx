import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { ArticleContent } from "@/components/ArticleContent";
import { Comments } from "@/components/Comments";
import { Article, articles } from "@/data/articles";
import { Layout } from "@/components/Layout";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, [slug]);

  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <Layout
      title={article.meta_title}
      description={article.meta_description}
      canonicalUrl={`https://lecoup-demain.com/ressources/${article.slug}`}
    >
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav />
        <ArticleContent
          title={article.title}
          content={article.content}
          publishedAt={article.published_at}
        />
        <Comments articleId={article.id} />
      </div>
    </Layout>
  );
};

export default ArticlePage;
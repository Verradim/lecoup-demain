import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { ArticleContent } from "@/components/ArticleContent";
import { Comments } from "@/components/Comments";
import { Article, articles } from "@/data/articles";

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
    <>
      <Helmet>
        <title>{article.meta_title}</title>
        <meta name="description" content={article.meta_description} />
        <link rel="canonical" href={`https://lecoupdemain.fr/ressources/${article.slug}`} />
        <meta property="og:title" content={article.meta_title} />
        <meta property="og:description" content={article.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://lecoupdemain.fr/ressources/${article.slug}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav />
        <ArticleContent
          title={article.title}
          content={article.content}
          publishedAt={article.published_at}
        />
        <Comments articleId={article.id} />
      </div>
    </>
  );
};

export default ArticlePage;
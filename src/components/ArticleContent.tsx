import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface ArticleContentProps {
  title: string;
  content: string;
  publishedAt: string;
}

export const ArticleContent = ({ title, content, publishedAt }: ArticleContentProps) => {
  return (
    <article className="max-w-4xl mx-auto px-4">
      <div className="text-sm text-gray-500 mb-4">
        Publié le {format(new Date(publishedAt), 'dd MMMM yyyy', { locale: fr })}
      </div>
      
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      
      <div 
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="mt-12 p-6 bg-primary/5 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-4">Rejoignez notre communauté d'artisans passionnés</h3>
        <p className="mb-6">Accédez à des conseils exclusifs et un réseau de professionnels.</p>
        <Button asChild>
          <Link to="/#join-form">Rejoindre la communauté</Link>
        </Button>
      </div>
    </article>
  );
};
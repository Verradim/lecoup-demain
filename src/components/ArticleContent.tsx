import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Block {
  type: string;
  content: string;
  items?: string[];
}

interface ArticleContentProps {
  title: string;
  content: string;
  publishedAt: string;
}

export const ArticleContent = ({ title, content, publishedAt }: ArticleContentProps) => {
  const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string; level: number }[]>([]);
  const [parsedContent, setParsedContent] = useState<Block[]>([]);

  useEffect(() => {
    try {
      const contentObj = JSON.parse(content);
      setParsedContent(contentObj.blocks);
      
      const headers = contentObj.blocks
        .filter((block: Block) => block.type.startsWith('h'))
        .map((block: Block) => ({
          id: block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: block.content,
          level: parseInt(block.type.charAt(1))
        }));
      
      setTableOfContents(headers);
    } catch (error) {
      console.error('Error parsing content:', error);
    }
  }, [content]);

  const renderBlock = (block: Block) => {
    const id = block.type.startsWith('h') 
      ? block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : undefined;

    switch (block.type) {
      case 'h1':
        return <h1 id={id} className="text-4xl font-bold mb-6">{block.content}</h1>;
      case 'h2':
        return <h2 id={id} className="text-3xl font-semibold mt-8 mb-4">{block.content}</h2>;
      case 'h3':
        return <h3 id={id} className="text-2xl font-semibold mt-6 mb-3">{block.content}</h3>;
      case 'paragraph':
        return <p className="mb-4 leading-relaxed">{block.content}</p>;
      case 'list':
        return (
          <ul className="list-disc pl-6 mb-4 space-y-2">
            {block.items?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4">
      <div className="text-sm text-gray-500 mb-4">
        Publié le {format(new Date(publishedAt), 'dd MMMM yyyy', { locale: fr })}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h4 className="font-semibold mb-4">Sommaire</h4>
        <nav>
          <ul className="space-y-2">
            {tableOfContents.map((item) => (
              <li 
                key={item.id}
                style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
              >
                <a 
                  href={`#${item.id}`}
                  className="text-primary hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {parsedContent.map((block, index) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}

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
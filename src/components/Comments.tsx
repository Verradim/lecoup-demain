import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { CommentForm } from "./CommentForm";

interface Comment {
  id: string;
  created_at: string;
  name: string;
  content: string;
}

interface CommentsProps {
  articleId: string;
}

export const Comments = ({ articleId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('article_comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  if (isLoading) {
    return <div>Chargement des commentaires...</div>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">Commentaires</h3>
      
      <div className="mb-8">
        <CommentForm articleId={articleId} onCommentAdded={fetchComments} />
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{comment.name}</span>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.created_at), 'dd MMMM yyyy', { locale: fr })}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-gray-500 text-center">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </p>
        )}
      </div>
    </div>
  );
};
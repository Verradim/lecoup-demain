export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  meta_title: string;
  meta_description: string;
}

export const articles: Article[] = [
  {
    id: "comment-augmenter-sa-visibilite",
    slug: "comment-augmenter-sa-visibilite",
    title: "Comment augmenter sa visibilité en tant qu'artisan indépendant dans le bâtiment",
    content: `...`, // Keep existing content
    published_at: "2024-03-20",
    meta_title: "Augmenter sa visibilité en tant qu'artisan du bâtiment",
    meta_description: "Découvrez les meilleures pratiques pour améliorer votre visibilité et attirer de nouveaux clients dans le secteur du bâtiment."
  }
];
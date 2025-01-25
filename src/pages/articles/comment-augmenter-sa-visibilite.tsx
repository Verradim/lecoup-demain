import { ArticleContent } from "@/components/ArticleContent";
import { Comments } from "@/components/Comments";
import { BreadcrumbNav } from "@/components/Breadcrumb";

const VisibilityArticle = () => {
  return (
    <div className="container mx-auto py-8">
      <BreadcrumbNav />
      
      <ArticleContent
        title="Comment augmenter sa visibilité en tant qu'artisan indépendant dans le bâtiment"
        publishedAt="2024-03-20"
        content={`
          <p>En tant qu'artisan indépendant dans le secteur du bâtiment, votre visibilité est essentielle pour attirer de nouveaux clients et développer votre activité. Voici quelques conseils pratiques pour améliorer votre présence sur le marché :</p>

          <h2>1. Optimisez votre présence en ligne</h2>
          <ul>
            <li>Créez un site web professionnel présentant vos services et réalisations</li>
            <li>Inscrivez-vous sur les annuaires professionnels en ligne</li>
            <li>Utilisez les réseaux sociaux pour partager vos projets</li>
          </ul>

          <h2>2. Soignez votre image professionnelle</h2>
          <ul>
            <li>Investissez dans une identité visuelle cohérente</li>
            <li>Personnalisez vos véhicules et tenues de travail</li>
            <li>Créez des cartes de visite et plaquettes professionnelles</li>
          </ul>

          <h2>3. Développez votre réseau</h2>
          <ul>
            <li>Participez aux salons professionnels</li>
            <li>Rejoignez des associations d'artisans</li>
            <li>Collaborez avec d'autres professionnels du secteur</li>
          </ul>

          <h2>4. Misez sur le bouche-à-oreille</h2>
          <ul>
            <li>Encouragez les avis clients</li>
            <li>Proposez un système de parrainage</li>
            <li>Restez en contact avec vos anciens clients</li>
          </ul>
        `}
      />
      
      <div className="max-w-4xl mx-auto px-4">
        <Comments articleId="comment-augmenter-sa-visibilite" />
      </div>
    </div>
  );
};

export default VisibilityArticle;
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
}

export const Layout = ({ 
  children, 
  title, 
  description, 
  canonicalUrl,
  ogImage = "https://lecoup-demain.com/lovable-uploads/logo-white1.png"
}: LayoutProps) => {
  return (
    <>
      <Helmet>
        <html lang="fr" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta name="keywords" content="Bâtiment, Artisanat, professionnels du bâtiment, communauté, artisans indépendants, entraide, collaboration" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1" role="main" aria-label={title}>
          <noscript>
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-lg mb-4">{description}</p>
            </div>
          </noscript>
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};
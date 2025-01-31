import { Layout } from "@/components/Layout";
import { ArtisanForm } from "@/components/artisan-form/ArtisanForm";

const FindArtisans = () => {
  return (
    <Layout
      title="Trouver & engager des artisans en quelques clics pour vos chantiers"
      description="Trouvez les meilleurs artisans qualifiés pour vos projets de construction et de rénovation. Un processus simple et efficace pour engager des professionnels vérifiés."
      canonicalUrl="https://lecoup-demain.com/trouver-des-artisans"
    >
      <div className="min-h-screen bg-background">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-primary">
              Trouver & engager des artisans en quelques clics pour vos chantiers
            </h1>
            <ArtisanForm />
          </div>
          <div className="hidden lg:block relative">
            <div className="sticky top-8">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="/lovable-uploads/a2baa7c3-59f0-476b-92b3-62a964de62d5.png"
                  alt="Artisans travaillant sur un échafaudage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindArtisans;
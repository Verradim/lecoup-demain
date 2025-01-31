import { Layout } from "@/components/Layout";
import { ArtisanForm } from "@/components/artisan-form/ArtisanForm";

const FindArtisans = () => {
  return (
    <Layout
      title="Trouver & engager des artisans en quelques clics pour vos chantiers"
      description="Trouvez les meilleurs artisans qualifiés pour vos projets de construction et de rénovation. Un processus simple et efficace pour engager des professionnels vérifiés."
      canonicalUrl="https://lecoup-demain.com/trouver-des-artisans"
    >
      <section id="artisan-form" className="py-20 px-4 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
            Trouver & engager des artisans
          </h2>
          <ArtisanForm />
        </div>
      </section>
    </Layout>
  );
};

export default FindArtisans;
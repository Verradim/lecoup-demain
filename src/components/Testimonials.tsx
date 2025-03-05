
export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Témoignages
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "Cette plateforme a révolutionné ma façon de gérer mes sous-traitants. Tout est centralisé et simplifié !"
            </p>
            <div className="font-semibold">Jean Dupont</div>
            <div className="text-sm text-gray-500">Artisan Plombier</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "Je gagne un temps précieux sur la paperasse administrative. Maintenant je peux me concentrer sur mon vrai métier."
            </p>
            <div className="font-semibold">Marie Laurent</div>
            <div className="text-sm text-gray-500">Entrepreneure en bâtiment</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "Fini les problèmes de contrats non conformes ! Maintenant j'ai l'esprit tranquille pour travailler avec mes sous-traitants."
            </p>
            <div className="font-semibold">Thomas Moreau</div>
            <div className="text-sm text-gray-500">Architecte d'intérieur</div>
          </div>
        </div>
      </div>
    </section>
  );
};

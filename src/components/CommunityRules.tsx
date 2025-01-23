import { Heart, HandshakeIcon, Shield } from "lucide-react";

export const CommunityRules = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          📋 Les règles de notre communauté
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Pour garantir des échanges constructifs et maintenir un esprit collaboratif, notre communauté repose sur quelques règles simples mais essentielles :
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold">1. Donner, c'est recevoir</h3>
            </div>
            <p className="text-gray-600">
              La force de cette communauté repose sur le partage. Posez vos questions, mais pensez aussi à aider les autres. Chaque conseil ou retour d'expérience peut faire une grande différence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <HandshakeIcon className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">2. Collaborer pour se développer</h3>
            </div>
            <p className="text-gray-600">
              Nous croyons que l'entraide est le meilleur moyen de grandir. Tendez la main aux autres membres, et soyez prêt à explorer des partenariats pour avancer ensemble.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="text-xl font-semibold">3. Respect et bienveillance avant tout</h3>
            </div>
            <p className="text-gray-600">
              Le respect mutuel est au cœur de nos interactions. Ici, on échange dans la courtoisie, même en cas de désaccord. Nous construisons un espace inclusif et accueillant pour tous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
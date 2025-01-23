import { InlineWidget } from "react-calendly";

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-accent" id="not-recommended">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">
          Vous n'êtes pas recommandé?
        </h2>
        <h3 className="text-xl md:text-2xl text-center text-secondary mb-8">
          Vous n'avez pas été recommandé mais envie de faire partie de l'aventure ?
        </h3>
        <p className="text-lg text-center text-gray-600 mb-12">
          Aucun problème, nous étudions chaque candidature. Prenez un créneau pour qu'on se présente, 
          et connaître vos motivations pour nous rejoindre.
        </p>
        <div className="w-full max-w-4xl mx-auto h-[700px]">
          <InlineWidget 
            url="https://calendly.com/lecoupdemain/appel-de-decouverte"
            styles={{
              height: '100%',
              width: '100%',
            }}
          />
        </div>
      </div>
    </section>
  );
};
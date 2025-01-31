export const ReassuranceTexts = () => {
  return (
    <div className="hidden lg:flex flex-col gap-4 absolute inset-0 p-8">
      <button className="bg-[#302cd71a] transition-colors text-[#302cd7] px-6 py-3 rounded-lg shadow-lg w-fit text-sm font-medium self-start mt-12">
      Travaillez avec des professionnels de confiance, sélectionnés selon vos critères.
      </button>
      
      <button className="bg-[#302cd71a] transition-colors text-[#302cd7] px-6 py-3 rounded-lg shadow-lg w-fit text-sm font-medium self-end mt-24">
        Tous les artisans sont vérifiés et qualifiés avant d'être proposés.
      </button>
      
      <button className="bg-[#302cd71a] transition-colors text-[#302cd7] px-6 py-3 rounded-lg shadow-lg w-fit text-sm font-medium self-end mt-24">
      Notre équipe vous accompagne à chaque étape pour trouver le bon partenaire.
      </button>
    </div>
  );
};
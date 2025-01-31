export const ReassuranceTexts = () => {
  return (
    <div className="hidden lg:flex flex-col gap-4 absolute inset-0 p-8">
      <button className="bg-white/90 hover:bg-white/95 transition-colors text-secondary px-6 py-3 rounded-lg shadow-lg w-fit text-sm font-medium self-start mt-12">
        Pour vous trouver les perles rares, on a besoin de vous connaître un peu plus.
      </button>
      
      <button className="bg-white/90 hover:bg-white/95 transition-colors text-secondary px-6 py-3 rounded-lg shadow-lg w-fit text-sm font-medium self-end mt-24">
        Tous les artisans sont vérifiés et qualifiés avant d'être proposés.
      </button>
      
      <button className="bg-white/90 hover:bg-white/95 transition-colors text-secondary px-6 py-3 rounded-lg shadow-lg w-fit text-sm font-medium self-center mt-auto mb-24">
        Que ce soit pour une mission ponctuelle ou une collaboration régulière, nous avons la solution.
      </button>
    </div>
  );
};
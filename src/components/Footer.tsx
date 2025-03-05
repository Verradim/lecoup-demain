import { Link } from "react-router-dom";
export const Footer = () => {
  return <footer className="bg-white py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-lg mb-4">Le coup de main.</h3>
            <p className="text-gray-600">Simplifier la vie des professionnels pour construire le secteur du bâtiment de demain.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">
              Des questions? Contactez-nous à :
              <br />
              <a href="mailto:contact@lecoup-demain.com" className="text-primary hover:underline">
                contact@lecoup-demain.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Lecoup-demain.com. Tous droits reservés.</p>
        </div>
      </div>
    </footer>;
};
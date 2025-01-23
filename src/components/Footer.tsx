import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-lg mb-4">Le coup de main.</h3>
            <p className="text-gray-600">
              Connecter les professionnels pour construire le secteur du bâtiment de demain.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rules" className="text-gray-600 hover:text-primary">
                  Community Rules
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">
              Questions? Email us at:
              <br />
              <a
                href="mailto:contact@buildingpro.com"
                className="text-primary hover:underline"
              >
                contact@buildingpro.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Lecoup-demain.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

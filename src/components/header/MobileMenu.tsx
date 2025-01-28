import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { articles } from "@/data/articles";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scrollToForm: () => void;
}

export const MobileMenu = ({ isOpen, setIsOpen, scrollToForm }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-x-0 top-16 origin-top-right transform p-2 transition md:hidden">
      <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="space-y-6 px-5 py-6">
          <div className="grid gap-y-4">
            <Link
              to="/"
              className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="ml-3 text-base font-medium text-gray-900">Accueil</span>
            </Link>

            <Link
              to="/about"
              className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="ml-3 text-base font-medium text-gray-900">Qui sommes-nous ?</span>
            </Link>

            <a
              href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd"
              target="_blank"
              rel="noopener noreferrer"
              className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="ml-3 text-base font-medium text-gray-900">Règles de la communauté</span>
            </a>
            
            <Link
              to="/ressources"
              className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="ml-3 text-base font-medium text-gray-900">Ressources</span>
            </Link>

            <Link
              to="/news"
              className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="ml-3 text-base font-medium text-gray-900">Le coup de main News</span>
            </Link>

            <Button
              onClick={scrollToForm}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Rejoignez-nous
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
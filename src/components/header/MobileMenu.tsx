import { Link } from "react-router-dom";
import { Button } from "../ui/button";

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
              to="/trouver-des-artisans"
              className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <span className="ml-3 text-base font-medium text-gray-900">Trouver des artisans</span>
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
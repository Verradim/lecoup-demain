
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { MobileMenu } from "./header/MobileMenu";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const scrollToForm = () => {
    setIsOpen(false);
    // Redirect to auth page instead of scrolling to form
    window.location.href = "/auth";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img 
              src="/lovable-uploads/eb896c7b-b343-45d7-a812-f67e4b59da23.png" 
              alt="Le Coup de Main" 
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
        </button>

        <div className="hidden flex-1 items-center md:flex">
          {/* Removed "Trouver des artisans" link */}
        </div>

        <div className="hidden md:flex md:items-center md:justify-end md:flex-1 space-x-4">
          {user ? (
            <Link
              to="/mon-espace"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Mon espace
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Button
                onClick={scrollToForm}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Rejoignez-nous
              </Button>
            </>
          )}
        </div>

        <MobileMenu 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          scrollToForm={scrollToForm}
        />
      </div>
    </header>
  );
};

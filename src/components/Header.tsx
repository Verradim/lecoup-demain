import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="/lovable-uploads/logo-white1.png" alt="Le Coup de Main" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden flex-1 items-center space-x-6 md:flex">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary">
            Accueil
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-primary">
            Qui sommes-nous ?
          </Link>
          <a
            href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            Règles de la communauté
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex md:items-center md:justify-end md:flex-1">
          <Button
            onClick={() => {
              const element = document.getElementById("join-form");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Rejoignez-nous
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
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
                    href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd?pvs=74"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">Règles de la communauté</span>
                  </a>
                  <Button
                    onClick={() => {
                      const element = document.getElementById("join-form");
                      element?.scrollIntoView({ behavior: "smooth" });
                      setIsOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Rejoignez-nous
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
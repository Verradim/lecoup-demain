import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { articles } from "@/data/articles";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollToForm = () => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/#join-form";
      return;
    }
    const element = document.getElementById("join-form");
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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

        <nav className="hidden flex-1 items-center md:flex">
          <div className="flex space-x-8">
            <Link 
              to="/about" 
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-primary px-3 py-2"
            >
              Qui sommes-nous ?
            </Link>
            
            <a
              href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd?pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-primary px-3 py-2"
            >
              Règles de la communauté
            </a>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-gray-100 hover:bg-white transition-colors">Ressources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <Link
                        to="/ressources"
                        className="block mb-2 text-sm font-medium text-primary hover:underline"
                      >
                        Voir toutes les ressources →
                      </Link>
                      <div className="mt-4 space-y-2 hover:bg-white">
                        {articles.map((article) => (
                          <Link
                            to={`/ressources/${article.id}`}
                    
                            className="block text-sm text-gray-700 hover:text-primary"
                          >
                            {article.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>

        <div className="hidden md:flex md:items-center md:justify-end md:flex-1">
          <Button
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Rejoignez-nous
          </Button>
        </div>

        {isOpen && (
          <div className="absolute inset-x-0 top-16 origin-top-right transform p-2 transition md:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="space-y-6 px-5 py-6">
                <div className="grid gap-y-4">
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
                  
                  <Link
                    to="/ressources"
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">Ressources</span>
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
        )}
      </div>
    </header>
  );
};
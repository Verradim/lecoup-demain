import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { MobileMenu } from "./header/MobileMenu";
import { ResourcesMenu } from "./header/ResourcesMenu";

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
              href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-primary px-3 py-2"
            >
              Règles de la communauté
            </a>

            <ResourcesMenu />

            <Link 
              to="/news" 
              className="whitespace-nowrap text-sm font-medium bg-primary/10 text-primary rounded-full px-4 py-2 hover:bg-primary/20 transition-colors"
            >
              Le coup de main News
            </Link>
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

        <MobileMenu 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          scrollToForm={scrollToForm}
        />
      </div>
    </header>
  );
}
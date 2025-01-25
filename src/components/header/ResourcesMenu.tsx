import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { articles } from "@/data/articles";

export const ResourcesMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-gray-100 hover:bg-white transition-colors">
            Ressources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-4 hover:bg-white">
              <Link
                to="/ressources"
                className="block mb-2 text-sm font-medium text-primary hover:underline"
              >
                Voir toutes les ressources →
              </Link>
              <div className="mt-4 space-y-2">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/ressources/${article.slug}`}
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
  );
};
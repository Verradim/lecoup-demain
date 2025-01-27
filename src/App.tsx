import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import Article from "@/pages/Article";

function App() {
  return (
    <Router>
      <Helmet>
        <html lang="fr" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta name="keywords" content="Bâtiment, Artisanat, professionnels du bâtiment, communauté, artisans indépendants, entraide, collaboration" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/ressources" element={<Resources />} />
            <Route path="/ressources/:slug" element={<Article />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import Article from "@/pages/Article";
import VisibilityArticle from "@/pages/articles/comment-augmenter-sa-visibilite";

function App() {
  return (
    <Router>
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
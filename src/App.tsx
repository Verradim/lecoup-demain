import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import Article from "@/pages/Article";
import News from "@/pages/News";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/ressources" element={<Resources />} />
        <Route path="/ressources/:slug" element={<Article />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
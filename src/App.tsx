import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import FindArtisans from "@/pages/FindArtisans";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/trouver-des-artisans" element={<FindArtisans />} />
      </Routes>
    </Router>
  );
}

export default App;
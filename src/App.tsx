import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import FindArtisans from "@/pages/FindArtisans";
import Auth from "@/pages/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trouver-des-artisans" element={<FindArtisans />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
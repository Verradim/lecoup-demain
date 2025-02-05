
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/mon-espace");
  }, [navigate]);

  return null;
};

export default MyProjects;


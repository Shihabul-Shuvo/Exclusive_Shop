import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useIsLoggedIn(){
const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/login");
      alert("Access denied. Please log in to view your account.");
    }
  }, [navigate]);
  return useIsLoggedIn;
}
import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/attempts');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
}

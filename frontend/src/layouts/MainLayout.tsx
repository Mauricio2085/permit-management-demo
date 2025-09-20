import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function MainLayout() {
  const { user } = useAuth();
  console.log("Este es el usuario para validación de paginas privadas", user);

  useEffect(() => {});

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {user ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
}

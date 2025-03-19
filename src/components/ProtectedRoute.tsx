import { Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import { ReactNode } from "react";
import { UserRole } from "./types/dto";

// Componente para proteger rutas basadas en el rol del usuario
export const ProtectedRoute = ({
  children, // El contenido a mostrar si el usuario tiene acceso
  allowedRoles, // Roles permitidos para acceder a la ruta
}: {
  children: ReactNode; // El contenido a renderizar
  allowedRoles: UserRole[]; // Los roles permitidos para acceder a la ruta
}) => {
  const { role } = useUser(); // Obtiene el rol del usuario desde el contexto

  // Si el rol del usuario no existe o no está en los roles permitidos, redirige a la página de inicio
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/inicio" replace />; // Redirige al usuario a la página de inicio
  }

  // Si el usuario tiene el rol adecuado, renderiza los children (contenido protegido)
  return children;
};

import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "../components/types/dto"; // Tipo para el rol del usuario

// Definición del tipo para el contexto del usuario
interface UserContextType {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
}

// Crear el contexto con valores predeterminados
const UserContext = createContext<UserContextType>({
  role: null,
  setRole: () => {},
});

// Componente proveedor para envolver otros componentes y proporcionar el contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Estado para almacenar el rol del usuario
  const [role, setRole] = useState<UserRole | null>(null);

  return (
    // El proveedor del contexto pasa el estado y la función de actualización a sus hijos
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del usuario en cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

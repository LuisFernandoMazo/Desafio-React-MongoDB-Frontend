import { createContext, useContext, useState, ReactNode } from "react";

// Definición del tipo para el contexto del documento
interface DocumentContextType {
  document: string; // El documento actual (probablemente un ID o identificador)
  setDocument: (doc: string) => void; // Función para actualizar el documento
}

// Crear el contexto con valores predeterminados
const DocumentContext = createContext<DocumentContextType>({
  document: "",
  setDocument: () => {},
});

// Componente proveedor para envolver otros componentes y proporcionar el contexto
export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [document, setDocument] = useState<string>(""); // Estado local para el documento

  return (
    // El proveedor del contexto pasa el estado y la función de actualización a sus hijos
    <DocumentContext.Provider value={{ document, setDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del documento en cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export const useDocument = () => useContext(DocumentContext);

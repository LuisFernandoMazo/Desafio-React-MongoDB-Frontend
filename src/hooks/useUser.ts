import { useEffect, useState } from "react";
import { getUserApi } from "../apis/services/api";
import { useDocument } from "../contexts/DocumentContext";
import { User } from "../components/types/dto";

// Custom hook para obtener los datos del usuario
export const useUserData = () => {
  // Estado para almacenar los datos del usuario
  const [dataUser, setDataUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { document } = useDocument(); // Obtiene el identificador del usuario desde el contexto

  useEffect(() => {
    // Función asíncrona para obtener los datos del usuario
    const getDataUser = async () => {
      setLoading(true);
      setError("");
      try {
        // Llama a la API para obtener los datos del usuario
        const dataUsers = await getUserApi(document);
        setDataUser(dataUsers); // Establece los datos del usuario
      } catch (error) {
        // Si ocurre un error, muestra el mensaje de error
        console.error(error);
        setError("Hubo un error al cargar los datos del usuario");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    // Llama a la función para obtener los datos del usuario
    getDataUser();
  }, [document]); // El efecto se ejecuta cada vez que cambia el identificador del usuario

  // Retorna los datos, estado de carga, estado de error y función para actualizar los datos
  return { dataUser, setDataUser, loading, error };
};

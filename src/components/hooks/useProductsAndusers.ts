import { useState, useEffect } from "react";
import { getAllProductsApi, getAllUsersApi } from "../../apis/services/api";
import { Product, User } from "../types/dto";

// Custom hook para obtener los productos y los usuarios
export const useProductAndUsers = () => {
  // Estados locales para almacenar los datos de productos y usuarios, así como el estado de carga y error
  const [dataProducts, setDataProducts] = useState<Product[] | null>(null);
  const [dataUsers, setDataUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Función asíncrona que obtiene los productos y los usuarios de la API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtiene los productos y los usuarios en paralelo
      const [products, users] = await Promise.all([
        getAllProductsApi(),
        getAllUsersApi(),
      ]);
      // Si la solicitud es exitosa, almacena los datos en el estado
      setDataProducts(products);
      setDataUsers(users);
    } catch (error) {
      // Si ocurre un error, lo captura y actualiza el estado de error
      console.error(error);
      setError("Hubo un error al cargar los productos y usuarios.");
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Ejecuta la función fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  // Retorna los datos, el estado de carga y el error para ser utilizados en los componentes
  return { dataProducts, dataUsers, loading, error };
};

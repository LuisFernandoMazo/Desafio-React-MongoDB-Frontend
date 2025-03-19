import { useCallback, useEffect, useState } from "react";
import { articlesApi, getUserApi } from "../../apis/services/api";
import { Article } from "../types/dto";
import { useUser } from "../contexts/UserContext";
import { useDocument } from "../contexts/DocumentContext";
import { useNavigate } from "react-router-dom";
import { Table } from "./Table";
import { Spinner } from "../common/Spinner";
import { Button } from "../common/Button";

// Definición de las columnas para la tabla
const columns: {
  key: keyof Article;
  label: string;
  type: "text" | "readonly" | "select" | "date" | "money";
}[] = [
  { key: "name", label: "Nombre", type: "text" },
  { key: "category", label: "Categoría", type: "text" },
  { key: "description", label: "Descripción", type: "text" },
  { key: "price", label: "Precio", type: "money" },
  { key: "brand", label: "Marca", type: "text" },
  { key: "stock", label: "Stock", type: "text" },
  { key: "tags", label: "Tags", type: "text" },
  { key: "sku", label: "Sku", type: "text" },
  { key: "createdAt", label: "Creado En", type: "date" },
  { key: "updatedAt", label: "Actualizado En", type: "date" },
];

// Componente principal de Artículos
export const Articles = () => {
  const [dataArticles, setDataArticles] = useState<Article[] | null>(null); // Estado para almacenar los artículos
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const { document } = useDocument(); // Obtiene el documento (ID del usuario) desde el contexto
  const { setRole } = useUser(); // Obtiene la función para actualizar el rol desde el contexto
  const navigate = useNavigate(); // Hook de navegación

  // Función para obtener todos los artículos y los datos del usuario
  const getAllArticles = useCallback(async () => {
    if (!document) return navigate("/inicio");
    setError(null);
    try {
      // Llama a ambas API para obtener artículos y datos del usuario
      const [data, dataUser] = await Promise.all([
        articlesApi(document),
        getUserApi(document),
      ]);

      // Si los datos son válidos, actualiza el estado
      if (data && dataUser) {
        setDataArticles(data);
        // Asigna el rol del usuario según los datos obtenidos
        if (dataUser.role === "cliente") {
          setRole(dataUser.role);
        } else if (dataUser.role === "admin") {
          setRole(dataUser.role);
        }
      }
    } catch (error) {
      console.error(error);
      // Si ocurre un error, muestra un mensaje
      setError(`Upps! el usuario : ${document} no se encuentra registrado`);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }, [document, setRole, navigate]);

  // Ejecuta la función cuando el componente se monta o el documento cambia
  useEffect(() => {
    getAllArticles();
  }, [document, getAllArticles]);

  // Si está cargando, muestra el spinner
  if (loading) return <Spinner />;

  // Si hay un error, muestra el mensaje de error y un botón para volver
  if (error) {
    return (
      <>
        <p className="text-3xl"> {error} </p>
        <Button
          type="button"
          onClick={() => navigate("/inicio")} // Navega al inicio
          className="w-1/4 bg-gray-800 mt-1 text-white hover:bg-black/50 transition-colors px-4 py-2 rounded-lg shadow-md"
        >
          Volver
        </Button>
      </>
    );
  }

  // Si hay datos de artículos, los muestra en una tabla
  return (
    <>
      {dataArticles && (
        <Table title="PRODUCTOS" data={dataArticles} columns={columns} />
      )}
    </>
  );
};

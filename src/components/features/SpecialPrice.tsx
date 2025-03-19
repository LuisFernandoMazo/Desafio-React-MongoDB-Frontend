import { useEffect, useState } from "react";
import {
  getAllSpecialPriceApi,
  putUpdateSpecialPrice,
} from "../../apis/services/api";
import { Table } from "./Table";
import { PriceSpecial } from "../types/dto";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../common/Spinner";

// Definición de las columnas de la tabla
const columns: {
  key: keyof PriceSpecial;
  label: string;
  type: "text" | "readonly" | "select" | "date" | "money";
  options?: { value: boolean; label: string }[];
}[] = [
  { key: "userId", label: "Nombre", type: "readonly" },
  { key: "productId", label: "Producto", type: "readonly" },
  { key: "specialPrice", label: "Precio especial", type: "money" },
  { key: "startDate", label: "Fecha de inicio oferta", type: "date" },
  { key: "endDate", label: "Fecha de fin oferta", type: "date" },
  { key: "createAt", label: "Creado En", type: "readonly" },
  { key: "updateLastAt", label: "Última actualización", type: "readonly" },
  {
    key: "status",
    label: "Estado",
    type: "select",
    options: [
      { value: true, label: "Activo" },
      { value: false, label: "Inactivo" },
    ],
  },
];

// Componente principal para mostrar y gestionar precios especiales
export const SpecialPrice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [dataTableSpecialPrice, setSpecialPrices] = useState<
    PriceSpecial[] | null
  >(null); // Datos de precios especiales

  // Función para obtener los precios especiales desde la API
  const getDataSpecialPrice = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllSpecialPriceApi(); // Obtiene los datos
      setSpecialPrices(data); // Almacena los datos en el estado
    } catch (err) {
      console.error("Error: ", err);
      setError("Error al cargar los precios especiales"); // Muestra el error
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Ejecuta la función para cargar los datos cuando el componente se monta
  useEffect(() => {
    getDataSpecialPrice();
  }, []);

  // Si está cargando, muestra el Spinner
  if (loading) return <Spinner />;

  // Si hay un error, muestra el mensaje de error
  if (error) return <p>{error}</p>;

  // Función para manejar la edición de un precio especial
  const handleEdit = async (updatedItem: PriceSpecial) => {
    try {
      await putUpdateSpecialPrice(updatedItem); // Actualiza el precio especial
      getDataSpecialPrice(); // Recarga los precios especiales después de la actualización
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="overflow-auto">
      <div className="w-full flex justify-end">
        <Button
          type="button"
          onClick={() => {
            navigate("/add-price-special");
          }}
        >
          Agregar precio especial
        </Button>
      </div>

      {dataTableSpecialPrice && (
        <Table<PriceSpecial>
          title="PRECIOS ESPECIALES"
          data={dataTableSpecialPrice}
          columns={columns}
          onEdit={handleEdit}
          onEditTable
        />
      )}
    </div>
  );
};

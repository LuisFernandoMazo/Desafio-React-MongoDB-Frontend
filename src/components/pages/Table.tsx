import { useEffect, useState } from "react";
import { EditModal } from "./EditModal";
import { Button } from "../common/Button";
import { formatearPrecio } from "../../utils/Utils";
import { Column } from "../types/dto";

// Definición de las props que el componente Table recibirá
interface TableProps<T> {
  data: T[] | null; // Los datos que se mostrarán en la tabla
  columns: Column<T>[]; // Las columnas que definen la estructura de la tabla
  onEdit?: (updatedData: T) => void; // Función para manejar la edición de un registro
  onEditTable?: boolean; // Habilita la columna de "Acciones" (editar)
  title: string; // El título de la tabla
}

// Componente Table genérico para mostrar datos en una tabla
export const Table = <T,>({
  data,
  columns,
  onEdit,
  title,
  onEditTable = false, // Por defecto, no se muestra la columna de "Acciones"
}: TableProps<T>) => {
  // Estados locales para manejar los datos y la fila seleccionada
  const [tableData, setTableData] = useState<T[]>(data || []);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal de edición

  // Actualiza la tabla cuando los datos cambian
  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // Abre el modal con los datos de la fila seleccionada
  const openModal = (row: T) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // Guarda los cambios cuando se edita una fila
  const handleSave = (updatedRow: T) => {
    if (onEdit) {
      onEdit(updatedRow); // Llama a la función onEdit con los datos actualizados
    }
    closeModal(); // Cierra el modal después de guardar
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm mx-4 my-6">
      <p className="text-3xl font-bold text-center w-full text-gray-700">
        TABLA {title}
      </p>
      <table className="divide-y divide-gray-200 overflow-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                {column.label}
              </th>
            ))}
            {onEditTable && <th className="px-6 py-3 text-left">Acciones</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors w-full"
            >
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="px-2 py-1 text-sm text-gray-900 h-auto text-center"
                >
                  {column.type === "money"
                    ? formatearPrecio(String(row[column.key]))
                    : String(row[column.key])}
                </td>
              ))}
              {onEditTable && (
                <td className="px-6 py-4">
                  <Button
                    type="button"
                    onClick={() => openModal(row)} // Abre el modal de edición
                    className="py-0 text-blue-500 cursor-pointer w-20 h-8 hover:text-black "
                  >
                    Editar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal de edición */}
      {onEditTable && (
        <EditModal
          isOpen={isModalOpen}
          data={selectedRow}
          onClose={closeModal} // Cierra el modal
          onSave={handleSave} // Guarda los cambios
          columns={columns} // Las columnas de la tabla para la edición
        />
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { DropDown } from "../common/DropDown";
import { Input } from "../common/Input";
import { formatearPrecio } from "../../utils/Utils";
import { Column } from "../types/dto";

// Interfaz para las props del modal
interface ModalProps<T> {
  isOpen: boolean; // Si el modal está abierto o cerrado
  data: T | null; // Los datos actuales del registro
  onClose: () => void; // Función para cerrar el modal
  onSave: (updatedData: T) => void; // Función para guardar los cambios
  columns: Column<T>[]; // Las columnas o campos que se van a mostrar en el modal
}

// Componente EditModal genérico
export const EditModal = <T,>({
  isOpen,
  data,
  onClose,
  onSave,
  columns,
}: ModalProps<T>) => {
  // Estado para los datos editables
  const [formData, setFormData] = useState<T | null>(data);
  const [valueSelected, setValueSelected] = useState<string | boolean>(); // Estado para valores seleccionados

  // Actualiza formData cuando el prop data cambia
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Si el modal no está abierto o no hay datos, no renderiza nada
  if (!isOpen || !formData) return null;

  // Función para manejar cambios en los campos
  const handleChange = (field: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev!, [field]: value }));
    setValueSelected(value);
  };

  // Función para guardar los datos editados
  const handleSave = () => {
    if (!formData || !data) return;

    const changes: Partial<T> = Object.keys(formData).reduce((acc, key) => {
      if (formData[key as keyof T] !== data[key as keyof T]) {
        acc[key as keyof T] = formData[key as keyof T];
      }
      return acc;
    }, {} as Partial<T>);

    // Si hay cambios, los guarda y agrega la fecha de actualización
    if (Object.keys(changes).length > 0) {
      const updatedData = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _id: (data as any)._id,
        updateLastAt: new Date().toISOString(),
        ...changes,
      };

      onSave(updatedData as T);
    }

    onClose(); // Cierra el modal después de guardar
  };

  // Renderiza el modal con los campos correspondientes
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Registro</h2>
        {columns.map((column) => (
          <div key={column.key as string} className="mb-2">
            <label className="block text-sm font-medium">{column.label}</label>
            {column.type === "text" && (
              <Input
                type={column.type}
                value={String(formData[column.key])}
                onChange={(e) => handleChange(column.key, e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}
            {column.type === "money" && (
              <Input
                type={column.type}
                value={formatearPrecio(String(formData[column.key]))}
                onChange={(e) => handleChange(column.key, e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}
            {column.type === "date" && (
              <Input
                type={column.type}
                value={String(formData[column.key])}
                onChange={(e) => handleChange(column.key, e.target.value)}
                className="w-full border p-2 rounded"
              />
            )}
            {column.type === "readonly" && (
              <Input
                value={String(formData[column.key])}
                disabled
                className="bg-gray-500/15"
              />
            )}
            {column.type === "select" && (
              <DropDown
                options={column.options ?? []}
                selectedValue={valueSelected ?? ""}
                onChange={(value) => handleChange(column.key, value)}
                title=""
              />
            )}
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { DropDown } from "../common/DropDown";
import { useState } from "react";
import { addNewPriceSpecialApi } from "../../apis/services/api";
import { PriceSpecial } from "../types/dto";
import { useNavigate } from "react-router-dom";
import { useProductAndUsers } from "../hooks/useProductsAndusers";
import { Spinner } from "../common/Spinner";
import { formatearPrecio } from "../../utils/Utils";
import Popup from "../common/PopUp";

export const FormPriceSpecial = () => {
  // Hook de navegación para redirigir
  const navigate = useNavigate();

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState<PriceSpecial>({
    userId: "",
    productId: "",
    specialPrice: "",
    endDate: "",
    startDate: "",
    status: "",
  });

  // Estado para manejar errores en el formulario
  const [errorForm, setErrorForm] = useState<string>("");

  // Datos de productos y usuarios
  const { dataProducts, dataUsers, error, loading } = useProductAndUsers();

  // Estado para controlar la visibilidad del popup
  const [showPopUp, setSetshowPopUp] = useState<boolean>(false);

  // Manejo de cambios en el formulario
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.userId ||
      !formData.status ||
      !formData.productId ||
      !formData.endDate ||
      !formData.startDate ||
      !formData.specialPrice
    ) {
      return setErrorForm("*Todos los campos son obligatorios");
    } else {
      setErrorForm("");
    }

    const data = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };
    const resp = await addNewPriceSpecialApi(data);
    if (resp) {
      setSetshowPopUp(true);
    }
    resetForm();
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      userId: "",
      productId: "",
      specialPrice: "",
      endDate: "",
      startDate: "",
      status: "",
    });
  };

  // Opciones de productos
  const dataOptionsProducts =
    dataProducts?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  // Opciones de usuarios
  const dataOptionsUsers =
    dataUsers?.map((item) => ({
      value: item._id,
      label: item.nombre,
    })) || [];

  // Opciones de estado
  const dataState: { value: string; label: string }[] = [
    { value: "true", label: "Activo" },
    {
      value: "false",
      label: "Inactivo",
    },
  ];

  if (loading) return <Spinner></Spinner>;
  if (error) return <p>{error}</p>;

  return (
    <div className="">
      <p className="text-3xl font-bold text-center mb-6">
        FORMULARIO PRECIO ESPECIAL
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <DropDown
          key={"usuario"}
          title="Seleccione el usuario"
          options={dataOptionsUsers}
          onChange={(value) => {
            handleChange("userId", value);
          }}
          selectedValue={formData.userId}
        />
        <DropDown
          key={"producto"}
          title="Seleccione el producto"
          options={dataOptionsProducts}
          onChange={(value) => {
            handleChange("productId", value);
          }}
          selectedValue={formData.productId}
        />
        <Input
          key={"precio especial"}
          type="text"
          value={formatearPrecio(formData.specialPrice)}
          placeholder="Ingrese el precio"
          onChange={(e) => {
            handleChange("specialPrice", e.target.value);
          }}
          title="Precio Especial"
        />
        <Input
          key={"Fecha inicio"}
          type="date"
          value={formData.startDate}
          onChange={(e) => {
            handleChange("startDate", e.target.value);
          }}
          title="Fecha inicio"
        />
        <Input
          key={"Fecha final"}
          type="date"
          value={formData.endDate}
          onChange={(e) => {
            handleChange("endDate", e.target.value);
          }}
          title="Fecha Fin"
        />
        <DropDown
          key={"estado"}
          title="Seleccione el estado"
          options={dataState}
          onChange={(value) => handleChange("status", value)}
          selectedValue={formData.status}
        />
        {formData.status === "false" && (
          <textarea className="text-yellow-600 resize-none h-20" disabled>
            Nota: al colocar el estado inactivo el precio especial no se vera
            reflejado al usuario en la tabla de productos hasta que este se
            encuentre activo.
          </textarea>
        )}
        <p className="text-red-700 text-[16px] font-semibold ">{errorForm}</p>
        <div className="flex gap-2 w-full justify-center">
          <Button
            type="button"
            onClick={() => {
              navigate("/special-price");
            }}
          >
            Volver
          </Button>
          <Button type="submit">Enviar</Button>
        </div>
      </form>
      {showPopUp && (
        <Popup
          mensaje="Precio especial agregado correctamente!"
          duracion={2000}
        />
      )}
    </div>
  );
};

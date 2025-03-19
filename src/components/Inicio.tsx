import { useNavigate } from "react-router-dom";
import { useDocument } from "../contexts/DocumentContext";
import { useState } from "react";
import { Button } from "./common/Button";

export const Inicio = () => {
  const [alerta, setAlerta] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const { setDocument } = useDocument();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputValue = (e.target as HTMLFormElement).document.value;
    if (inputValue === "") {
      setAlerta("Debe ingresar un número de documento");
    }
    if (inputValue) {
      setDocument(inputValue);
      navigate("/articles");
    }
  };

  return (
    <div className="flex flex-col justify-center ">
      <p className="text-4xl font-bold">Bienviend@</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <p className="text-[20px] font-semibold text-gray-900 mb-3">
          Para consultar los productos disponibles ingrese su número de
          identificación
        </p>
        <input
          type="text"
          value={inputValue}
          placeholder="Ingrese su número documento"
          className="w-2/4 border-1 border-solid rounded-2xl placeholder:text-center"
          name="document"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <p className="text-red-500 text-[16px] ">{alerta} </p>

        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

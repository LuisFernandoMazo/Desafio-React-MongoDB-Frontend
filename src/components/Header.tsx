import { useNavigate } from "react-router-dom";
import { Button } from "./common/Button";
import { useUserData } from "./hooks/useUser";
import { useDocument } from "./contexts/DocumentContext";
import { useUser } from "./contexts/UserContext";

export const Header = () => {
  const { dataUser, setDataUser } = useUserData(); // Datos del usuario
  const { setDocument } = useDocument(); // Obtiene documento del usuario
  const { setRole } = useUser(); // Obtiene el rol
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-gradient-to-b from-gray-800 to-gray-900 mb-1">
      <div className="ml-4 text-gray-400">
        {dataUser && (
          <div className="flex gap-4 justify-around items-center">
            <div>
              <p>
                Bienvenid@: {dataUser?.nombre}
                <p className="text-[12px]">correo: {dataUser?.email} </p>
                <p className="text-[12px] ">rol: {dataUser?.role} </p>{" "}
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                navigate("/inicio");
                setDocument("");
                setRole("");
                setDataUser(null);
              }}
              className="w-24 h-9"
            >
              Salir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import { Button } from "./common/Button";

// Componente del menú lateral
export const SideMenu = () => {
  const navigate = useNavigate();
  const { role } = useUser(); // Obtiene el rol del usuario desde el contexto

  // Elementos del menú con los roles permitidos para cada opción
  const menuItems = [
    {
      label: "Artículos",
      path: "/articles",
      roles: ["admin", "cliente"],
    },
    {
      label: "Precios Especiales",
      path: "/special-price",
      roles: ["admin"],
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-to-b from-gray-800 to-gray-900 pb-16">
      <div className="flex flex-col h-full items-center justify-end">
        <div className="flex flex-col w-full h-24 items-center text-white space-y-4">
          {role && (
            <span className="text-white font-medium border-b-2 border-solid">
              Menú de navegación{" "}
            </span>
          )}
          {menuItems.map((item) => {
            if (role && item.roles.includes(role)) {
              return (
                <>
                  <Button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="w-3/4 bg-gray-800 hover:bg-black/50 transition-colors px-4 py-2 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-white font-medium">{item.label}</span>
                  </Button>
                </>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

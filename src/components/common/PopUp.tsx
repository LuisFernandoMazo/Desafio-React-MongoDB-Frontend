import { useEffect, useState } from "react";

const Popup = ({
  mensaje,
  duracion = 3000,
}: {
  mensaje: string;
  duracion: number;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duracion);

    return () => clearTimeout(timer);
  }, [duracion]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800/40 bg-opacity-75 w-full h-full absolute"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto z-10">
        <p className="text-xl text-blue-950 font-bold">{mensaje}</p>
      </div>
    </div>
  );
};

export default Popup;

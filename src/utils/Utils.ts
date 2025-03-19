export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export function formatearPrecio(valor: string) {
  valor = valor.replace(/[^0-9.]/g, "");

  if (valor) {
    let [entero, decimal] = valor.split(".");
    entero = parseInt(entero).toLocaleString();

    if (decimal) {
      decimal = decimal.substring(0, 2);
      return `$${entero}.${decimal}`;
    }
    return `$${entero}`;
  }
  return "$0";
}

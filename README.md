# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# Proyecto: Desafío React / MongoDB

## **Introducción**

Este es el frontend de una aplicación de gestión de precios especiales, diseñada para interactuar con una API de backend que maneja productos, usuarios y precios especiales. La aplicación permite a los administradores gestionar precios especiales para los productos de acuerdo con ciertos usuarios, y a los clientes ver los productos con sus precios aplicados dependiendo de sus roles.

El frontend está desarrollado utilizando **React** y **Tailwind CSS** para un diseño responsivo y eficiente. La navegación entre las páginas está controlada por **React Router**, y las interacciones con la API se realizan a través de **Axios**.

## **Pasos para Ejecutar Localmente**

### 1. **Clonar el repositorio**

Clona este repositorio en tu máquina local:

```bash
git [clone https://github.com/tu-usuario/proyecto.git](https://github.com/LuisFernandoMazo/Desafio-React-MongoDB-Frontend.git)
cd nombre de la carpeta
```

## Frontend (React.js)

### Pasos para ejecutar localmente

1. **Instalar dependencias**:
   npm install

2. **Configuración de variables de entorno**
   Crear un archivo .env en la raíz del proyecto con las siguientes variables:
   REACT_APP_SERVER_URL=http://localhost:3000

4.**Ejecutar el frontend:**
npm run dev
➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help

## **Justificación de Elecciones Técnicas**

### **React**

Elegimos **React** para el desarrollo frontend debido a su eficiencia en la construcción de interfaces de usuario dinámicas y su amplia adopción en la comunidad de desarrollo. React nos permite crear componentes reutilizables y manejar el estado de la aplicación de manera eficiente.

### **Tailwind CSS**

**Tailwind CSS** fue elegido por su flexibilidad y su enfoque en la construcción de interfaces rápidas y responsivas. Con su enfoque utilitario, permite desarrollar interfaces sin la necesidad de escribir CSS personalizado, lo que acelera el desarrollo y mejora la mantenibilidad del código.

### **React Router**

**React Router** se utilizó para gestionar la navegación entre las diferentes vistas de la aplicación (por ejemplo, productos, precios especiales). Esto permite una experiencia de usuario fluida, sin recargar la página, y facilita la estructuración de la aplicación en rutas individuales.

### **Axios**

Se eligió **Axios** para las interacciones con la API debido a su facilidad de uso para realizar solicitudes HTTP. Axios nos permite realizar peticiones `GET`, `POST`, `PUT`, y `DELETE`, y manejar las respuestas de manera sencilla.

### **Context API**

Utilizamos la **Context API** de React para manejar el estado global, como el rol del usuario o el documento (ID), sin la necesidad de pasar props a través de múltiples niveles de componentes. Esto mejora la escalabilidad y mantenibilidad del proyecto.

### **Tailwind CSS y React Router**

Ambas tecnologías se integran bien con la estructura de componentes en React, y el uso de **Tailwind CSS** garantiza una experiencia visual limpia y responsiva sin complicar la lógica del componente.

### Descripción de la estructura del Proyecto

![alt text](image.png)

## **Descripción de las Carpetas**

- **`components/`**: Contiene componentes reutilizables como botones, campos de entrada (`Input`), y listas desplegables (`DropDown`), que son usados en varias partes de la aplicación.

- **`contexts/`**: Contiene los contextos de React (`UserContext` y `DocumentContext`), que manejan el estado global, como el rol del usuario y el documento.

- **`hooks/`**: Contiene los custom hooks que encapsulan la lógica de la aplicación, como la obtención de productos y usuarios (`useProductAndUsers`) o los datos de un usuario (`useUserData`).

- **`pages/`**: Contiene los componentes que corresponden a las páginas principales de la aplicación, como la página de artículos y la de precios especiales.

- **`utils/`**: Contiene funciones de utilidad, como `formatDate` para dar formato a las fechas y `formatearPrecio` para dar formato a los precios.

- **`App.tsx`**: Componente principal de la aplicación donde se configura la navegación y se incorporan las páginas.

- **`routes.ts`**: Define las rutas de la aplicación utilizando **React Router**, que se utilizan para navegar entre diferentes vistas de la aplicación.

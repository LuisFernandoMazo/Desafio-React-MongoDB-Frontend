import axios from "axios";
import {
  Article,
  PriceSpecial,
  Product,
  User,
} from "../../components/types/dto";
import { formatDate } from "../../utils/Utils";

const server = import.meta.env.VITE_SERVER_URL;
const endgetAllProducts = "api/products/getAllProducts";
const endgetUserByDocument = "api/users/getUserByDocument";
const endgetUsers = "api/users/getAllusers";
const endAddPrice = "api/priceSpecial/addPriceSpecial";
const endgetAllSpecialPrice = "api/priceSpecial/getAllPriceSpecial";
const endupdateSpecialPrice = "api/priceSpecial/updateSpecialPrice";

/**
 * Obtiene todos los productos de un usuario específico.
 * @param document - El identificador del usuario para obtener sus productos.
 * @returns Una lista de productos con la fecha de creación y actualización formateadas.
 */
export const articlesApi = async (document: string): Promise<Article[]> => {
  try {
    const { data } = await axios.get<Article[]>(
      `${server}${endgetAllProducts}/${document}`
    );

    const articlesData = data.map((article) => ({
      ...article,
      createdAt: formatDate(article.createdAt),
      updatedAt: formatDate(article.updatedAt),
    }));

    return articlesData;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los productos");
  }
};

/**
 * Obtiene los datos de un usuario a partir de su documento de identificación.
 * @param document - El identificador del usuario.
 * @returns Los datos del usuario.
 */
export const getUserApi = async (document: string): Promise<User> => {
  try {
    const { data } = await axios.get<User>(
      `${server}${endgetUserByDocument}/${document}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el usuario");
  }
};

/**
 * Obtiene todos los productos de la base de datos.
 * @returns Una lista de todos los productos.
 */
export const getAllProductsApi = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<Product[]>(
      `${server}${endgetAllProducts}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los productos");
  }
};

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns Una lista de todos los usuarios.
 */
export const getAllUsersApi = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<User[]>(`${server}${endgetUsers}`);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los usuarios");
  }
};

/**
 * Agrega un nuevo precio especial a la base de datos.
 * @param data - Los datos del nuevo precio especial.
 * @returns Los datos de la respuesta de la API después de agregar el precio especial.
 */
export const addNewPriceSpecialApi = async (data: PriceSpecial) => {
  try {
    const resp = await axios.post(`${server}${endAddPrice}`, data);

    return resp.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la solicitud");
  }
};

/**
 * Obtiene todos los precios especiales de la base de datos y los formatea.
 * @returns Una lista de precios especiales con datos de usuarios y productos relacionados.
 */
export const getAllSpecialPriceApi = async (): Promise<PriceSpecial[]> => {
  try {
    const [dataUsers, dataProducts] = await Promise.all([
      getAllUsersApi(),
      getAllProductsApi(),
    ]);

    const { data } = await axios.get<PriceSpecial[]>(
      `${server}${endgetAllSpecialPrice}`
    );

    if (!data) {
      throw new Error("No hay datos disponibles");
    }

    const newDataSpecial = data.map((item) => {
      const user = dataUsers.find((user) => user._id === item.userId);
      const product = dataProducts.find(
        (product) => product._id === item.productId
      );

      return {
        ...item,
        userId: user ? user.nombre : item.userId,
        productId: product ? product.name : item.productId,
        status: item.status === true ? "Activo" : "Inactivo",
        createAt: item.createAt && formatDate(item.createAt),
        endDate: formatDate(item.endDate),
        startDate: formatDate(item.startDate),
        updateLastAt: item.updateLastAt && formatDate(item.updateLastAt),
      };
    });

    return newDataSpecial;
  } catch (error) {
    console.error("Error al obtener precios especiales:", error);
    throw new Error("Error al obtener precios especiales");
  }
};

/**
 * Actualiza un precio especial existente en la base de datos.
 * @param params - Los datos del precio especial a actualizar.
 * @returns Los datos actualizados del precio especial.
 */
export const putUpdateSpecialPrice = async (
  params: Partial<PriceSpecial>
): Promise<PriceSpecial> => {
  try {
    const { data } = await axios.put<PriceSpecial>(
      `${server}${endupdateSpecialPrice}/${params._id}`,
      params
    );
    return data;
  } catch (error) {
    console.error("Error", error);
    throw new Error("Error al actualizar la información");
  }
};

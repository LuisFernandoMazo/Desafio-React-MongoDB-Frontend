export interface Article {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: string;
  description: string;
  brand: string;
  sku: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  nombre: string;
  email: string;
  identificacion: string;
  role: string;
  status: string;
}

export type UserRole = "cliente" | "admin" | "";

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: string;
  description: string;
  brand: string;
  sku: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
}

export interface PriceSpecial {
  _id?: string;
  userId: string;
  productId: string;
  specialPrice: string;
  startDate: string;
  endDate: string;
  createAt?: string;
  updateLastAt?: string;
  status: boolean | string;
}

export interface Column<T> {
  key: keyof T;
  label: string;
  type?: "text" | "readonly" | "select" | "date" | "money";
  options?: { value: boolean; label: string }[];
}

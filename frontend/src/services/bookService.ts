import api from "./api";
import type { Book } from "../types/book";

export async function getBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/books");

  return response.data;
}
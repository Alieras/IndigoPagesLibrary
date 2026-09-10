import api from "./api";
import type { Book } from "../types/book";

export async function getBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/books");
  return response.data;
}

export interface CreateBookData {
    isbn: string;
    title: string;
    description?: string;
    pageCount: number;
    publicationYear: number;
    language: string;
    publisherId: string;
    categoryId: string;
    coverImageUrl?: string;
    authorIds: string[];
}

export async function createBook(
    book: CreateBookData
): Promise<Book> {
    const response = await api.post<Book>("/books", book);

    return response.data;
}
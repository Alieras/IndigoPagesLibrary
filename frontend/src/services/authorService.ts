import api from "./api";

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  biography?: string;
  birthDate?: string;
}

export async function getAuthors(): Promise<Author[]> {
  const response = await api.get<Author[]>("/authors");
  return response.data;
}
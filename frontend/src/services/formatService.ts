import api from "./api";

export interface Format {
  id: string;
  name: string;
  description?: string;
}

export async function getFormats(): Promise<Format[]> {
  const response = await api.get<Format[]>("/formats");

  return response.data;
}
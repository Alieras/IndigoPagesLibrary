import api from "./api";

export interface Publisher {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    website?: string;
}

export async function getPublishers(): Promise<Publisher[]> {
    const response = await api.get<Publisher[]>("/publishers");
    return response.data;
}
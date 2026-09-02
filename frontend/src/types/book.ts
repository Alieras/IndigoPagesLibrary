export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  category: string;
  language: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  location?: string;
  coverImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
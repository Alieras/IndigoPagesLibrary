export interface BookFormData {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  pageCount: string;
  categoryIds: string[];
  format: string;
  language: string;
  description: string;
  totalCopies: string;
  location: string;
  coverImage: File | null;
}
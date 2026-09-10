export interface BookFormData {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  pageCount: string;
  category: string;
  language: string;
  description: string;
  totalCopies: string;
  location: string;
  coverImage: File | null;
}
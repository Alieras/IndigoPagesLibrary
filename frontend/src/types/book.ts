export interface BookAuthor {
  id: string;
  firstName: string;
  lastName: string;
  authorOrder: number;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  description?: string;
  pageCount: number;
  publicationYear: number;
  language: string;

  publisherId: string;
  publisherName: string;

  categoryId: string;
  categoryName: string;

  coverImageUrl?: string;

  authors: BookAuthor[];
}
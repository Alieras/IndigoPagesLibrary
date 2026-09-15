export interface BookAuthor {
  id: string;
  firstName: string;
  lastName: string;
  authorOrder: number;
}

export interface BookCategory {
  id: string;
  name: string;
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

  formatId: string;
  formatName: string;

  categories: BookCategory[];

  coverImageUrl?: string;

  authors: BookAuthor[];
}
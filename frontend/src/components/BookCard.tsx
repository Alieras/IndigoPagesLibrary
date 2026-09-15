import { BookOpen } from "lucide-react";
import type { Book } from "../types/book";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  const authorNames = book.authors
    .map((author) => `${author.firstName} ${author.lastName}`)
    .join(", ");

  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover */}
      <div className="flex h-52 items-center justify-center bg-[var(--color-surface-elevated)]">
        {book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={`Portada de ${book.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-32 w-24 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] shadow-md transition group-hover:scale-105">
            <BookOpen
              size={38}
              strokeWidth={1.6}
              className="text-[var(--color-secondary)]"
            />
          </div>
        )}
      </div>

      {/* Information */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="rounded-full bg-[var(--color-secondary)]/15 px-2.5 py-1 text-xs font-medium text-[var(--color-secondary)]">
            {book.categories.map((category) => category.name).join(" · ")}
          </span>

          <span className="text-xs text-[var(--color-text-muted)]">
            {book.publicationYear}
          </span>
        </div>

        <h3 className="line-clamp-2 font-semibold text-[var(--color-text)]">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {authorNames || "Autor no registrado"}
        </p>

        {/* Basic information */}
        <div className="mt-5 border-t border-[var(--color-border)] pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-muted)]">
              Editorial
            </span>

            <span className="max-w-[60%] truncate text-right text-xs font-medium text-[var(--color-text)]">
              {book.publisherName}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-muted)]">
              Idioma
            </span>

            <span className="text-xs font-medium text-[var(--color-text)]">
              {book.language}
            </span>
          </div>
        </div>

        {/* Detail action */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate(`/catalogo/${book.id}`)}
            className="w-full rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary-soft)]"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
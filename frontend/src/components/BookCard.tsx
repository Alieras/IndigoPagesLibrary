import { BookOpen, CheckCircle2 } from "lucide-react";
import type { Book } from "../types/book";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const isAvailable = book.availableCopies > 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover */}
      <div className="flex h-52 items-center justify-center bg-[var(--color-surface-elevated)]">
        <div className="flex h-32 w-24 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] shadow-md transition group-hover:scale-105">
          <BookOpen
            size={38}
            strokeWidth={1.6}
            className="text-[var(--color-secondary)]"
          />
        </div>
      </div>

      {/* Information */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="rounded-full bg-[var(--color-secondary)]/15 px-2.5 py-1 text-xs font-medium text-[var(--color-secondary)]">
            {book.category}
          </span>

          <span className="text-xs text-[var(--color-text-muted)]">
            {book.publicationYear}
          </span>
        </div>

        <h3 className="line-clamp-2 font-semibold text-[var(--color-text)]">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {book.author}
        </p>

        {/* Availability */}
        <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={17}
              className={
                isAvailable
                  ? "text-[var(--color-success)]"
                  : "text-[var(--color-danger)]"
              }
            />

            <span
              className={`text-sm font-medium ${
                isAvailable
                  ? "text-[var(--color-success)]"
                  : "text-[var(--color-danger)]"
              }`}
            >
              {isAvailable ? "Disponible" : "No disponible"}
            </span>
          </div>

          <span className="text-xs text-[var(--color-text-muted)]">
            {book.availableCopies}/{book.totalCopies}
          </span>
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
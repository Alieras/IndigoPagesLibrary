import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function BookDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="p-6 lg:p-8">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/catalogo")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
      >
        <ArrowLeft size={17} />
        Volver al catálogo
      </button>

      {/* Content */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Cover */}
          <div className="flex h-80 w-full shrink-0 items-center justify-center rounded-2xl bg-[var(--color-surface-elevated)] lg:w-56">
            <div className="flex h-48 w-36 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-primary)] shadow-md">
              <BookOpen
                size={52}
                strokeWidth={1.5}
                className="text-[var(--color-secondary)]"
              />
            </div>
          </div>

          {/* Information */}
          <div className="flex-1">
            <span className="inline-flex rounded-full bg-[var(--color-secondary)]/15 px-3 py-1 text-xs font-medium text-[var(--color-secondary)]">
              Libro
            </span>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Detalle del libro
            </h2>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              ID del libro: {id}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-[var(--color-text-muted)]">
                  Título
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                  Información pendiente
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[var(--color-text-muted)]">
                  Autor
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                  Información pendiente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetailsPage;
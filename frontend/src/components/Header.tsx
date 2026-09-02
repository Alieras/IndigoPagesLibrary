import {
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-end border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6">

      {/* Acciones */}
      <div className="flex items-center gap-2">

        {/* Notificaciones */}
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
        >
          <Bell size={19} strokeWidth={1.8} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Idioma */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-[var(--color-text-muted)] transition hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
        >
          <span>ES</span>

          <ChevronDown size={15} strokeWidth={1.8} />
        </button>

        {/* Usuario */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl px-2 transition hover:bg-[var(--color-background)]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
            <User size={17} strokeWidth={1.8} />
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium text-[var(--color-text)]">
              Administrador
            </p>

            <p className="text-xs text-[var(--color-text-muted)]">
              Administrador
            </p>
          </div>

          <ChevronDown
            size={15}
            strokeWidth={1.8}
            className="hidden text-[var(--color-text-muted)] lg:block"
          />
        </button>

      </div>
    </header>
  );
}

export default Header;

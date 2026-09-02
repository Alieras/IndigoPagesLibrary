import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Activar modo claro"
        aria-pressed={theme === "light"}
        className={`rounded-md p-2 transition ${
          theme === "light"
            ? "bg-[var(--color-primary)] text-white"
            : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
        }`}
      >
        <Sun size={18} />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="Usar tema del sistema"
        aria-pressed={theme === "system"}
        className={`rounded-md p-2 transition ${
          theme === "system"
            ? "bg-[var(--color-primary)] text-white"
            : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
        }`}
      >
        <Monitor size={18} />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Activar modo oscuro"
        aria-pressed={theme === "dark"}
        className={`rounded-md p-2 transition ${
          theme === "dark"
            ? "bg-[var(--color-primary)] text-white"
            : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
        }`}
      >
        <Moon size={18} />
      </button>
    </div>
  );
}
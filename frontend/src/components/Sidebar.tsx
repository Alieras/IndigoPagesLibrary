import {
  BarChart3,
  BookOpen,
  CircleHelp,
  LayoutDashboard,
  Library,
  Plus,
  Settings,
  Users,
  ArrowLeftRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navigationItems = [
  {
    label: "Panel de control",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Catálogo",
    path: "/catalogo",
    icon: BookOpen,
  },
  {
    label: "Circulación",
    path: "/circulation",
    icon: ArrowLeftRight,
  },
  {
    label: "Miembros",
    path: "/members",
    icon: Users,
  },
  {
    label: "Reportes",
    path: "/reports",
    icon: BarChart3,
  },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Logo */}
      <div className="border-b border-[var(--color-border)] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
            <Library size={20} />
          </div>

          <div>
            <h1 className="text-base font-bold text-[var(--color-text)]">
              Lexicon Lib
            </h1>

            <p className="text-xs text-[var(--color-text-muted)]">
              Gestión bibliotecaria
            </p>
          </div>
        </div>
      </div>

      {/* New Entry */}
      <div className="px-4 py-5">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
        >
          <Plus size={17} />
          Nuevo registro
        </button>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className="flex-1 px-4"
      >
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
          Principal
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--color-secondary)]/20 text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[var(--color-border)] px-4 py-4">
        <div className="mb-3 flex justify-center">
          <ThemeToggle />
        </div>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-[var(--color-secondary)]/20 text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
            }`
          }
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Configuración</span>
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-[var(--color-secondary)]/20 text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
            }`
          }
        >
          <CircleHelp size={18} strokeWidth={1.8} />
          <span>Ayuda</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  user: string;
  time: string;
  icon: LucideIcon;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "Libro prestado",
    description: "El nombre del viento",
    user: "María González",
    time: "Hace 10 min",
    icon: ArrowUpFromLine,
  },
  {
    id: 2,
    title: "Libro devuelto",
    description: "Cien años de soledad",
    user: "Carlos Rodríguez",
    time: "Hace 32 min",
    icon: ArrowDownToLine,
  },
  {
    id: 3,
    title: "Nuevo miembro",
    description: "Registro completado",
    user: "Ana Martínez",
    time: "Hace 1 h",
    icon: UserPlus,
  },
];

function RecentActivity() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text)]">
            Actividad reciente
          </h3>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Últimas actividades realizadas en la biblioteca.
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-medium text-[var(--color-primary)] transition hover:opacity-75"
        >
          Ver todo
        </button>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 px-6 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {activity.title}
                </p>

                <p className="mt-0.5 truncate text-sm text-[var(--color-text-muted)]">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {activity.user}
                </p>
              </div>

              <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;
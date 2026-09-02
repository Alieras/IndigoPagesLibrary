import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-shadow duration-200 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={
                trend.positive
                  ? "font-semibold text-green-600 dark:text-green-400"
                  : "font-semibold text-red-600 dark:text-red-400"
              }
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          )}

          {description && (
            <span className="text-[var(--color-text-muted)]">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;
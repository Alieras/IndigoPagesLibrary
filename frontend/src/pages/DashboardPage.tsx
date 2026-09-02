import {
  ArrowLeftRight,
  BookOpen,
  Users,
} from "lucide-react";

import RecentActivity from "../components/RecentActivity";
import StatCard from "../components/StatCard";

function DashboardPage() {
  return (
    <section className="p-6 lg:p-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
          Panel de control
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Resumen de las operaciones y actividad de la biblioteca.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total de libros"
          value="12,843"
          icon={BookOpen}
          trend={{
            value: "4.8%",
            positive: true,
          }}
          description="desde el mes pasado"
        />

        <StatCard
          title="Préstamos activos"
          value="1,284"
          icon={ArrowLeftRight}
          trend={{
            value: "2.4%",
            positive: true,
          }}
          description="desde el mes pasado"
        />

        <StatCard
          title="Miembros"
          value="3,492"
          icon={Users}
          trend={{
            value: "6.2%",
            positive: true,
          }}
          description="desde el mes pasado"
        />
      </div>

      {/* Contenido principal */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">

        {/* Actividad reciente */}
        <RecentActivity />

        {/* Estado del sistema */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h3 className="text-base font-semibold text-[var(--color-text)]">
            Estado del sistema
          </h3>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Estado actual de los servicios.
          </p>

          <div className="mt-6 space-y-4">

            {/* API */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">
                API
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Operativa
              </span>
            </div>

            {/* Base de datos */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">
                Base de datos
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Operativa
              </span>
            </div>

            {/* Almacenamiento */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">
                Almacenamiento
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Operativo
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
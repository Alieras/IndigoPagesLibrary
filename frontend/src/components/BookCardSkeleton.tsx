function BookCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Cover */}
      <div className="h-52 animate-pulse bg-[var(--color-surface-elevated)]" />

      {/* Information */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 animate-pulse rounded-full bg-[var(--color-border)]" />

          <div className="h-4 w-12 animate-pulse rounded bg-[var(--color-border)]" />
        </div>

        <div className="mt-4 h-5 w-4/5 animate-pulse rounded bg-[var(--color-border)]" />

        <div className="mt-2 h-4 w-2/5 animate-pulse rounded bg-[var(--color-border)]" />

        <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-border)]" />

          <div className="h-4 w-10 animate-pulse rounded bg-[var(--color-border)]" />
        </div>
      </div>
    </article>
  );
}

export default BookCardSkeleton;
import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartPanel({ title, subtitle, action, children, className }: PanelProps) {
  return (
    <section
      className={`card-elevated flex flex-col rounded-xl border border-border p-5 ${className ?? ""}`}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: { name?: string; fill?: string; color?: string };
}

export function DarkTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl">
      {label ? <p className="text-xs font-medium text-foreground">{label}</p> : null}
      {payload.map((entry, i) => (
        <p key={i} className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color || entry.payload?.fill || "var(--primary)" }}
          />
          <span className="text-foreground">
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            {suffix}
          </span>
        </p>
      ))}
    </div>
  );
}

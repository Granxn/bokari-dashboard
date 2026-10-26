import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  note: string;
  icon: LucideIcon;
}

export function KpiCard({ label, value, delta, trend, note, icon: Icon }: KpiCardProps) {
  return (
    <div className="card-elevated rounded-xl border border-border p-5 transition-colors duration-300 hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
            trend === "up"
              ? "border-success/25 bg-success/10 text-success"
              : "border-danger/25 bg-danger/10 text-danger",
          )}
        >
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta}
        </span>
      </div>
      <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-display text-4xl leading-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

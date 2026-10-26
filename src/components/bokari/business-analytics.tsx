import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarDays, BedDouble, Percent, Wallet, ChevronRight, type LucideIcon } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { ChartPanel, DarkTooltip } from "./chart-panel";
import {
  kpis,
  funnelData,
  channelData,
  occupancyData,
  leadTimeData,
  roomTypes,
} from "@/lib/mock-data";

const kpiIcons: LucideIcon[] = [CalendarDays, Percent, BedDouble, Wallet];

function ConversionFunnel() {
  const max = funnelData[0]?.value ?? 1;
  return (
    <ChartPanel
      title="Conversion Funnel"
      subtitle="Website visitors → successful bookings, last 30 days"
      action={
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          8.6% overall
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        {funnelData.map((row, i) => (
          <div key={row.stage} className="group">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                <span className="mr-2 text-[10px] text-muted-foreground/60">{i + 1}</span>
                {row.stage}
              </span>
              <span className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">{row.pct === 100 ? "—" : `${row.pct}% of visitors`}</span>
                <span className="font-semibold text-foreground">{row.value.toLocaleString()}</span>
              </span>
            </div>
            <div className="relative h-7 overflow-hidden rounded-md bg-secondary">
              <div
                className="flex h-full items-center rounded-md bg-gradient-to-r from-primary/80 to-primary pl-3 transition-all duration-500"
                style={{ width: `${Math.max((row.value / max) * 100, 8)}%` }}
              >
                <span className="text-[11px] font-semibold text-primary-foreground">
                  {row.pct === 100 ? "" : `${Math.round(((funnelData[i - 1]?.value ?? row.value) / row.value) * 100 / 10) / 10}× drop-off`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
        <ChevronRight className="h-3.5 w-3.5 text-primary" />
        Most drop-off happens at payment entry — 51.2% abandon before completing.
      </div>
    </ChartPanel>
  );
}

function BookingChannels() {
  const total = channelData.reduce((s, d) => s + d.value, 0);
  return (
    <ChartPanel title="Booking Channels" subtitle="Share of 1,284 bookings this month">
      <div className="relative mx-auto h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={channelData}
              dataKey="value"
              innerRadius={58}
              outerRadius={86}
              paddingAngle={3}
              cornerRadius={5}
              stroke="none"
            >
              {channelData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DarkTooltip suffix=" bookings" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl text-foreground">{total.toLocaleString()}</span>
          <span className="text-[10px] tracking-wider text-muted-foreground uppercase">bookings</span>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5">
        {channelData.map((entry) => (
          <li key={entry.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-semibold text-foreground">
              {Math.round((entry.value / total) * 100)}%
              <span className="ml-2 font-normal text-muted-foreground">{entry.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </ChartPanel>
  );
}

function OccupancyTrend() {
  return (
    <ChartPanel
      title="Occupancy Rate"
      subtitle="Daily occupancy over the last 14 days"
      action={
        <span className="text-xs font-semibold text-success">Peak 95.1% · Oct 25</span>
      }
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={occupancyData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="occupancyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={1}
            />
            <YAxis
              domain={[60, 100]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip content={<DarkTooltip suffix=" occupied" />} />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              fill="url(#occupancyFill)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--chart-1)", stroke: "var(--card)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartPanel>
  );
}

function LeadTime() {
  return (
    <ChartPanel title="Lead Time" subtitle="How far in advance guests book">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={leadTimeData} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <XAxis
              dataKey="range"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<DarkTooltip suffix=" bookings" />} cursor={{ fill: "var(--accent)" }} />
            <Bar dataKey="bookings" radius={[6, 6, 0, 0]} maxBarSize={44}>
              {leadTimeData.map((entry, i) => (
                <Cell
                  key={entry.range}
                  fill={i === 1 ? "var(--chart-1)" : "color-mix(in oklab, var(--chart-1) 35%, var(--card))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartPanel>
  );
}

function TopRoomTypes() {
  return (
    <ChartPanel title="Top Room Types" subtitle="Most booked rooms this month, with average daily rate">
      <div className="space-y-4">
        {roomTypes.map((room, i) => (
          <div key={room.name}>
            <div className="mb-1.5 flex items-baseline justify-between text-xs">
              <span className="flex items-center gap-2.5 font-medium text-foreground">
                <span className="font-display text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {room.name}
              </span>
              <span className="flex items-center gap-3">
                <span className="text-muted-foreground">ADR {room.adr}</span>
                <span className="font-semibold text-foreground">{room.bookings} bookings</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-500"
                style={{ width: `${(room.share / 32) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartPanel>
  );
}

export function BusinessAnalytics() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} icon={kpiIcons[i] ?? CalendarDays} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <ConversionFunnel />
        <BookingChannels />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OccupancyTrend />
        <LeadTime />
      </div>

      <TopRoomTypes />
    </div>
  );
}

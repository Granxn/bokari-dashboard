import {
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
import { PlayCircle, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartPanel, DarkTooltip } from "./chart-panel";
import { callStatusData, issueData, callLogs, type CallStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const totalCalls = callStatusData.reduce((s, d) => s + d.value, 0);

const statusStyle: Record<CallStatus, string> = {
  Success: "border-success/25 bg-success/10 text-success",
  Failed: "border-danger/25 bg-danger/10 text-danger",
  Dropped: "border-chart-5/25 bg-chart-5/10 text-chart-5",
  Transferred: "border-chart-2/25 bg-chart-2/10 text-chart-2",
};

function BotPerformance() {
  return (
    <ChartPanel
      title="Bot Performance"
      subtitle={`${totalCalls.toLocaleString()} interactions in the last 7 days`}
      action={
        <span className="flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
          <Radio className="h-3 w-3 animate-pulse" />
          Live
        </span>
      }
    >
      <div className="relative mx-auto h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={callStatusData}
              dataKey="value"
              innerRadius={58}
              outerRadius={86}
              paddingAngle={3}
              cornerRadius={5}
              stroke="none"
            >
              {callStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DarkTooltip suffix=" calls" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl text-success">68%</span>
          <span className="text-[10px] tracking-wider text-muted-foreground uppercase">success rate</span>
        </div>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {callStatusData.map((entry) => (
          <li key={entry.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-semibold text-foreground">
              {Math.round((entry.value / totalCalls) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </ChartPanel>
  );
}

function IssueTracking() {
  const max = issueData[0]?.count ?? 1;
  return (
    <ChartPanel title="Issue Tracking" subtitle="Frequency of error types, last 7 days">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={issueData}
            layout="vertical"
            margin={{ top: 4, right: 24, bottom: 0, left: 24 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="type"
              width={110}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<DarkTooltip suffix=" incidents" />} cursor={{ fill: "var(--accent)" }} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={18}>
              {issueData.map((entry, i) => (
                <Cell
                  key={entry.type}
                  fill={i === 0 ? "var(--danger)" : "color-mix(in oklab, var(--danger) 40%, var(--card))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 border-t border-border pt-3 text-xs text-muted-foreground">
        API Timeout is the top issue —{" "}
        <span className="font-semibold text-danger">184 incidents, 36% of all failed interactions</span>{" "}
        — investigate the payment gateway latency.
      </p>
    </ChartPanel>
  );
}

function CallChatLogs() {
  return (
    <section className="card-elevated rounded-xl border border-border">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Call &amp; Chat Log</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Recent bot interactions — newest first
          </p>
        </div>
        <Badge variant="outline" className="border-border bg-secondary text-xs text-muted-foreground">
          {callLogs.length} of 3,625 records
        </Badge>
      </header>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs text-muted-foreground">Date / Time</TableHead>
              <TableHead className="text-xs text-muted-foreground">User ID</TableHead>
              <TableHead className="text-xs text-muted-foreground">Channel</TableHead>
              <TableHead className="text-xs text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs text-muted-foreground">Error Category</TableHead>
              <TableHead className="text-xs text-muted-foreground">Duration</TableHead>
              <TableHead className="text-right text-xs text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.map((log) => (
              <TableRow key={`${log.time}-${log.user}`} className="border-border">
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{log.time}</TableCell>
                <TableCell className="font-mono text-xs text-foreground">{log.user}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{log.channel}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("text-[11px] font-medium", statusStyle[log.status])}
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {log.error ?? <span className="text-muted-foreground/50">—</span>}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{log.duration}</TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    title="Play call recording"
                    aria-label={`Play recording for ${log.user}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <PlayCircle className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export function BotOperations() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <BotPerformance />
        <IssueTracking />
      </div>
      <CallChatLogs />
    </div>
  );
}

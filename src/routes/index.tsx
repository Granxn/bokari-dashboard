import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AudioWaveform, BarChart3, Bot } from "lucide-react";
import { BusinessAnalytics } from "@/components/bokari/business-analytics";
import { BotOperations } from "@/components/bokari/bot-operations";
import { lastUpdated } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Tab = "analytics" | "operations";

const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
  { id: "analytics", label: "Business Analytics", icon: BarChart3 },
  { id: "operations", label: "Bot Operations", icon: Bot },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bokari — Hotel AI Voicebot Dashboard" },
      {
        name: "description",
        content:
          "Premium analytics and operations dashboard for the Bokari hotel AI voicebot: bookings, occupancy, revenue and live bot monitoring.",
      },
      { property: "og:title", content: "Bokari — Hotel AI Voicebot Dashboard" },
      {
        property: "og:description",
        content:
          "Business analytics and live bot operations for the Bokari hotel AI voicebot — bookings, occupancy, revenue and call monitoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<Tab>("analytics");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="glow-gold flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <AudioWaveform className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-xl tracking-wide text-foreground">Bokari</p>
              <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                Hotel AI Voicebot
              </p>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex rounded-full border border-border bg-secondary p-1">
            {tabs.map((t) => {
              const active = tab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm",
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_4px_16px_-4px_var(--primary)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Right meta */}
          <div className="hidden items-center gap-3 lg:flex">
            <span className="flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Bot online
            </span>
            <span className="text-xs text-muted-foreground">{lastUpdated}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div key={tab} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          {tab === "analytics" ? <BusinessAnalytics /> : <BotOperations />}
        </div>
      </main>

      <footer className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground">
          Bokari · Hotel AI Voicebot Dashboard · Data refreshed {lastUpdated}
        </p>
      </footer>
    </div>
  );
}

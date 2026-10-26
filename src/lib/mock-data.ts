// Mock data for the Bokari Hotel AI Voicebot dashboard.
// All figures are realistic sample values for a mid-size boutique hotel.

export const lastUpdated = "Oct 26, 2026 · 04:20 UTC";

export const kpis = [
  {
    label: "Total Bookings",
    value: "1,284",
    delta: "+12.4%",
    trend: "up" as const,
    note: "vs. last month",
  },
  {
    label: "Conversion Rate",
    value: "8.6%",
    delta: "+1.8 pts",
    trend: "up" as const,
    note: "visitors → bookings",
  },
  {
    label: "Occupancy Rate",
    value: "84.2%",
    delta: "-2.1 pts",
    trend: "down" as const,
    note: "last 7 nights",
  },
  {
    label: "Total Revenue",
    value: "$284.5K",
    delta: "+18.9%",
    trend: "up" as const,
    note: "vs. last month",
  },
];

export const funnelData = [
  { stage: "Website Visitors", value: 32460, pct: 100 },
  { stage: "Room Pages Viewed", value: 14210, pct: 43.8 },
  { stage: "Booking Started", value: 6180, pct: 19.0 },
  { stage: "Payment Details Entered", value: 3260, pct: 10.0 },
  { stage: "Successful Bookings", value: 2790, pct: 8.6 },
];

export const channelData = [
  { name: "Direct Website", value: 488, color: "var(--chart-1)" },
  { name: "Agoda", value: 308, color: "var(--chart-2)" },
  { name: "Booking.com", value: 269, color: "var(--chart-3)" },
  { name: "Walk-in", value: 219, color: "var(--chart-4)" },
];

export const occupancyData = [
  { day: "Oct 13", occupancy: 71.4 },
  { day: "Oct 14", occupancy: 73.8 },
  { day: "Oct 15", occupancy: 70.2 },
  { day: "Oct 16", occupancy: 76.5 },
  { day: "Oct 17", occupancy: 82.1 },
  { day: "Oct 18", occupancy: 88.7 },
  { day: "Oct 19", occupancy: 91.3 },
  { day: "Oct 20", occupancy: 86.9 },
  { day: "Oct 21", occupancy: 83.4 },
  { day: "Oct 22", occupancy: 80.2 },
  { day: "Oct 23", occupancy: 85.6 },
  { day: "Oct 24", occupancy: 92.8 },
  { day: "Oct 25", occupancy: 95.1 },
  { day: "Oct 26", occupancy: 84.2 },
];

export const leadTimeData = [
  { range: "0–3 days", bookings: 216 },
  { range: "4–7 days", bookings: 342 },
  { range: "8–14 days", bookings: 279 },
  { range: "15–30 days", bookings: 288 },
  { range: "30+ days", bookings: 159 },
];

export const roomTypes = [
  { name: "Deluxe Ocean View", bookings: 412, share: 32, adr: "$268" },
  { name: "Executive Suite", bookings: 287, share: 22, adr: "$412" },
  { name: "Garden Villa", bookings: 234, share: 18, adr: "$345" },
  { name: "Standard King", bookings: 196, share: 15, adr: "$154" },
  { name: "Family Suite", bookings: 155, share: 13, adr: "$386" },
];

export const callStatusData = [
  { name: "Success", value: 2465, color: "var(--success)" },
  { name: "Failed", value: 508, color: "var(--danger)" },
  { name: "Transferred to Human", value: 362, color: "var(--chart-2)" },
  { name: "Dropped", value: 290, color: "var(--chart-5)" },
];

export const issueData = [
  { type: "API Timeout", count: 184 },
  { type: "Voice Not Clear", count: 142 },
  { type: "Payment Failed", count: 98 },
  { type: "Language Mismatch", count: 47 },
  { type: "Booking Conflict", count: 37 },
];

export type CallStatus = "Success" | "Failed" | "Dropped" | "Transferred";

export const callLogs: {
  time: string;
  user: string;
  channel: "Voice Call" | "Chat";
  status: CallStatus;
  error?: string;
  duration: string;
}[] = [
  { time: "Oct 26 · 04:12", user: "guest_8412", channel: "Voice Call", status: "Success", duration: "2m 41s" },
  { time: "Oct 26 · 03:58", user: "guest_7733", channel: "Chat", status: "Success", duration: "1m 12s" },
  { time: "Oct 26 · 03:41", user: "guest_9021", channel: "Voice Call", status: "Failed", error: "API Timeout", duration: "0m 38s" },
  { time: "Oct 26 · 03:17", user: "guest_6584", channel: "Voice Call", status: "Transferred", error: "Payment Failed", duration: "3m 05s" },
  { time: "Oct 26 · 02:54", user: "guest_4110", channel: "Chat", status: "Success", duration: "0m 52s" },
  { time: "Oct 26 · 02:33", user: "guest_2291", channel: "Voice Call", status: "Failed", error: "Voice Not Clear", duration: "0m 44s" },
  { time: "Oct 26 · 01:58", user: "guest_8103", channel: "Voice Call", status: "Dropped", duration: "0m 09s" },
  { time: "Oct 26 · 01:20", user: "guest_5177", channel: "Voice Call", status: "Success", duration: "4m 18s" },
  { time: "Oct 25 · 23:47", user: "guest_3628", channel: "Chat", status: "Success", duration: "1m 36s" },
  { time: "Oct 25 · 22:15", user: "guest_9945", channel: "Voice Call", status: "Failed", error: "API Timeout", duration: "0m 31s" },
  { time: "Oct 25 · 21:02", user: "guest_7204", channel: "Voice Call", status: "Transferred", error: "Language Mismatch", duration: "2m 12s" },
  { time: "Oct 25 · 20:39", user: "guest_6058", channel: "Voice Call", status: "Success", duration: "3m 27s" },
];

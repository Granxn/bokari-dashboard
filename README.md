# Bokari — Hotel AI Voicebot Dashboard

**Live demo:** https://bokari-dashboard.lovable.app

A sales-demo dashboard for hotels that use an **AI voicebot** to take bookings and answer guests.
It answers the two questions a hotel owner asks after buying a voicebot:

1. **Is it helping the business?** → *Business Analytics* tab
2. **Is the bot working, and where does it fail?** → *Bot Operations* tab

Built during my Data Science co-op internship at **Botnoi Group** (Media & Events vertical) as a
pre-sales demo for the Bokari Hotel team.

> ⚠️ All figures are **mock data** for demonstration. No real guest or hotel data is used.

---

## ภาพรวม (Thai summary)

แดชบอร์ดเดโมสำหรับทีมขาย ใช้แสดงให้ลูกค้าโรงแรมเห็นว่า AI Voicebot สร้างผลลัพธ์ทางธุรกิจได้จริง
และช่วยให้รู้ว่าบอททำงานผิดพลาดตรงไหน โดยรวมผลทางธุรกิจ (ยอดจอง อัตราเข้าพัก รายได้) กับ
สุขภาพของบอท (อัตราสำเร็จ ประเภท error) ไว้ในหน้าเดียว

---

## Features

### Tab 1 — Business Analytics
| Section | What it shows | Why a hotel cares |
|---|---|---|
| KPI cards | Total bookings, website conversion, 7-night occupancy, room revenue | Month-at-a-glance health check |
| Conversion funnel | Direct-website visitors → room pages → booking started → payment → booked | Finds the step where guests drop off |
| Booking channels | Direct website vs. Agoda vs. Booking.com vs. walk-in | Shows OTA commission dependence |
| Occupancy (14 days) | Daily occupancy trend with peak | Pricing and staffing decisions |
| Lead time | How many days ahead guests book | Timing of promotions |
| Top room types | Bookings and ADR (average daily rate) per room type | Which rooms to promote or reprice |

### Tab 2 — Bot Operations
| Section | What it shows | Why a hotel cares |
|---|---|---|
| Bot performance | Success / failed / transferred to human / dropped | Is the bot doing its job? |
| Issue tracking | Error types ranked by frequency, with an auto-generated insight | What to fix first |
| Call & chat log | Recent interactions: channel, status, error, duration | Drill into individual cases |

### The story the demo tells
The funnel shows the **largest checkout drop-off between payment entry and a completed booking**,
and the bot's issue tracker shows **API timeouts** and **payment failures** as top errors.
Both views point at the same problem — the payment step — which is the kind of cross-view
insight a single dashboard makes visible.

---

## Metric definitions

All headline numbers are **derived from the raw mock data** in
[`src/lib/mock-data.ts`](src/lib/mock-data.ts), so the dashboard stays internally consistent.

| Metric | Formula |
|---|---|
| Total bookings | Σ bookings across all channels |
| Conversion rate | Successful website bookings ÷ website visitors |
| Occupancy (7 nights) | Mean of the last 7 daily occupancy values |
| Room revenue | Σ (bookings × ADR) per room type, one room-night per booking |
| Checkout drop-off | Largest `1 − next step ÷ previous step` after "Booking Started" |
| Top-issue share | Incidents of the top error ÷ all failed interactions |

Consistency rules the data follows:
- Funnel final stage = *Direct Website* bookings (the funnel tracks the website only).
- Channel totals = room-type totals = lead-time totals = total bookings.
- Error-type counts sum to the number of failed interactions.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript, TanStack Start / Router |
| Styling | Tailwind CSS v4, shadcn/ui components |
| Charts | Recharts |
| Icons | lucide-react |
| Build / test | Vite, Vitest |
| Built with | [Lovable](https://lovable.dev) (AI-assisted), synced to this repo |

### Project structure
```
src/
├── routes/index.tsx                     # Page shell: header, tab switch, footer
├── components/bokari/
│   ├── business-analytics.tsx           # Tab 1: KPIs, funnel, channels, occupancy, lead time, rooms
│   ├── bot-operations.tsx               # Tab 2: bot performance, issue tracking, call log
│   ├── kpi-card.tsx                     # Reusable KPI card
│   └── chart-panel.tsx                  # Reusable chart container + tooltip
└── lib/mock-data.ts                     # All mock data + derived metrics
```

---

## Roadmap — from demo to production
1. **Real data:** replace `mock-data.ts` with an API that reads voicebot call logs
   (e.g. Botnoi Voice) and the hotel's booking system (PMS).
2. **Date-range filter** and channel filter.
3. **Call recordings:** wire the ▶ button in the call log to recordings and transcripts.
4. **Alerts** when the failure rate or a single error type spikes.
5. **Bot ↔ booking attribution:** count bookings completed through the bot itself.

---

## Run locally
```sh
git clone https://github.com/Granxn/bokari-dashboard.git
cd bokari-dashboard
npm install
npm run dev
```

Changes pushed to `main` sync back into the Lovable editor automatically.

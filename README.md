# HelpDesk HQ — Platform Console

The **super-admin / platform-operator** console for HelpDesk — a separate platform from the
[tenant admin portal](https://github.com/Olanrewaju5/helpdesk-tenant-portal). This is where the
company that owns HelpDesk onboards and manages the **organizations** (tenants) that use it.

Built with **Vite + React**, reusing the tenant portal's black-and-white design system.

## Modules

- **Dashboard** — platform KPIs (organizations, MRR, platform-wide tickets, utilization), revenue chart, plan distribution, recently onboarded, accounts needing attention.
- **Organizations** — list with filters/sort + summary cards, an **Onboard organization** flow (org details, primary admin, plan, trial), and a detail view (usage vs limits, invoices, activity) with change-plan / suspend / reactivate.
- **Packages & plans** — define license tiers (limits + price) and see org counts and MRR per plan; create/edit.
- **Billing & subscriptions** — MRR / collected / outstanding / overdue stats and an invoice table with mark-paid.
- **Support inbox** — upgrade / capacity / billing requests from organizations, with resolve.
- **Reports** — growth, revenue, and utilization analytics with charts and top-org tables.
- **Audit trail** — platform-level event log with browser/OS/IP detail (resolved live), filterable & sortable.
- **Team & roles** — internal operators + a platform permission matrix.
- **Settings** — platform defaults (trial length, auto-suspend, capacity alerts).

The seeded organizations include **Peerless FinTech** (the tenant from the admin portal) plus ~10 others
across plans, statuses (Active / Trial / Past due / Suspended) and regions. Each org's "Open workspace"
links to the live tenant portal.

## Develop

```bash
npm install
npm run dev      # http://localhost:5175
npm run build
npm run preview
```

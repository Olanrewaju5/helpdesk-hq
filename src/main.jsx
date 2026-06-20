// HelpDesk HQ — Platform-operator console (super-admin).
// Separate app from the tenant portal; reuses the same black & white design system.

import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./styles.css";
const ReactDOM = ReactDOMClient;
const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext, Fragment } = React;
window.React = React;

const TENANT_APP_URL = "https://helpdesk-six-rho.vercel.app";

// ═══════════════════════════════════════════════════════════════════════════
// Icons
// ═══════════════════════════════════════════════════════════════════════════
const Icon = ({ name, size = 16, stroke = 1.6, ...rest }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", ...rest };
  switch (name) {
    case "dashboard": return <svg {...props}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>;
    case "building": return <svg {...props}><path d="M3 21h18"/><path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16"/><path d="M15 9h3a1 1 0 0 1 1 1v11"/><path d="M8 8h2M8 12h2M8 16h2"/></svg>;
    case "package": return <svg {...props}><path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5"/><path d="M12 12v9"/></svg>;
    case "card": return <svg {...props}><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/></svg>;
    case "inbox": return <svg {...props}><path d="M3 13h4l2 3h6l2-3h4"/><path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg>;
    case "chart": return <svg {...props}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case "shield": return <svg {...props}><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z"/></svg>;
    case "history": return <svg {...props}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>;
    case "settings": return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .4 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.4 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.4l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .4-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.4-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.4 1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.4l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.4 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"/></svg>;
    case "search": return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "bell": return <svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8Z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case "plus": return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "x": return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case "check": return <svg {...props}><path d="m5 12 5 5L20 7"/></svg>;
    case "chevron-down": return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case "chevron-up": return <svg {...props}><path d="m18 15-6-6-6 6"/></svg>;
    case "chevron-left": return <svg {...props}><path d="m15 6-6 6 6 6"/></svg>;
    case "chevron-right": return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case "arrow-right": return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-left": return <svg {...props}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case "arrow-up": return <svg {...props}><path d="M12 19V5M6 11l6-6 6 6"/></svg>;
    case "arrow-down": return <svg {...props}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case "more": return <svg {...props}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>;
    case "edit": return <svg {...props}><path d="M11 4H4v16h16v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>;
    case "archive": return <svg {...props}><rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/></svg>;
    case "trash": return <svg {...props}><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>;
    case "filter": return <svg {...props}><path d="M4 5h16M7 12h10M10 19h4"/></svg>;
    case "mail": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>;
    case "phone": return <svg {...props}><path d="M5 4h3l2 5-3 1.5a12 12 0 0 0 6.5 6.5L15 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case "globe": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "pin": return <svg {...props}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "logout": return <svg {...props}><path d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case "eye": return <svg {...props}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "eye-off": return <svg {...props}><path d="M3 3l18 18M10.6 10.6A2 2 0 0 0 14 14M9.9 5.1A9 9 0 0 1 22 12c-.5 1-1.2 2-2.1 2.9M6.6 6.6C4.4 8 3 10 2 12c0 0 3.5 7 10 7 1.9 0 3.6-.6 5-1.5"/></svg>;
    case "warning": return <svg {...props}><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v5M12 18v.5"/></svg>;
    case "info": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></svg>;
    case "check-circle": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
    case "user": return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case "users": return <svg {...props}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 19c0-3 2.9-5 6.5-5s6.5 2 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 18c0-2.2-2-3.6-4.5-3.6"/></svg>;
    case "ticket": return <svg {...props}><path d="M3 8.5V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a2 2 0 0 0 0 7V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a2 2 0 0 0 0-7Z"/><path d="M9 5v14"/></svg>;
    case "menu": return <svg {...props}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case "sidebar": return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>;
    case "send": return <svg {...props}><path d="M3 11 21 3l-8 18-2-8-8-2Z"/></svg>;
    case "external": return <svg {...props}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case "share": return <svg {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>;
    case "sparkles": return <svg {...props}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M18.4 5.6l-2 2M7.6 16.4l-2 2M18.4 18.4l-2-2M7.6 7.6l-2-2"/></svg>;
    case "download": return <svg {...props}><path d="M12 3v12M6 9l6 6 6-6M4 21h16"/></svg>;
    case "refresh": return <svg {...props}><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/></svg>;
    case "tag": return <svg {...props}><path d="m20 12-8 8a2 2 0 0 1-2.8 0L3 13.8a2 2 0 0 1-.5-1.3V5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.3.5L20 9.2a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1"/></svg>;
    case "lock": return <svg {...props}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
    case "pause": return <svg {...props}><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>;
    case "play": return <svg {...props}><path d="M7 4.5v15l13-7.5-13-7.5Z"/></svg>;
    case "trending-up": return <svg {...props}><path d="m3 17 6-6 4 4 8-8M14 7h7v7"/></svg>;
    case "rocket": return <svg {...props}><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2a2.8 2.8 0 0 0-3-3Z"/><path d="M9 12a14 14 0 0 1 8-9c2 0 4 2 4 4a14 14 0 0 1-9 8l-3-3Z"/><circle cx="15" cy="9" r="1.5"/></svg>;
    default: return null;
  }
};

const Logo = ({ size = 30 }) => (
  <span className="logo" style={{ width: size, height: size, background: "#000", color: "#fff" }}>
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V8l7-4 7 4v12"/><path d="M9 20v-5h6v5"/>
    </svg>
  </span>
);

const avatarPalette = ["#000000", "#1a1a1a", "#27272a", "#3f3f46", "#525252"];
const Avatar = ({ name, size = "md", style }) => {
  const initials = useMemo(() => { if (!name) return "?"; const p = name.trim().split(/\s+/); return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase(); }, [name]);
  const bg = useMemo(() => { if (!name) return "#525252"; let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff; return avatarPalette[Math.abs(h) % avatarPalette.length]; }, [name]);
  return <span className={`avatar ${size === "md" ? "" : size}`} style={{ background: bg, ...style }} title={name}>{initials}</span>;
};

const statusClass = (s) => {
  const k = (s || "").toLowerCase();
  if (k === "active" || k === "paid") return "badge-active";
  if (k === "archived") return "badge-archived";
  if (k === "suspended") return "badge-suspended";
  if (k === "trial" || k === "trialing") return "badge-trial";
  if (k === "past due" || k === "expiring") return "badge-expiring";
  if (k === "overdue" || k === "unpaid") return "badge-unpaid";
  if (k === "open" || k === "new") return "badge-open";
  if (k === "in progress" || k === "in-progress") return "badge-in-progress";
  if (k === "pending") return "badge-pending";
  if (k === "resolved" || k === "closed") return "badge-resolved";
  if (k === "high" || k === "critical") return "badge-high";
  if (k === "medium") return "badge-medium";
  if (k === "low") return "badge-low";
  if (k === "enterprise") return "badge-new";
  if (k === "scale") return "badge-medium";
  if (k === "growth") return "badge-low";
  if (k === "starter") return "badge-soft";
  if (k === "warning") return "badge-warning";
  return "badge-soft";
};
const Badge = ({ children, status, className = "", dot = false }) => (
  <span className={`badge ${statusClass(status || children)} ${dot ? "dot" : ""} ${className}`}>{children}</span>
);

const Button = ({ variant = "primary", size = "md", icon, iconRight, children, className = "", block, ...rest }) => {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : size === "xs" ? "btn-xs" : ""} ${block ? "btn-block" : ""} ${className}`;
  return <button className={cls.trim()} {...rest}>{icon ? <Icon name={icon} size={size === "sm" ? 14 : 16}/> : null}{children}{iconRight ? <Icon name={iconRight} size={14}/> : null}</button>;
};

const Card = ({ title, action, children, pad = true, className = "", style }) => (
  <div className={`card ${className}`} style={style}>
    {title || action ? <div className="card-hd">{typeof title === "string" ? <h3>{title}</h3> : title}{action}</div> : null}
    {pad ? <div className="card-bd">{children}</div> : children}
  </div>
);

const ProgressBar = ({ value, max, label, unit = "", showPct = true }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const tone = pct >= 90 ? "danger" : pct >= 75 ? "warn" : "";
  return (
    <div style={{ marginBottom: 10 }}>
      {label ? <div className="prog-row"><p className="label">{label}</p><span className="vals mono">{value.toLocaleString()} / {max.toLocaleString()}{unit}</span></div> : null}
      <div className={`prog ${tone}`}><div className="bar" style={{ width: pct + "%" }}/></div>
      {showPct ? <div className="prog-pct mono">{pct}%</div> : null}
    </div>
  );
};

const Modal = ({ open, onClose, title, children, actions, wide }) => {
  useEffect(() => { if (!open) return; const onKey = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={wide ? { width: "min(640px, calc(100vw - 32px))" } : undefined}>
        {title ? <h2>{title}</h2> : null}{children ? <div>{children}</div> : null}{actions ? <div className="modal-actions">{actions}</div> : null}
      </div>
    </div>
  );
};

const ToastCtx = createContext(null);
const useToast = () => useContext(ToastCtx);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((t) => { const id = Date.now() + Math.random(); setToasts((a) => [...a, { id, ...t }]); setTimeout(() => setToasts((a) => a.filter((x) => x.id !== id)), t.duration || 4000); }, []);
  const api = useMemo(() => ({ success: (msg, title) => push({ kind: "success", msg, title }), error: (msg, title) => push({ kind: "error", msg, title }), info: (msg, title) => push({ kind: "info", msg, title }) }), [push]);
  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toast-stack">{toasts.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`}>
          <span className="toast-icon"><Icon name={t.kind === "success" ? "check-circle" : t.kind === "error" ? "warning" : "info"} size={18} stroke={1.8}/></span>
          <div className="toast-body">{t.title ? <b>{t.title}</b> : null}<div className="msg">{t.msg}</div></div>
        </div>
      ))}</div>
    </ToastCtx.Provider>
  );
};

const useClickAway = (ref, onAway) => { useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onAway(); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, [ref, onAway]); };

const KebabMenu = ({ items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickAway(ref, () => setOpen(false));
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button className="kebab-btn" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} aria-label="More actions"><Icon name="more" size={16}/></button>
      {open ? (
        <div className="dropdown" style={{ right: 0, top: "100%", marginTop: 4 }}>
          {items.map((it, i) => it.sep ? <div key={i} className="dropdown-sep"/> : (
            <div key={i} className={`ddi ${it.destructive ? "destructive" : ""}`} onClick={(e) => { e.stopPropagation(); setOpen(false); it.onClick && it.onClick(); }}>{it.icon ? <Icon name={it.icon} size={14}/> : null}<span>{it.label}</span></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const Sparkline = ({ data, color = "var(--chart-1)", w = 80, h = 28, fill = true }) => {
  if (!data || !data.length) return null;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / range) * (h - 4) - 2]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = d + ` L${w} ${h} L0 ${h} Z`;
  const gid = useMemo(() => "spk" + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs><linearGradient id={gid} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      {fill ? <path d={area} fill={`url(#${gid})`}/> : null}
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const LineChart = ({ data, w = 700, h = 220 }) => {
  const pad = { l: 44, r: 16, t: 16, b: 28 };
  const max = Math.max(...data.values), min = Math.min(...data.values), range = max - min || 1;
  const innerW = w - pad.l - pad.r, innerH = h - pad.t - pad.b;
  const pts = data.values.map((v, i) => [pad.l + (i / (data.values.length - 1)) * innerW, pad.t + innerH - ((v - min) / range) * innerH]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = d + ` L${pts[pts.length - 1][0]} ${h - pad.b} L${pts[0][0]} ${h - pad.b} Z`;
  const ticks = 4, tipIdx = Math.floor(data.values.length * 0.62), tip = pts[tipIdx];
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <defs><linearGradient id="hqlc" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.22"/><stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0"/></linearGradient></defs>
      {Array.from({ length: ticks + 1 }).map((_, i) => { const y = pad.t + (i / ticks) * innerH; const val = Math.round(max - (i / ticks) * range); return (<g key={i}><line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4"/><text x={pad.l - 6} y={y + 3} fontSize="10" fill="var(--text-muted)" textAnchor="end" fontFamily="Geist Mono">{val.toLocaleString()}</text></g>); })}
      <path d={area} fill="url(#hqlc)"/>
      <path d={d} fill="none" stroke="var(--chart-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.labels.map((l, i) => i % Math.ceil(data.labels.length / 6) === 0 ? <text key={i} x={pts[i][0]} y={h - 8} fontSize="10.5" fill="var(--text-muted)" textAnchor="middle">{l}</text> : null)}
      {tip ? (<g><circle cx={tip[0]} cy={tip[1]} r="5" fill="var(--chart-1)" stroke="#fff" strokeWidth="2"/><g transform={`translate(${tip[0] - 60}, ${Math.max(8, tip[1] - 44)})`}><rect width="120" height="34" rx="6" fill="#000"/><text x="10" y="14" fill="rgba(255,255,255,0.7)" fontSize="10">{data.labels[tipIdx]}</text><text x="10" y="28" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Geist Mono">{data.values[tipIdx].toLocaleString()} {data.unit || ""}</text></g></g>) : null}
    </svg>
  );
};

const BarChart = ({ data, max, colors = ["var(--chart-1)"], height = 200 }) => {
  const _max = max || Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)));
  return (
    <div className="bar-chart" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="bar-col">
          <div style={{ width: "100%", maxWidth: 40, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", width: "100%" }}>
              {d.values.map((v, j) => <div key={j} className="bar" title={`${d.label}: ${v}`} style={{ background: colors[j] || colors[0], height: ((v / _max) * (height - 28)) + "px", borderRadius: j === d.values.length - 1 ? "6px 6px 0 0" : 0, width: "100%", minHeight: v > 0 ? 4 : 0 }}/>)}
            </div>
          </div>
          <div className="bar-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, trend, trendDir, sparkData, sparkColor, sub }) => (
  <div className="stat-card">
    <p className="stat-label">{label}</p>
    <div className="stat-value">{value}</div>
    {trend ? <div className={`stat-meta trend-${trendDir || "flat"}`}>{trendDir === "up" ? <Icon name="arrow-up" size={12} stroke={2}/> : trendDir === "down" ? <Icon name="arrow-down" size={12} stroke={2}/> : null}<span>{trend}</span></div> : sub ? <div className="stat-meta">{sub}</div> : null}
    {sparkData ? <div className="stat-spark"><Sparkline data={sparkData} color={sparkColor || "var(--chart-1)"} w={68} h={28}/></div> : null}
  </div>
);

const Pagination = ({ page, totalPages, onPage, summary }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid var(--border)", background: "#fff", fontSize: 12.5, color: "var(--text-muted)" }}>
    <span>{summary}</span>
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => onPage(page - 1)} style={{ height: 28 }}><Icon name="chevron-left" size={14}/></button>
      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => { const p = i + 1; return <button key={p} className={`btn ${p === page ? "btn-primary" : "btn-ghost"} btn-sm`} onClick={() => onPage(p)} style={{ minWidth: 28, padding: "0 8px", height: 28 }}>{p}</button>; })}
      <button className="btn btn-ghost btn-sm" disabled={page === totalPages} onClick={() => onPage(page + 1)} style={{ height: 28 }}><Icon name="chevron-right" size={14}/></button>
    </div>
  </div>
);

const EmptyState = ({ icon = "building", title, desc, action }) => (
  <div className="empty"><div className="empty-icon"><Icon name={icon} size={28}/></div><h3>{title}</h3>{desc ? <p>{desc}</p> : null}{action || null}</div>
);

// ── Hash router ──────────────────────────────────────────────────────────────
const useHashRoute = (initial = "/") => {
  const parse = () => window.location.hash.replace(/^#/, "") || initial;
  const [route, setRoute] = useState(parse);
  useEffect(() => { const h = () => setRoute(parse()); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h); }, []);
  return [route, useCallback((to) => { window.location.hash = to; }, [])];
};
const matchRoute = (pattern, path) => {
  const pp = pattern.split("/").filter(Boolean), ap = path.split("/").filter(Boolean);
  if (pp.length !== ap.length) return null;
  const params = {};
  for (let i = 0; i < pp.length; i++) { if (pp[i].startsWith(":")) params[pp[i].slice(1)] = decodeURIComponent(ap[i]); else if (pp[i] !== ap[i]) return null; }
  return params;
};
const fmtDate = (d) => { if (typeof d === "string") d = new Date(d); const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return `${String(d.getDate()).padStart(2,"0")} ${m[d.getMonth()]} ${d.getFullYear()}`; };
const fmtTime = (d) => { if (typeof d === "string") d = new Date(d); return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };
const money = (n) => "$" + Number(n).toLocaleString();

// ── Sortable / filterable table header (fixed-position menus) ────────────────
const Th = ({ label, sortKey, sort, onSort, filter }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const ref = useRef(); const btnRef = useRef();
  useClickAway(ref, () => setOpen(false));
  useEffect(() => { if (!open) return; const close = () => setOpen(false); window.addEventListener("resize", close); window.addEventListener("scroll", close, true); return () => { window.removeEventListener("resize", close); window.removeEventListener("scroll", close, true); }; }, [open]);
  const isSorted = sortKey && sort.key === sortKey;
  const isFiltered = filter && filter.value !== filter.all;
  const toggle = () => { if (open) { setOpen(false); return; } const r = btnRef.current.getBoundingClientRect(); setPos({ top: r.bottom + 6, right: Math.max(8, window.innerWidth - r.right) }); setOpen(true); };
  return (
    <div className="th-inner">
      <button type="button" className={`th-sort ${isSorted ? "active" : ""}`} onClick={() => sortKey && onSort(sortKey)} style={{ cursor: sortKey ? "pointer" : "default" }}>
        <span>{label}</span>
        {sortKey ? <Icon name={isSorted ? (sort.dir === "asc" ? "chevron-up" : "chevron-down") : "arrow-down"} size={11} style={{ opacity: isSorted ? 0.9 : 0.25 }}/> : null}
      </button>
      {filter ? (
        <span ref={ref} style={{ display: "inline-flex" }}>
          <button ref={btnRef} type="button" className={`th-filter ${isFiltered ? "on" : ""}`} onClick={toggle} title="Filter"><Icon name="filter" size={12}/>{isFiltered ? <span className="th-filter-dot"/> : null}</button>
          {open ? (
            <div className="dropdown" style={{ position: "fixed", top: pos.top, right: pos.right, marginTop: 0, minWidth: 180, maxHeight: 280, overflow: "auto" }}>
              {filter.options.map((o) => { const val = typeof o === "string" ? o : o.value; const lbl = typeof o === "string" ? o : o.label; return <div key={val} className={`ddi ${filter.value === val ? "sel" : ""}`} onClick={() => { filter.set(val); setOpen(false); }}>{lbl}</div>; })}
            </div>
          ) : null}
        </span>
      ) : null}
    </div>
  );
};

// ── Session fingerprint for the audit trail ──────────────────────────────────
const parseUA = (ua = "") => {
  let browser = "Unknown browser";
  if (/Edg\//.test(ua)) browser = "Edge"; else if (/OPR\/|Opera/.test(ua)) browser = "Opera"; else if (/Chrome\//.test(ua)) browser = "Chrome"; else if (/Firefox\//.test(ua)) browser = "Firefox"; else if (/Safari\//.test(ua)) browser = "Safari";
  let os = "Unknown OS";
  if (/Windows NT/.test(ua)) os = "Windows"; else if (/Mac OS X/.test(ua)) os = "macOS"; else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS"; else if (/Android/.test(ua)) os = "Android"; else if (/Linux/.test(ua)) os = "Linux";
  return { browser, os };
};
const _session = (() => { const ua = typeof navigator !== "undefined" ? navigator.userAgent : ""; const { browser, os } = parseUA(ua); return { browser, os, ip: "Resolving…", location: "This session" }; })();
if (typeof fetch === "function") { fetch("https://api.ipify.org?format=json").then((r) => r.json()).then((d) => { if (d && d.ip) _session.ip = d.ip; }).catch(() => { _session.ip = `41.${58 + Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`; }); }
let _auditSeq = 7000;
const tsNow = () => `${fmtDate(new Date())}, ${fmtTime(new Date())}`;
const auditEntry = (action, target, type, actor = "Tunde Bakare") => ({ id: "EVT-" + (++_auditSeq), ts: tsNow(), actor, action, target: target || null, type, browser: _session.browser, os: _session.os, ip: _session.ip, location: _session.location });
const _BROWSERS = ["Chrome", "Safari", "Firefox", "Edge"]; const _OSES = ["macOS", "Windows", "Linux"]; const _LOCS = ["Lagos, NG", "Nairobi, KE", "Cape Town, ZA", "Accra, GH"];
const hashStr = (s = "") => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff; return h; };
const sourceFor = (a) => {
  if (a.ip && a.ip !== "Resolving…") return { browser: a.browser, os: a.os, ip: a.ip, location: a.location };
  if (a.actor === "System") return { browser: "Automation", os: "Server", ip: "10.0.0.4 (internal)", location: "HelpDesk data centre" };
  const h = hashStr(a.actor + a.id);
  return { browser: a.browser || _BROWSERS[h % _BROWSERS.length], os: a.os || _OSES[(h >> 2) % _OSES.length], ip: a.ip || `41.${58 + (h % 9)}.${(h >> 3) % 250}.${(h >> 7) % 250}`, location: a.location || _LOCS[(h >> 5) % _LOCS.length] };
};

// ═══════════════════════════════════════════════════════════════════════════
// Data store
// ═══════════════════════════════════════════════════════════════════════════
const PACKAGES = [
  { id: "PKG-STARTER", name: "Starter", price: 99, desc: "Small teams getting started.", limits: { customers: 5, tickets: 500, users: 3, products: 1 } },
  { id: "PKG-GROWTH", name: "Growth", price: 349, desc: "Growing support operations.", limits: { customers: 12, tickets: 1200, users: 6, products: 3 } },
  { id: "PKG-SCALE", name: "Scale", price: 699, desc: "High-volume, multi-product support.", limits: { customers: 18, tickets: 1800, users: 8, products: 4 } },
  { id: "PKG-ENTERPRISE", name: "Enterprise", price: 1200, desc: "Custom limits, priority SLAs.", limits: { customers: 25, tickets: 2000, users: 10, products: 5 } },
];

const usage = (c, ct, u, ut, us, ust, p, pt) => ({ customers: { used: c, limit: ct }, tickets: { used: u, limit: ut }, users: { used: us, limit: ust }, products: { used: p, limit: pt } });

const ORGS = [
  { id: "ORG-1001", name: "Peerless FinTech", code: "PRL-001", package: "Enterprise", status: "Active", billing: "Paid", region: "Lagos, NG", admin: "Nnamdi Eze", adminEmail: "nnamdi@peerless.io", mrr: 1200, created: "15 Jan 2025", renews: "31 Dec 2026", ticketsAll: 1420, usage: usage(18, 25, 1420, 2000, 9, 10, 4, 5) },
  { id: "ORG-1002", name: "Kowri Africa", code: "KWR-014", package: "Scale", status: "Active", billing: "Paid", region: "Accra, GH", admin: "Ama Mensah", adminEmail: "ama@kowri.app", mrr: 699, created: "02 Feb 2025", renews: "02 Feb 2026", ticketsAll: 980, usage: usage(14, 18, 1340, 1800, 7, 8, 4, 4) },
  { id: "ORG-1003", name: "Sterling Microfinance", code: "STR-008", package: "Growth", status: "Active", billing: "Paid", region: "Lagos, NG", admin: "Yetunde Bello", adminEmail: "yetunde@sterlingmfb.ng", mrr: 349, created: "20 Feb 2025", renews: "20 Feb 2026", ticketsAll: 540, usage: usage(9, 12, 980, 1200, 5, 6, 2, 3) },
  { id: "ORG-1004", name: "Quantum MFB", code: "QNT-021", package: "Growth", status: "Trial", billing: "Trialing", region: "Abuja, NG", admin: "Sade Ojo", adminEmail: "sade@quantummfb.com", mrr: 0, created: "08 May 2026", renews: "22 May 2026", ticketsAll: 210, usage: usage(4, 12, 210, 1200, 3, 6, 1, 3) },
  { id: "ORG-1005", name: "Nimbus Pay", code: "NMB-033", package: "Scale", status: "Past due", billing: "Overdue", region: "Nairobi, KE", admin: "Daniel Kimani", adminEmail: "daniel@nimbuspay.co", mrr: 699, created: "11 Mar 2025", renews: "11 Mar 2026", ticketsAll: 1610, usage: usage(16, 18, 1700, 1800, 8, 8, 4, 4) },
  { id: "ORG-1006", name: "Baobab Health", code: "BAO-006", package: "Starter", status: "Active", billing: "Paid", region: "Kampala, UG", admin: "Grace Achieng", adminEmail: "grace@baobabhealth.org", mrr: 99, created: "01 Apr 2025", renews: "01 Apr 2026", ticketsAll: 120, usage: usage(3, 5, 120, 500, 2, 3, 1, 1) },
  { id: "ORG-1007", name: "Zenith Logistics", code: "ZEN-002", package: "Enterprise", status: "Active", billing: "Paid", region: "Johannesburg, ZA", admin: "Thabo Nkosi", adminEmail: "thabo@zenithlog.co.za", mrr: 1200, created: "18 Jan 2025", renews: "18 Jan 2026", ticketsAll: 1880, usage: usage(22, 25, 1880, 2000, 9, 10, 5, 5) },
  { id: "ORG-1008", name: "Sahel Insure", code: "SAH-040", package: "Growth", status: "Suspended", billing: "Unpaid", region: "Dakar, SN", admin: "Fatou Diop", adminEmail: "fatou@sahelinsure.sn", mrr: 0, created: "14 Dec 2024", renews: "14 Dec 2025", ticketsAll: 430, usage: usage(0, 12, 0, 1200, 0, 6, 0, 3) },
  { id: "ORG-1009", name: "Pesa Cloud", code: "PSA-051", package: "Scale", status: "Trial", billing: "Trialing", region: "Nairobi, KE", admin: "Brian Otieno", adminEmail: "brian@pesacloud.io", mrr: 0, created: "01 May 2026", renews: "15 May 2026", ticketsAll: 320, usage: usage(6, 18, 320, 1800, 4, 8, 2, 4) },
  { id: "ORG-1010", name: "Cairo Remit", code: "CAI-019", package: "Starter", status: "Active", billing: "Paid", region: "Cairo, EG", admin: "Mariam Hassan", adminEmail: "mariam@cairoremit.com", mrr: 99, created: "26 Mar 2025", renews: "26 Mar 2026", ticketsAll: 410, usage: usage(4, 5, 410, 500, 3, 3, 1, 1) },
  { id: "ORG-1011", name: "Lumen Bank", code: "LMN-003", package: "Enterprise", status: "Active", billing: "Paid", region: "Lagos, NG", admin: "Chuka Obi", adminEmail: "chuka@lumenbank.ng", mrr: 1200, created: "22 Jan 2025", renews: "22 Jan 2026", ticketsAll: 1100, usage: usage(12, 25, 1100, 2000, 6, 10, 3, 5) },
];

const INVOICES = [
  { id: "INV-2041", orgId: "ORG-1007", org: "Zenith Logistics", package: "Enterprise", amount: 1200, status: "Paid", date: "01 May 2026" },
  { id: "INV-2040", orgId: "ORG-1001", org: "Peerless FinTech", package: "Enterprise", amount: 1200, status: "Paid", date: "01 May 2026" },
  { id: "INV-2039", orgId: "ORG-1005", org: "Nimbus Pay", package: "Scale", amount: 699, status: "Overdue", date: "28 Apr 2026" },
  { id: "INV-2038", orgId: "ORG-1002", org: "Kowri Africa", package: "Scale", amount: 699, status: "Paid", date: "01 May 2026" },
  { id: "INV-2037", orgId: "ORG-1011", org: "Lumen Bank", package: "Enterprise", amount: 1200, status: "Paid", date: "01 May 2026" },
  { id: "INV-2036", orgId: "ORG-1003", org: "Sterling Microfinance", package: "Growth", amount: 349, status: "Paid", date: "01 May 2026" },
  { id: "INV-2035", orgId: "ORG-1008", org: "Sahel Insure", package: "Growth", amount: 349, status: "Overdue", date: "14 Apr 2026" },
  { id: "INV-2034", orgId: "ORG-1006", org: "Baobab Health", package: "Starter", amount: 99, status: "Paid", date: "01 Apr 2026" },
  { id: "INV-2033", orgId: "ORG-1010", org: "Cairo Remit", package: "Starter", amount: 99, status: "Due", date: "26 Apr 2026" },
  { id: "INV-2032", orgId: "ORG-1005", org: "Nimbus Pay", package: "Scale", amount: 699, status: "Paid", date: "11 Mar 2026" },
  { id: "INV-2031", orgId: "ORG-1001", org: "Peerless FinTech", package: "Enterprise", amount: 1200, status: "Paid", date: "01 Apr 2026" },
  { id: "INV-2030", orgId: "ORG-1002", org: "Kowri Africa", package: "Scale", amount: 699, status: "Paid", date: "01 Apr 2026" },
];

const SUPPORT = [
  { id: "REQ-512", orgId: "ORG-1007", org: "Zenith Logistics", type: "Capacity", subject: "Approaching customer & ticket limits — need a bump", priority: "High", status: "Open", created: "25 May 2026" },
  { id: "REQ-511", orgId: "ORG-1001", org: "Peerless FinTech", type: "Upgrade", subject: "Requesting additional user seats", priority: "Medium", status: "Open", created: "24 May 2026" },
  { id: "REQ-510", orgId: "ORG-1005", org: "Nimbus Pay", type: "Billing", subject: "Invoice INV-2039 dispute", priority: "High", status: "Open", created: "23 May 2026" },
  { id: "REQ-509", orgId: "ORG-1004", org: "Quantum MFB", type: "Upgrade", subject: "Convert trial to Growth plan", priority: "Medium", status: "Open", created: "22 May 2026" },
  { id: "REQ-508", orgId: "ORG-1010", org: "Cairo Remit", type: "Capacity", subject: "User limit reached — add 2 seats", priority: "Medium", status: "Open", created: "21 May 2026" },
  { id: "REQ-507", orgId: "ORG-1003", org: "Sterling Microfinance", type: "Issue", subject: "SSO configuration help", priority: "Low", status: "Resolved", created: "19 May 2026" },
  { id: "REQ-506", orgId: "ORG-1002", org: "Kowri Africa", type: "Upgrade", subject: "Move to Enterprise next cycle", priority: "Low", status: "Resolved", created: "16 May 2026" },
  { id: "REQ-505", orgId: "ORG-1009", org: "Pesa Cloud", type: "Issue", subject: "Onboarding data import question", priority: "Low", status: "Resolved", created: "12 May 2026" },
];

const OPERATORS = [
  { name: "Tunde Bakare", email: "tunde@helpdesk.io", role: "Platform Owner", status: "Active", created: "02 Jan 2025" },
  { name: "Amara Eze", email: "amara@helpdesk.io", role: "Platform Admin", status: "Active", created: "05 Jan 2025" },
  { name: "Kwame Osei", email: "kwame@helpdesk.io", role: "Billing Manager", status: "Active", created: "10 Jan 2025" },
  { name: "Lerato Khumalo", email: "lerato@helpdesk.io", role: "Support Lead", status: "Active", created: "18 Jan 2025" },
  { name: "Ibrahim Sani", email: "ibrahim@helpdesk.io", role: "Onboarding Specialist", status: "Active", created: "03 Feb 2025" },
  { name: "David Park", email: "david@helpdesk.io", role: "Auditor", status: "Active", created: "20 Feb 2025" },
];

const PERM_CATALOG = [
  { id: "org-view", label: "View organizations", group: "Organizations" },
  { id: "org-onboard", label: "Onboard organizations", group: "Organizations" },
  { id: "org-suspend", label: "Suspend / reactivate orgs", group: "Organizations" },
  { id: "org-limits", label: "Edit org plan & limits", group: "Organizations" },
  { id: "pkg-manage", label: "Manage packages & plans", group: "Billing" },
  { id: "billing-view", label: "View billing & invoices", group: "Billing" },
  { id: "billing-manage", label: "Issue refunds & credits", group: "Billing" },
  { id: "support-manage", label: "Manage support inbox", group: "Support" },
  { id: "team-manage", label: "Manage team & roles", group: "Administration" },
  { id: "audit-view", label: "View audit trail", group: "Administration" },
  { id: "reports-view", label: "View reports", group: "Administration" },
  { id: "settings-edit", label: "Edit platform settings", group: "Administration" },
];
const ALL_PERMS = PERM_CATALOG.map((p) => p.id);
const ROLE_DEFS = [
  { key: "owner", name: "Platform Owner", desc: "Full control of the platform, billing and team.", system: true, perms: ALL_PERMS },
  { key: "admin", name: "Platform Admin", desc: "Onboard and manage organizations and support.", system: true, perms: ["org-view","org-onboard","org-suspend","org-limits","support-manage","reports-view","audit-view","billing-view"] },
  { key: "billing", name: "Billing Manager", desc: "Manage packages, invoices, refunds and credits.", system: true, perms: ["org-view","pkg-manage","billing-view","billing-manage","reports-view"] },
  { key: "support", name: "Support Lead", desc: "Triage and resolve the support inbox.", system: true, perms: ["org-view","support-manage","reports-view"] },
  { key: "auditor", name: "Auditor", desc: "Read-only access to orgs, reports and the audit trail.", system: true, perms: ["org-view","reports-view","audit-view","billing-view"] },
];

const AUDIT = [
  { id: "EVT-2051", ts: "25 May 2026, 10:40", actor: "Ibrahim Sani", action: "Onboarded organization Pesa Cloud (Scale, trial)", target: "ORG-1009", type: "onboard" },
  { id: "EVT-2050", ts: "25 May 2026, 09:25", actor: "Kwame Osei", action: "Marked invoice INV-2039 as overdue", target: "INV-2039", type: "billing" },
  { id: "EVT-2049", ts: "24 May 2026, 17:10", actor: "Amara Eze", action: "Increased ticket limit for Zenith Logistics", target: "ORG-1007", type: "limits" },
  { id: "EVT-2048", ts: "24 May 2026, 14:02", actor: "Tunde Bakare", action: "Signed in from Lagos, NG", target: null, type: "auth" },
  { id: "EVT-2047", ts: "23 May 2026, 16:30", actor: "Kwame Osei", action: "Suspended organization Sahel Insure (non-payment)", target: "ORG-1008", type: "suspend" },
  { id: "EVT-2046", ts: "23 May 2026, 11:18", actor: "Amara Eze", action: "Changed Nimbus Pay plan to Scale", target: "ORG-1005", type: "plan" },
  { id: "EVT-2045", ts: "22 May 2026, 15:44", actor: "Tunde Bakare", action: 'Created package "Scale"', target: "PKG-SCALE", type: "package" },
  { id: "EVT-2044", ts: "22 May 2026, 10:05", actor: "Ibrahim Sani", action: "Onboarded organization Quantum MFB (Growth, trial)", target: "ORG-1004", type: "onboard" },
  { id: "EVT-2043", ts: "21 May 2026, 09:40", actor: "Kwame Osei", action: "Issued credit of $349 to Sterling Microfinance", target: "ORG-1003", type: "billing" },
  { id: "EVT-2042", ts: "20 May 2026, 13:12", actor: "Tunde Bakare", action: "Invited operator lerato@helpdesk.io as Support Lead", target: null, type: "team" },
  { id: "EVT-2041", ts: "19 May 2026, 16:50", actor: "Lerato Khumalo", action: "Resolved support request REQ-507", target: "REQ-507", type: "support" },
  { id: "EVT-2040", ts: "18 May 2026, 12:00", actor: "System", action: "Auto-charged 8 organizations for May billing", target: null, type: "billing" },
  { id: "EVT-2039", ts: "17 May 2026, 10:22", actor: "Amara Eze", action: "Updated permissions for role \"Support Lead\"", target: null, type: "role" },
  { id: "EVT-2038", ts: "15 May 2026, 08:48", actor: "Ibrahim Sani", action: "Onboarded organization Baobab Health (Starter)", target: "ORG-1006", type: "onboard" },
  { id: "EVT-2037", ts: "12 May 2026, 14:30", actor: "David Park", action: "Exported the audit trail (CSV)", target: null, type: "auth" },
  { id: "EVT-2036", ts: "10 May 2026, 09:15", actor: "System", action: "Trial reminder sent to Quantum MFB", target: "ORG-1004", type: "support" },
  { id: "EVT-2035", ts: "08 May 2026, 11:30", actor: "Kwame Osei", action: "Collected $1,200 invoice from Peerless FinTech", target: "ORG-1001", type: "billing" },
  { id: "EVT-2034", ts: "01 May 2026, 09:00", actor: "Amara Eze", action: "Renewed Enterprise subscription for Peerless FinTech", target: "ORG-1001", type: "plan" },
  { id: "EVT-2033", ts: "15 Jan 2025, 14:20", actor: "Ibrahim Sani", action: "Onboarded organization Peerless FinTech (Enterprise)", target: "ORG-1001", type: "onboard" },
];

const AUDIT_TYPES = {
  onboard: { label: "Onboard", cls: "badge-active" },
  suspend: { label: "Suspend", cls: "badge-suspended" },
  plan: { label: "Plan", cls: "badge-new" },
  limits: { label: "Limits", cls: "badge-in-progress" },
  package: { label: "Package", cls: "badge-trial" },
  billing: { label: "Billing", cls: "badge-medium" },
  support: { label: "Support", cls: "badge-low" },
  team: { label: "Team", cls: "badge-open" },
  role: { label: "Role", cls: "badge-open" },
  auth: { label: "Auth", cls: "badge-soft" },
};
const auditMeta = (t) => AUDIT_TYPES[t] || { label: "Event", cls: "badge-soft" };
const auditTsParse = (s = "") => { const [d, t] = s.split(", "); const dt = new Date(`${d} ${t || ""}`); return isNaN(dt.getTime()) ? 0 : dt.getTime(); };

const STATUS_LIST = ["Active", "Trial", "Past due", "Suspended"];
const PKG_NAMES = PACKAGES.map((p) => p.name);

const HQ = { operator: { name: "Tunde Bakare", email: "tunde@helpdesk.io", role: "Platform Owner" }, orgs: ORGS, packages: PACKAGES, invoices: INVOICES, support: SUPPORT, operators: OPERATORS, roleDefs: ROLE_DEFS, permCatalog: PERM_CATALOG, audit: AUDIT };

const HQCtx = createContext(null);
const useHQ = () => useContext(HQCtx);
const HQProvider = ({ children }) => {
  const [data, setData] = useState(HQ);
  const addAudit = useCallback((action, target, type) => setData((d) => ({ ...d, audit: [auditEntry(action, target, type), ...d.audit] })), []);
  const onboardOrg = useCallback((org) => setData((d) => {
    const id = `ORG-${1001 + d.orgs.length}`;
    const pkg = d.packages.find((p) => p.name === org.package) || d.packages[0];
    const lim = pkg.limits;
    const newOrg = { id, name: org.name, code: (org.name || "ORG").replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase().padEnd(3, "X") + "-" + String(d.orgs.length + 1).padStart(3, "0"), package: pkg.name, status: org.trial ? "Trial" : "Active", billing: org.trial ? "Trialing" : "Paid", region: org.region || "—", admin: org.admin, adminEmail: org.adminEmail, mrr: org.trial ? 0 : pkg.price, created: fmtDate(new Date()), renews: fmtDate(new Date(Date.now() + (org.trial ? 14 : 365) * 864e5)), ticketsAll: 0, usage: usage(0, lim.customers, 0, lim.tickets, 1, lim.users, 0, lim.products) };
    return { ...d, orgs: [newOrg, ...d.orgs], audit: [auditEntry(`Onboarded organization ${org.name} (${pkg.name}${org.trial ? ", trial" : ""})`, id, "onboard"), ...d.audit] };
  }), []);
  const updateOrg = useCallback((id, patch, auditMsg, auditType) => setData((d) => ({ ...d, orgs: d.orgs.map((o) => o.id === id ? { ...o, ...patch } : o), audit: auditMsg ? [auditEntry(auditMsg, id, auditType || "limits"), ...d.audit] : d.audit })), []);
  const addPackage = useCallback((pkg) => setData((d) => { const id = "PKG-" + (pkg.name || "plan").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8); return { ...d, packages: [...d.packages, { ...pkg, id }], audit: [auditEntry(`Created package "${pkg.name}"`, id, "package"), ...d.audit] }; }), []);
  const updatePackage = useCallback((id, patch) => setData((d) => ({ ...d, packages: d.packages.map((p) => p.id === id ? { ...p, ...patch } : p), audit: [auditEntry(`Updated package "${patch.name || id}"`, id, "package"), ...d.audit] })), []);
  const updateInvoice = useCallback((id, status, msg) => setData((d) => ({ ...d, invoices: d.invoices.map((iv) => iv.id === id ? { ...iv, status } : iv), audit: [auditEntry(msg, id, "billing"), ...d.audit] })), []);
  const resolveRequest = useCallback((id, org) => setData((d) => ({ ...d, support: d.support.map((r) => r.id === id ? { ...r, status: "Resolved" } : r), audit: [auditEntry(`Resolved support request ${id}`, id, "support"), ...d.audit] })), []);
  const value = useMemo(() => ({ data, addAudit, onboardOrg, updateOrg, addPackage, updatePackage, updateInvoice, resolveRequest }), [data, addAudit, onboardOrg, updateOrg, addPackage, updatePackage, updateInvoice, resolveRequest]);
  return <HQCtx.Provider value={value}>{children}</HQCtx.Provider>;
};

// ═══════════════════════════════════════════════════════════════════════════
// Layout
// ═══════════════════════════════════════════════════════════════════════════
const HQ_NAV = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard", route: "/dashboard" },
  { key: "orgs", label: "Organizations", icon: "building", route: "/orgs" },
  { key: "packages", label: "Packages & Plans", icon: "package", route: "/packages" },
  { key: "billing", label: "Billing", icon: "card", route: "/billing" },
  { key: "support", label: "Support Inbox", icon: "inbox", route: "/support" },
  { key: "reports", label: "Reports", icon: "chart", route: "/reports" },
  { key: "audit", label: "Audit Trail", icon: "history", route: "/audit" },
  { key: "team", label: "Team & Roles", icon: "shield", route: "/team" },
  { key: "settings", label: "Settings", icon: "settings", route: "/settings" },
];

const Sidebar = ({ route, navigate, collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { data } = useHQ();
  const openReqs = data.support.filter((r) => r.status === "Open").length;
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand" onClick={collapsed ? onToggle : undefined} title={collapsed ? "Expand sidebar" : undefined} style={collapsed ? { cursor: "pointer" } : undefined}>
        <Logo size={30}/>
        <span className="sidebar-label" style={{ flex: 1, display: "flex", alignItems: "center", gap: 7 }}>HelpDesk <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", background: "rgba(255,255,255,0.14)", padding: "1px 6px", borderRadius: 5 }}>HQ</span></span>
        <button className="kebab-btn sidebar-collapse-toggle" onClick={onToggle} title={collapsed ? "Expand" : "Collapse"} style={{ color: "var(--sidebar-fg-muted)" }}><Icon name={collapsed ? "chevron-right" : "sidebar"} size={16}/></button>
        <button className="kebab-btn sidebar-close-toggle" onClick={onMobileClose} title="Close menu" style={{ color: "var(--sidebar-fg-muted)" }}><Icon name="x" size={18}/></button>
      </div>
      <nav className="sidebar-nav">
        {HQ_NAV.map((it) => (
          <a key={it.key} className={`nav-item ${route.startsWith(it.route) ? "active" : ""}`} onClick={() => navigate(it.route)} title={collapsed ? it.label : undefined}>
            <Icon name={it.icon} size={17} stroke={1.7}/>
            <span className="sidebar-label">{it.label}</span>
            {it.key === "support" && openReqs && !collapsed ? <span className="nav-badge">{openReqs}</span> : null}
          </a>
        ))}
      </nav>
      <div className="sidebar-foot">
        <Avatar name={data.operator.name} size="md" style={{ background: "rgba(255,255,255,0.12)", color: "var(--sidebar-fg)", border: "1px solid var(--sidebar-border)" }}/>
        <div className="ws-info"><div className="ws-name">{data.operator.name}</div><div className="ws-user">{data.operator.role}</div></div>
        {!collapsed ? <button className="kebab-btn" title="Sign out" style={{ color: "var(--sidebar-fg-muted)" }} onClick={() => navigate("/login")}><Icon name="logout" size={15}/></button> : null}
      </div>
    </aside>
  );
};

const TopBar = ({ onMenuClick }) => {
  const { data } = useHQ();
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Open menu"><Icon name="menu" size={20}/></button>
      <div className="topbar-search"><div className="input-wrap"><span className="input-icon"><Icon name="search" size={15}/></span><input className="input has-icon" style={{ height: 36 }} placeholder="Search organizations, invoices, requests..."/></div></div>
      <div className="topbar-actions">
        <span className="kbd">⌘K</span>
        <span className="role-chip" style={{ cursor: "default" }}><span className="role-dot"/><span>Super Admin</span></span>
        <button className="icon-btn" aria-label="Notifications"><Icon name="bell" size={17}/><span className="dot-badge">{data.support.filter((r) => r.status === "Open").length}</span></button>
        <Avatar name={data.operator.name} size="md"/>
      </div>
    </header>
  );
};

const HQLayout = ({ route, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = (to) => { window.location.hash = to; setMobileOpen(false); };
  useEffect(() => { setMobileOpen(false); }, [route]);
  return (
    <div className="page">
      <Sidebar route={route} navigate={navigate} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)}/>
      {mobileOpen ? <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)}/> : null}
      <div className="main"><TopBar onMenuClick={() => setMobileOpen(true)}/><div className="main-body">{children}</div></div>
    </div>
  );
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("tunde@helpdesk.io");
  const [pwd, setPwd] = useState("••••••••");
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={(e) => { e.preventDefault(); window.location.hash = "/dashboard"; }}>
        <div className="brand"><Logo size={32}/> HelpDesk <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", background: "#000", color: "#fff", padding: "2px 7px", borderRadius: 6 }}>HQ</span></div>
        <p className="sublabel">Platform operator console — sign in to manage organizations.</p>
        <div className="field"><label className="label">Work email</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></div>
        <div className="field"><label className="label">Password</label><div className="pwd-wrap"><input className="input" type={show ? "text" : "password"} value={pwd} onChange={(e) => setPwd(e.target.value)} required style={{ paddingRight: 40 }}/><button type="button" className="pwd-toggle" onClick={() => setShow((s) => !s)}><Icon name={show ? "eye-off" : "eye"} size={16}/></button></div></div>
        <Button variant="primary" block type="submit" style={{ marginTop: 8, height: 42 }}>Sign in to HQ</Button>
        <a className="forgot">Forgot your password?</a>
        <p className="auth-foot">Restricted to HelpDesk platform staff.</p>
      </form>
    </div>
  );
};

// ── shared sort helpers ──
const cycleSort = (setSort, key) => setSort((s) => s.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : { key: null, dir: "asc" }) : { key, dir: "asc" });
const applySort = (rows, sort, sorters) => { if (!sort.key || !sorters[sort.key]) return rows; const a = [...rows].sort(sorters[sort.key]); return sort.dir === "desc" ? a.reverse() : a; };
const pctOf = (u) => Math.round(((u.customers.used / u.customers.limit) + (u.tickets.used / u.tickets.limit) + (u.users.used / u.users.limit) + (u.products.used / u.products.limit)) / 4 * 100);

// ── Deterministic per-org sub-data (users / customers / products / tickets) ──
// Seeded from the org id so each org always shows the same, plausible workspace data.
const slug = (s) => (s || "org").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12);
const seededRand = (seed) => { let s = (hashStr(String(seed)) % 2147483647) || 1; return () => { s = (s * 48271) % 2147483647; return (s & 0x7fffffff) / 0x7fffffff; }; };
const pick = (r, arr) => arr[Math.floor(r() * arr.length) % arr.length];
const G_FIRST = ["Amara","Chuka","Ngozi","Tunde","Sade","Ife","Kwame","Ama","Yaw","Abena","Thabo","Lerato","Sipho","Zanele","Brian","Grace","Daniel","Mariam","Ahmed","Fatima","Joseph","Esther","David","Ruth","Samuel","Aisha","Emeka","Chioma","Bola","Yusuf"];
const G_LAST = ["Okafor","Mensah","Bello","Adewale","Nkosi","Khumalo","Otieno","Achieng","Diallo","Sow","Hassan","Eze","Obi","Salawu","Nwosu","Afolabi","Kimani","Mwangi","Banda","Phiri","Diop","Toure","Kone","Abubakar","Musa"];
const G_COMPANIES = ["Kolomoni Ltd","Sterling MFB","Quantum MFB","First Merchants","Apex Capital","Harbour Trust","Sahara Pay","Delta Microcredit","Crest Union","Vanguard Save","Meridian Bank","Summit Credit","Aurora Finance","Pinnacle MFB","Horizon Bank","Lagoon Savings","Riverside Coop","Zamani Bank","Equator Pay","Onyx Trust","Baobab Credit","Indigo MFB","Cobalt Bank","Vertex Pay"];
const G_PRODUCTS = ["Core Banking","Payments API","Mobile Wallet","Lending Suite","Compliance Hub","Card Issuing","Analytics","Onboarding KYC","Savings Engine","Transfer Gateway"];
const G_SUBJECTS = ["Login failure on mobile app","Transaction declined unexpectedly","API timeout on transfer","KYC verification delay","Wrong debit amount on account","Onboarding documents missing","App crash on Android 14","Feature request: CSV export","Bulk customer import failing","Two-factor auth setup question","Card not working at POS","Monthly statement not generating","Webhook not firing","Password reset loop","Account locked after retries"];
const G_ROLES = ["Support Manager","Support Agent","Support Agent","Support Agent","Viewer / Auditor"];
const TKT_STATUSES = ["New","Open","In Progress","Pending Customer","Resolved","Closed"];
const TKT_PRIOS = ["Low","Medium","High","High"];
const G_MONTHS = ["Jan","Feb","Mar","Apr","May"];

const orgUsers = (o) => {
  const r = seededRand(o.id + "u"); const n = Math.max(1, o.usage.users.used);
  const out = [{ name: o.admin, email: o.adminEmail, role: "Client Administrator", status: "Active", created: o.created }];
  for (let i = 1; i < n; i++) { const nm = pick(r, G_FIRST) + " " + pick(r, G_LAST); out.push({ name: nm, email: nm.toLowerCase().replace(/\s+/g, ".") + "@" + slug(o.name) + ".com", role: i === 1 ? "Support Manager" : pick(r, G_ROLES), status: r() < 0.9 ? "Active" : "Archived", created: o.created }); }
  return out;
};
const orgCustomers = (o) => {
  const r = seededRand(o.id + "c"); const n = o.usage.customers.used; const used = new Set(); const out = [];
  for (let i = 0; i < n; i++) { let nm = pick(r, G_COMPANIES); let g = 0; while (used.has(nm) && g++ < 30) nm = pick(r, G_COMPANIES) + " " + (1 + Math.floor(r() * 9)); used.add(nm); out.push({ id: "CUS-" + String(100 + i), name: nm, status: r() < 0.88 ? "Active" : "Archived", open: Math.floor(r() * 8), total: 4 + Math.floor(r() * 40), reps: 1 + Math.floor(r() * 4) }); }
  return out;
};
const orgProducts = (o) => {
  const r = seededRand(o.id + "p"); const n = o.usage.products.used; const used = new Set(); const out = [];
  for (let i = 0; i < n; i++) { let nm = pick(r, G_PRODUCTS); let g = 0; while (used.has(nm) && g++ < 20) nm = pick(r, G_PRODUCTS); used.add(nm); out.push({ id: "PRD-" + String(100 + i), name: nm, status: "Active", customers: 1 + Math.floor(r() * Math.max(1, o.usage.customers.used)), open: Math.floor(r() * 15) }); }
  return out;
};
const orgTickets = (o) => {
  const r = seededRand(o.id + "t"); const custs = orgCustomers(o); const staff = orgUsers(o).filter((u) => u.role !== "Viewer / Auditor"); const n = Math.min(o.ticketsAll, 14); const out = [];
  for (let i = 0; i < n; i++) { out.push({ id: "TKT-" + (1000 + Math.floor(r() * 8999)), subject: pick(r, G_SUBJECTS), customer: custs.length ? pick(r, custs).name : "—", priority: pick(r, TKT_PRIOS), status: pick(r, TKT_STATUSES), agent: staff.length && r() < 0.85 ? pick(r, staff).name : null, updated: (1 + Math.floor(r() * 27)) + " " + pick(r, G_MONTHS) + " 2026" }); }
  return out;
};

// ═══════════════════════════════════════════════════════════════════════════
// Screens
// ═══════════════════════════════════════════════════════════════════════════
const Dashboard = () => {
  const { data } = useHQ();
  const navigate = (to) => { window.location.hash = to; };
  const orgs = data.orgs;
  const active = orgs.filter((o) => o.status === "Active").length;
  const trial = orgs.filter((o) => o.status === "Trial").length;
  const suspended = orgs.filter((o) => o.status === "Suspended" || o.status === "Past due").length;
  const mrr = orgs.reduce((a, o) => a + o.mrr, 0);
  const platformTickets = orgs.reduce((a, o) => a + o.ticketsAll, 0);
  const avgUtil = Math.round(orgs.reduce((a, o) => a + pctOf(o.usage), 0) / orgs.length);
  const planDist = PACKAGES.map((p) => ({ label: p.name, values: [orgs.filter((o) => o.package === p.name).length] }));
  const recent = [...orgs].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 5);
  const attention = orgs.filter((o) => o.status === "Past due" || o.status === "Suspended" || pctOf(o.usage) >= 90);
  return (
    <>
      <div className="page-hd"><div><h1>Platform overview</h1><p className="sub">Everything happening across HelpDesk — {orgs.length} organizations.</p></div><div className="actions"><Button variant="secondary" size="sm" icon="download">Export</Button><Button variant="primary" icon="plus" onClick={() => navigate("/orgs/new")}>Onboard organization</Button></div></div>

      <div className="stat-grid">
        <StatCard label="Organizations" value={orgs.length} trend={`${active} active · ${trial} trial`} trendDir="up" sparkData={[6,7,8,9,10,11,orgs.length]}/>
        <StatCard label="Monthly recurring revenue" value={money(mrr)} trend="↑ 12% vs last month" trendDir="up" sparkData={[3.6,3.9,4.1,4.3,4.5,4.7,4.8].map((x) => x * 1000)} sparkColor="var(--chart-2)"/>
        <StatCard label="Tickets across platform" value={platformTickets.toLocaleString()} sub="All organizations" sparkData={[7,8,9.5,10.5,11.5,12.5,13.5].map((x) => x * 1000)} sparkColor="var(--chart-3)"/>
        <StatCard label="Avg. license utilization" value={`${avgUtil}%`} trend={`${suspended} need attention`} trendDir={suspended ? "down" : "flat"} sparkColor="var(--chart-4)"/>
      </div>

      <div className="two-col-7-5" style={{ marginBottom: 16, alignItems: "start" }}>
        <Card className="chart-card"><div className="chart-title"><span className="big mono">{money(mrr)}</span><h3>recurring revenue · last 12 months</h3></div><LineChart data={{ labels: ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"], values: [2100,2450,2800,3100,3300,3600,3900,4100,4300,4500,4700,mrr], unit: "MRR" }}/></Card>
        <Card title="Organizations by plan"><BarChart data={planDist} colors={["var(--chart-2)"]} height={188}/></Card>
      </div>

      <div className="two-col-7-5" style={{ alignItems: "start" }}>
        <Card title="Recently onboarded" action={<a className="link" onClick={() => navigate("/orgs")} style={{ cursor: "pointer" }}>View all →</a>} pad={false}>
          <table className="tbl">
            <thead><tr><th>Organization</th><th>Plan</th><th>Status</th><th style={{ textAlign: "right" }}>MRR</th><th>Joined</th></tr></thead>
            <tbody>{recent.map((o) => (
              <tr key={o.id} className="clickable" onClick={() => navigate("/orgs/" + o.id)}>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 500 }}><Avatar name={o.name} size="sm"/> {o.name}</span></td>
                <td><Badge status={o.package}>{o.package}</Badge></td>
                <td><Badge status={o.status} dot>{o.status}</Badge></td>
                <td className="mono" style={{ textAlign: "right" }}>{o.mrr ? money(o.mrr) : "—"}</td>
                <td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{o.created}</td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
        <div className="side-panel">
          <Card title="Needs attention">
            {attention.length === 0 ? <div style={{ fontSize: 13, color: "var(--text-muted)" }}>All organizations are healthy.</div> : (
              <div className="activity-list">{attention.map((o) => (
                <div key={o.id} className="activity-item" style={{ cursor: "pointer" }} onClick={() => navigate("/orgs/" + o.id)}>
                  <span className={`dot ${o.status === "Suspended" ? "dot-destructive" : "dot-warn"}`}/>
                  <div className="body"><p><b>{o.name}</b> — {o.status === "Past due" ? "payment overdue" : o.status === "Suspended" ? "suspended" : `${pctOf(o.usage)}% of limits used`}</p><span className="time">{o.package} · {o.region}</span></div>
                </div>
              ))}</div>
            )}
          </Card>
          <Card title="System status"><div className="banner success" style={{ fontSize: 12.5 }}><span className="icon"><Icon name="check-circle" size={14}/></span><div>All systems operational. Billing run completed for May.</div></div></Card>
        </div>
      </div>
    </>
  );
};

// ── Organizations ────────────────────────────────────────────────────────────
const OrgsList = () => {
  const { data } = useHQ();
  const navigate = (to) => { window.location.hash = to; };
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [page, setPage] = useState(1); const PER = 8;
  const filtered = data.orgs.filter((o) => {
    if (search && !(o.name.toLowerCase().includes(search.toLowerCase()) || o.code.toLowerCase().includes(search.toLowerCase()) || o.region.toLowerCase().includes(search.toLowerCase()))) return false;
    if (status !== "All" && o.status !== status) return false;
    if (plan !== "All" && o.package !== plan) return false;
    return true;
  });
  const sorters = { name: (a, b) => a.name.localeCompare(b.name), plan: (a, b) => PKG_NAMES.indexOf(a.package) - PKG_NAMES.indexOf(b.package), status: (a, b) => a.status.localeCompare(b.status), mrr: (a, b) => a.mrr - b.mrr, util: (a, b) => pctOf(a.usage) - pctOf(b.usage), created: (a, b) => new Date(a.created) - new Date(b.created) };
  const sorted = applySort(filtered, sort, sorters);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER));
  const rows = sorted.slice((page - 1) * PER, page * PER);
  const anyFilter = search || status !== "All" || plan !== "All" || sort.key;
  const reset = () => { setSearch(""); setStatus("All"); setPlan("All"); setSort({ key: null, dir: "asc" }); setPage(1); };
  const counts = [
    { label: "All organizations", status: "All", count: data.orgs.length, dot: "#000" },
    { label: "Active", status: "Active", count: data.orgs.filter((o) => o.status === "Active").length, dot: "#00713a" },
    { label: "Trial", status: "Trial", count: data.orgs.filter((o) => o.status === "Trial").length, dot: "#92400e" },
    { label: "Past due", status: "Past due", count: data.orgs.filter((o) => o.status === "Past due").length, dot: "#c2410c" },
    { label: "Suspended", status: "Suspended", count: data.orgs.filter((o) => o.status === "Suspended").length, dot: "#cc0000" },
  ];
  return (
    <>
      <div className="page-hd"><div><h1>Organizations</h1><p className="sub">{data.orgs.length} total · {sorted.length} matching</p></div><div className="actions"><Button variant="ghost" icon="download" size="sm">Export CSV</Button><Button variant="primary" icon="plus" onClick={() => navigate("/orgs/new")}>Onboard organization</Button></div></div>

      <div className="ticket-stats" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {counts.map((s) => (
          <button key={s.label} className={`tk-stat ${status === s.status ? "active" : ""}`} onClick={() => { setStatus(s.status); setPage(1); }}>
            <div className="tk-stat-val">{s.count}</div><div className="tk-stat-lbl"><span className="tk-dot" style={{ background: s.dot }}/> {s.label}</div>
          </button>
        ))}
      </div>

      <div className="tbl-wrap tickets-table-wrap">
        <div className="tbl-toolbar">
          <div className="input-wrap" style={{ flex: 1, maxWidth: 380 }}><span className="input-icon"><Icon name="search" size={15}/></span><input className="input has-icon" style={{ height: 36 }} placeholder="Search by name, code or region..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}/></div>
          <div className="spacer"/><span style={{ fontSize: 12.5, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{sorted.length} of {data.orgs.length}</span>{anyFilter ? <Button variant="ghost" size="sm" icon="x" onClick={reset}>Reset</Button> : null}
        </div>
        {rows.length === 0 ? <EmptyState icon="building" title="No organizations match" desc="Try adjusting your filters." action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}/> : (
          <table className="tbl">
            <thead><tr>
              <th><Th label="Organization" sortKey="name" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th><Th label="Plan" sortKey="plan" sort={sort} onSort={(k) => cycleSort(setSort, k)} filter={{ value: plan, set: (v) => { setPlan(v); setPage(1); }, all: "All", options: ["All", ...PKG_NAMES] }}/></th>
              <th><Th label="Status" sortKey="status" sort={sort} onSort={(k) => cycleSort(setSort, k)} filter={{ value: status, set: (v) => { setStatus(v); setPage(1); }, all: "All", options: ["All", ...STATUS_LIST] }}/></th>
              <th><Th label="MRR" sortKey="mrr" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th><Th label="Utilization" sortKey="util" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th>Region</th>
              <th><Th label="Joined" sortKey="created" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th></th>
            </tr></thead>
            <tbody>{rows.map((o) => { const pct = pctOf(o.usage); return (
              <tr key={o.id} className="clickable" onClick={() => navigate("/orgs/" + o.id)}>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}><Avatar name={o.name} size="sm"/> <div><div style={{ fontWeight: 600 }}>{o.name}</div><div className="mono" style={{ fontSize: 11, color: "var(--text-subtle)" }}>{o.code}</div></div></span></td>
                <td><Badge status={o.package}>{o.package}</Badge></td>
                <td><Badge status={o.status} dot>{o.status}</Badge></td>
                <td className="mono">{o.mrr ? money(o.mrr) : <span style={{ color: "var(--text-subtle)" }}>—</span>}</td>
                <td style={{ minWidth: 120 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className={`prog ${pct >= 90 ? "danger" : pct >= 75 ? "warn" : ""}`} style={{ width: 64 }}><div className="bar" style={{ width: pct + "%" }}/></div><span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{pct}%</span></div></td>
                <td style={{ fontSize: 13 }}>{o.region}</td>
                <td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{o.created}</td>
                <td><div onClick={(e) => e.stopPropagation()}><KebabMenu items={[{ label: "View details", icon: "external", onClick: () => navigate("/orgs/" + o.id) }, { sep: true }, { label: o.status === "Suspended" ? "Reactivate" : "Suspend", icon: o.status === "Suspended" ? "play" : "pause", destructive: o.status !== "Suspended" }]}/></div></td>
              </tr>
            ); })}</tbody>
          </table>
        )}
        {rows.length > 0 ? <Pagination page={page} totalPages={totalPages} onPage={setPage} summary={`Showing ${(page - 1) * PER + 1}–${Math.min(page * PER, sorted.length)} of ${sorted.length} organizations`}/> : null}
      </div>
    </>
  );
};

const OnboardOrg = () => {
  const { data, onboardOrg } = useHQ();
  const toast = useToast();
  const navigate = (to) => { window.location.hash = to; };
  const [form, setForm] = useState({ name: "", region: "", admin: "", adminEmail: "", package: "Growth", trial: true });
  const [errs, setErrs] = useState({});
  const pkg = data.packages.find((p) => p.name === form.package);
  const submit = (e) => {
    e.preventDefault();
    const er = {}; if (!form.name.trim()) er.name = "Organization name is required"; if (!form.admin.trim()) er.admin = "Admin name is required"; if (!form.adminEmail.trim()) er.adminEmail = "Admin email is required";
    setErrs(er); if (Object.keys(er).length) return;
    onboardOrg(form);
    toast.success(`${form.name} onboarded on the ${form.package} plan. ${form.admin} has been invited.`, "Organization created");
    navigate("/orgs");
  };
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="crumbs"><a onClick={() => navigate("/orgs")}>Organizations</a><span className="sep">/</span><span>Onboard</span></div>
      <div className="page-hd"><div><h1>Onboard an organization</h1><p className="sub">Create a workspace, assign a plan and invite the primary admin.</p></div></div>
      <form onSubmit={submit}>
        <Card title="Organization">
          <div className="two-col-1-1">
            <div className="field"><label className="label">Organization name <span className="required">*</span></label><input className="input" placeholder="e.g. Acme Microfinance" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ borderColor: errs.name ? "var(--destructive)" : "" }} autoFocus/>{errs.name ? <div style={{ color: "var(--destructive)", fontSize: 12, marginTop: 4 }}>{errs.name}</div> : null}</div>
            <div className="field"><label className="label">Region</label><input className="input" placeholder="e.g. Lagos, NG" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}/></div>
          </div>
          <div className="two-col-1-1" style={{ marginTop: 14 }}>
            <div className="field"><label className="label">Primary admin <span className="required">*</span></label><input className="input" placeholder="Full name" value={form.admin} onChange={(e) => setForm({ ...form, admin: e.target.value })} style={{ borderColor: errs.admin ? "var(--destructive)" : "" }}/>{errs.admin ? <div style={{ color: "var(--destructive)", fontSize: 12, marginTop: 4 }}>{errs.admin}</div> : null}</div>
            <div className="field"><label className="label">Admin email <span className="required">*</span></label><input className="input" type="email" placeholder="admin@company.com" value={form.adminEmail} onChange={(e) => setForm({ ...form, adminEmail: e.target.value })} style={{ borderColor: errs.adminEmail ? "var(--destructive)" : "" }}/>{errs.adminEmail ? <div style={{ color: "var(--destructive)", fontSize: 12, marginTop: 4 }}>{errs.adminEmail}</div> : null}</div>
          </div>
        </Card>
        <Card title="Plan" style={{ marginTop: 16 }}>
          <div className="radio-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {data.packages.map((p) => (
              <div key={p.id} className={`radio-card ${form.package === p.name ? "selected" : ""}`} onClick={() => setForm({ ...form, package: p.name })}>
                <div style={{ flex: 1 }}><p className="rc-title">{p.name} <span className="mono" style={{ color: "var(--text-muted)", fontWeight: 400 }}>· {money(p.price)}/mo</span></p><p className="rc-desc">{p.limits.customers} customers · {p.limits.tickets.toLocaleString()} tickets · {p.limits.users} users</p></div>
                {form.package === p.name ? <Icon name="check-circle" size={18}/> : null}
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: 14, justifyContent: "space-between" }}>
            <div><div style={{ fontWeight: 500, fontSize: 13.5 }}>Start as a 14-day trial</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>No charge until the trial ends. Otherwise billed immediately.</div></div>
            <button type="button" onClick={() => setForm({ ...form, trial: !form.trial })} aria-label="Toggle trial" style={{ width: 44, height: 26, borderRadius: 999, border: 0, background: form.trial ? "#000" : "var(--border-strong)", position: "relative", cursor: "pointer", transition: "background .15s" }}><span style={{ position: "absolute", top: 3, left: form.trial ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left .15s" }}/></button>
          </div>
          <div className="banner info" style={{ marginTop: 14, fontSize: 12.5 }}><span className="icon"><Icon name="info" size={14}/></span><div>This plan grants <b>{pkg.limits.customers} customers, {pkg.limits.tickets.toLocaleString()} tickets, {pkg.limits.users} users and {pkg.limits.products} products</b>. {form.trial ? "Billing starts after the trial." : `Billed ${money(pkg.price)}/mo immediately.`}</div></div>
        </Card>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}><Button variant="ghost" type="button" onClick={() => navigate("/orgs")}>Cancel</Button><Button variant="primary" type="submit" icon="rocket">Onboard organization</Button></div>
      </form>
    </div>
  );
};

const OrgDetail = ({ id }) => {
  const { data, updateOrg, updateInvoice } = useHQ();
  const toast = useToast();
  const navigate = (to) => { window.location.hash = to; };
  const o = data.orgs.find((x) => x.id === id);
  const [tab, setTab] = useState("overview");
  const [q, setQ] = useState("");
  const [planOpen, setPlanOpen] = useState(false);
  const [confirmSuspend, setConfirmSuspend] = useState(false);
  useEffect(() => { setQ(""); }, [tab]);
  const users = useMemo(() => o ? orgUsers(o) : [], [o]);
  const customers = useMemo(() => o ? orgCustomers(o) : [], [o]);
  const products = useMemo(() => o ? orgProducts(o) : [], [o]);
  const tickets = useMemo(() => o ? orgTickets(o) : [], [o]);
  if (!o) return <Card><EmptyState icon="building" title="Organization not found" action={<Button variant="secondary" onClick={() => navigate("/orgs")}>Back to organizations</Button>}/></Card>;
  const dims = [{ key: "customers", label: "Customers", icon: "users" }, { key: "tickets", label: "Tickets", icon: "ticket" }, { key: "users", label: "Users", icon: "shield" }, { key: "products", label: "Products", icon: "package" }];
  const orgInvoices = data.invoices.filter((iv) => iv.orgId === o.id);
  const orgEvents = data.audit.filter((a) => a.target === o.id);
  const setPlan = (name) => { const pkg = data.packages.find((p) => p.name === name); updateOrg(o.id, { package: name, mrr: o.status === "Trial" ? 0 : pkg.price, usage: { customers: { ...o.usage.customers, limit: pkg.limits.customers }, tickets: { ...o.usage.tickets, limit: pkg.limits.tickets }, users: { ...o.usage.users, limit: pkg.limits.users }, products: { ...o.usage.products, limit: pkg.limits.products } } }, `Changed ${o.name} plan to ${name}`, "plan"); setPlanOpen(false); toast.success(`${o.name} moved to ${name}.`); };
  const toggleSuspend = () => { const next = o.status === "Suspended" ? "Active" : "Suspended"; updateOrg(o.id, { status: next, billing: next === "Suspended" ? "Unpaid" : "Paid" }, `${next === "Suspended" ? "Suspended" : "Reactivated"} organization ${o.name}`, next === "Suspended" ? "suspend" : "onboard"); setConfirmSuspend(false); toast.success(`${o.name} ${next === "Suspended" ? "suspended" : "reactivated"}.`); };
  const TABS = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "Users", count: users.length },
    { key: "customers", label: "Customers", count: customers.length },
    { key: "products", label: "Products", count: products.length },
    { key: "tickets", label: "Tickets", count: o.ticketsAll },
    { key: "billing", label: "Billing" },
    { key: "activity", label: "Activity" },
  ];
  const match = (s) => !q || String(s).toLowerCase().includes(q.toLowerCase());
  const Toolbar = ({ placeholder, count, total, unit }) => (
    <div className="tbl-toolbar"><div className="input-wrap" style={{ flex: 1, maxWidth: 340 }}><span className="input-icon"><Icon name="search" size={15}/></span><input className="input has-icon" style={{ height: 36 }} placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)}/></div><div className="spacer"/><span style={{ fontSize: 12.5, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{count} {unit}{total != null ? ` · plan limit ${total}` : ""}</span></div>
  );
  return (
    <>
      <div className="crumbs"><a onClick={() => navigate("/orgs")}>← Organizations</a></div>
      <div className="page-hd" style={{ alignItems: "flex-start" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="row" style={{ gap: 8, marginBottom: 6, flexWrap: "wrap" }}><span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>{o.code}</span><Badge status={o.status} dot>{o.status}</Badge><Badge status={o.package}>{o.package}</Badge><Badge status={o.billing}>{o.billing}</Badge></div>
          <div className="row" style={{ gap: 12 }}><Avatar name={o.name} size="lg"/><h1>{o.name}</h1></div>
        </div>
        <div className="actions" style={{ flexShrink: 0 }}>
          <div style={{ position: "relative" }}><Button variant="secondary" size="sm" iconRight="chevron-down" onClick={() => setPlanOpen((p) => !p)}>Change plan</Button>{planOpen ? <div className="dropdown" style={{ right: 0, top: "100%", marginTop: 4, minWidth: 180 }}><div className="dropdown-hd">Move to plan</div>{data.packages.map((p) => <div key={p.id} className={`ddi ${p.name === o.package ? "sel" : ""}`} onClick={() => setPlan(p.name)}><Badge status={p.name}>{p.name}</Badge><span className="mono" style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 12 }}>{money(p.price)}</span></div>)}</div> : null}</div>
          <KebabMenu items={[{ label: o.status === "Suspended" ? "Reactivate org" : "Suspend org", icon: o.status === "Suspended" ? "play" : "pause", destructive: o.status !== "Suspended", onClick: () => setConfirmSuspend(true) }, { label: "Contact admin", icon: "mail", onClick: () => toast.info(`Drafting an email to ${o.adminEmail}.`) }]}/>
        </div>
      </div>

      {o.status === "Past due" ? <div className="banner error" style={{ marginBottom: 16 }}><span className="icon"><Icon name="warning" size={16}/></span><div><b>Payment overdue.</b> This account has an unpaid invoice. Suspend or follow up on billing.</div></div> : null}

      <div className="tabs">{TABS.map((t) => <button key={t.key} className={`tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>{t.label}{t.count != null ? <span className="tab-count">{t.count}</span> : null}</button>)}</div>

      {tab === "overview" ? (
        <div className="two-col-7-5" style={{ alignItems: "start" }}>
          <div>
            <div className="stat-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <StatCard label="Monthly revenue" value={o.mrr ? money(o.mrr) : "—"} sub={o.status === "Trial" ? "On trial" : "Billed monthly"}/>
              <StatCard label="Tickets (lifetime)" value={o.ticketsAll.toLocaleString()} sub="In their workspace"/>
              <StatCard label="Customers" value={`${o.usage.customers.used} / ${o.usage.customers.limit}`} sub="Client accounts"/>
              <StatCard label="Team users" value={`${o.usage.users.used} / ${o.usage.users.limit}`} sub="Workspace seats"/>
            </div>
            <Card title="License usage" style={{ marginTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {dims.map((d) => { const v = o.usage[d.key]; const pct = Math.round((v.used / v.limit) * 100); return (
                  <div key={d.key}><div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}><span className="row-tight" style={{ fontSize: 13, fontWeight: 500 }}><Icon name={d.icon} size={14}/> {d.label}</span><span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{v.used.toLocaleString()} / {v.limit.toLocaleString()}</span></div><div className={`prog ${pct >= 90 ? "danger" : pct >= 75 ? "warn" : ""}`}><div className="bar" style={{ width: pct + "%" }}/></div></div>
                ); })}
              </div>
            </Card>
          </div>
          <div className="side-panel">
            <div className="side-card"><div className="side-hd"><b>Primary admin</b></div><div className="side-bd"><dl className="dl"><dt>Name</dt><dd style={{ fontWeight: 500 }}>{o.admin}</dd><dt>Email</dt><dd className="mono" style={{ fontSize: 12 }}>{o.adminEmail}</dd><dt>Region</dt><dd>{o.region}</dd></dl></div></div>
            <div className="side-card"><div className="side-hd"><b>Account</b></div><div className="side-bd"><dl className="dl"><dt>Org ID</dt><dd className="mono">{o.id}</dd><dt>Plan</dt><dd><Badge status={o.package}>{o.package}</Badge></dd><dt>Billing</dt><dd><Badge status={o.billing}>{o.billing}</Badge></dd><dt>Joined</dt><dd>{o.created}</dd><dt>Renews</dt><dd>{o.renews}</dd></dl></div></div>
          </div>
        </div>
      ) : tab === "users" ? (
        <div className="tbl-wrap tickets-table-wrap">
          <Toolbar placeholder="Search users..." count={users.filter((u) => match(u.name) || match(u.email)).length} total={o.usage.users.limit} unit="users"/>
          <table className="tbl"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>{users.filter((u) => match(u.name) || match(u.email)).map((u, i) => (
              <tr key={i} className={u.status === "Archived" ? "archived-row" : ""}><td><span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}><Avatar name={u.name} size="sm"/> {u.name}</span></td><td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{u.email}</td><td>{u.role}</td><td><Badge status={u.status}>{u.status}</Badge></td></tr>
            ))}</tbody>
          </table>
        </div>
      ) : tab === "customers" ? (
        <div className="tbl-wrap tickets-table-wrap">
          <Toolbar placeholder="Search customers..." count={customers.filter((c) => match(c.name)).length} total={o.usage.customers.limit} unit="customers"/>
          <table className="tbl"><thead><tr><th>Customer</th><th>Status</th><th style={{ textAlign: "right" }}>Reps</th><th style={{ textAlign: "right" }}>Open</th><th style={{ textAlign: "right" }}>Total</th></tr></thead>
            <tbody>{customers.filter((c) => match(c.name)).map((c) => (
              <tr key={c.id} className={c.status === "Archived" ? "archived-row" : ""}><td style={{ fontWeight: 500 }}>{c.name}</td><td><Badge status={c.status}>{c.status}</Badge></td><td className="mono" style={{ textAlign: "right" }}>{c.reps}</td><td className="mono" style={{ textAlign: "right", fontWeight: 600 }}>{c.open}</td><td className="mono" style={{ textAlign: "right", color: "var(--text-muted)" }}>{c.total}</td></tr>
            ))}</tbody>
          </table>
        </div>
      ) : tab === "products" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {products.length === 0 ? <Card><EmptyState icon="package" title="No products yet"/></Card> : products.filter((p) => match(p.name)).map((p) => (
            <div key={p.id} className="card card-pad">
              <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}><div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--surface-muted)", display: "grid", placeItems: "center" }}><Icon name="package" size={18}/></div><Badge status={p.status}>{p.status}</Badge></div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div><div className="mono" style={{ fontSize: 11, color: "var(--text-subtle)" }}>{p.id}</div>
              <div className="row" style={{ marginTop: 12, gap: 16, fontSize: 12.5, color: "var(--text-muted)" }}><span className="row-tight"><Icon name="users" size={13}/> {p.customers} customers</span><span className="row-tight"><Icon name="ticket" size={13}/> {p.open} open</span></div>
            </div>
          ))}
        </div>
      ) : tab === "tickets" ? (
        <div className="tbl-wrap tickets-table-wrap">
          <Toolbar placeholder="Search tickets..." count={tickets.filter((t) => match(t.subject) || match(t.customer)).length} unit={`of ${o.ticketsAll.toLocaleString()} recent`}/>
          {tickets.length === 0 ? <EmptyState icon="ticket" title="No tickets yet"/> : (
            <table className="tbl"><thead><tr><th>Ticket</th><th>Subject</th><th>Customer</th><th>Priority</th><th>Status</th><th>Agent</th><th>Updated</th></tr></thead>
              <tbody>{tickets.filter((t) => match(t.subject) || match(t.customer)).map((t, i) => (
                <tr key={i}><td className="mono" style={{ fontWeight: 600, fontSize: 12.5 }}>{t.id}</td><td style={{ fontWeight: 500, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.subject}</td><td>{t.customer}</td><td><Badge status={t.priority}>{t.priority}</Badge></td><td><Badge status={t.status}>{t.status}</Badge></td><td>{t.agent ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Avatar name={t.agent} size="sm"/> <span style={{ fontSize: 13 }}>{t.agent.split(" ")[0]}</span></span> : <span style={{ color: "var(--text-subtle)", fontStyle: "italic", fontSize: 13 }}>Unassigned</span>}</td><td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.updated}</td></tr>
              ))}</tbody>
            </table>
          )}
        </div>
      ) : tab === "billing" ? (
        <div className="two-col-7-5" style={{ alignItems: "start" }}>
          <Card title="Invoices" pad={false}>
            {orgInvoices.length === 0 ? <div style={{ padding: 20 }}><EmptyState icon="card" title="No invoices yet" desc="Invoices appear here once the organization is billed."/></div> : (
              <table className="tbl"><thead><tr><th>Invoice</th><th>Date</th><th style={{ textAlign: "right" }}>Amount</th><th style={{ textAlign: "right" }}>Status</th><th></th></tr></thead>
                <tbody>{orgInvoices.map((iv) => (
                  <tr key={iv.id}><td className="mono" style={{ fontWeight: 600, fontSize: 12.5 }}>{iv.id}</td><td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{iv.date}</td><td className="mono" style={{ textAlign: "right", fontWeight: 600 }}>{money(iv.amount)}</td><td style={{ textAlign: "right" }}><Badge status={iv.status}>{iv.status}</Badge></td><td style={{ textAlign: "right" }}>{iv.status !== "Paid" ? <Button variant="ghost" size="xs" onClick={() => { updateInvoice(iv.id, "Paid", `Marked invoice ${iv.id} as paid`); toast.success(`${iv.id} marked paid.`); }}>Mark paid</Button> : null}</td></tr>
                ))}</tbody>
              </table>
            )}
          </Card>
          <div className="side-panel">
            <div className="side-card"><div className="side-hd"><b>Subscription</b></div><div className="side-bd"><dl className="dl"><dt>Plan</dt><dd><Badge status={o.package}>{o.package}</Badge></dd><dt>Price</dt><dd className="mono">{o.mrr ? money(o.mrr) + "/mo" : "Trial"}</dd><dt>Billing</dt><dd><Badge status={o.billing}>{o.billing}</Badge></dd><dt>Renews</dt><dd>{o.renews}</dd></dl></div></div>
            <Card title="Lifetime value"><div className="mono" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{money(orgInvoices.filter((iv) => iv.status === "Paid").reduce((a, iv) => a + iv.amount, 0))}</div><div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Collected to date</div></Card>
          </div>
        </div>
      ) : (
        <Card title="Account activity" pad={false}>
          <div className="card-bd">
            {orgEvents.length === 0 ? <EmptyState icon="history" title="No recorded activity" desc="Platform actions on this organization will appear here."/> : (
              <div className="timeline">{orgEvents.map((a, i) => (<div key={i} className="timeline-item"><span className={`tldot ${auditMeta(a.type).cls === "badge-suspended" ? "warn" : "info"}`}/><div className="tl-body"><div>{a.action}</div><div className="tl-time mono">{a.actor} · {a.ts}</div></div></div>))}</div>
            )}
          </div>
        </Card>
      )}

      <Modal open={confirmSuspend} onClose={() => setConfirmSuspend(false)} title={`${o.status === "Suspended" ? "Reactivate" : "Suspend"} ${o.name}?`} actions={<><Button variant="ghost" onClick={() => setConfirmSuspend(false)}>Cancel</Button><Button variant={o.status === "Suspended" ? "primary" : "destructive"} onClick={toggleSuspend}>{o.status === "Suspended" ? "Reactivate" : "Suspend"} organization</Button></>}>
        <p>{o.status === "Suspended" ? "The organization will regain access to their workspace immediately." : "Members will lose access to their workspace until reactivated. Their data is preserved."}</p>
      </Modal>
    </>
  );
};

// ── Packages ─────────────────────────────────────────────────────────────────
const Packages = () => {
  const { data, addPackage, updatePackage } = useHQ();
  const toast = useToast();
  const [editor, setEditor] = useState(null);
  const orgCount = (name) => data.orgs.filter((o) => o.package === name).length;
  const revenue = (name) => data.orgs.filter((o) => o.package === name).reduce((a, o) => a + o.mrr, 0);
  return (
    <>
      <div className="page-hd"><div><h1>Packages & plans</h1><p className="sub">Define the license tiers organizations subscribe to.</p></div><div className="actions"><Button variant="primary" icon="plus" onClick={() => setEditor({ mode: "create", pkg: { name: "", price: 0, desc: "", limits: { customers: 5, tickets: 500, users: 3, products: 1 } } })}>Create package</Button></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {data.packages.map((p) => (
          <div key={p.id} className="card card-pad">
            <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <div><div className="row" style={{ gap: 8 }}><span style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</span><Badge status={p.name}>{p.name}</Badge></div><div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>{p.desc}</div></div>
              <KebabMenu items={[{ label: "Edit package", icon: "edit", onClick: () => setEditor({ mode: "edit", pkg: p }) }]}/>
            </div>
            <div className="row" style={{ alignItems: "baseline", gap: 4, margin: "14px 0 6px" }}><span className="mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{money(p.price)}</span><span style={{ color: "var(--text-muted)", fontSize: 13 }}>/ month</span></div>
            <div className="divider" style={{ margin: "10px 0 12px" }}/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12.5 }}>
              <div><span style={{ color: "var(--text-muted)" }}>Customers</span> <b className="mono">{p.limits.customers}</b></div>
              <div><span style={{ color: "var(--text-muted)" }}>Tickets</span> <b className="mono">{p.limits.tickets.toLocaleString()}</b></div>
              <div><span style={{ color: "var(--text-muted)" }}>Users</span> <b className="mono">{p.limits.users}</b></div>
              <div><span style={{ color: "var(--text-muted)" }}>Products</span> <b className="mono">{p.limits.products}</b></div>
            </div>
            <div className="divider" style={{ margin: "12px 0 10px" }}/>
            <div className="row" style={{ justifyContent: "space-between", fontSize: 12.5 }}><span className="row-tight" style={{ color: "var(--text-muted)" }}><Icon name="building" size={13}/> {orgCount(p.name)} orgs</span><span className="mono" style={{ fontWeight: 600 }}>{money(revenue(p.name))} MRR</span></div>
          </div>
        ))}
      </div>
      {editor ? <PackageEditor state={editor} onClose={() => setEditor(null)} onSave={(pkg) => { if (editor.mode === "edit") { updatePackage(editor.pkg.id, pkg); toast.success(`${pkg.name} updated.`); } else { addPackage(pkg); toast.success(`${pkg.name} created.`); } setEditor(null); }}/> : null}
    </>
  );
};

const PackageEditor = ({ state, onClose, onSave }) => {
  const base = state.pkg;
  const [name, setName] = useState(base.name || "");
  const [price, setPrice] = useState(base.price || 0);
  const [desc, setDesc] = useState(base.desc || "");
  const [limits, setLimits] = useState({ ...base.limits });
  const setLim = (k, v) => setLimits((l) => ({ ...l, [k]: Math.max(0, parseInt(v || 0, 10)) }));
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ width: "min(560px, calc(100vw - 32px))" }}>
        <h2>{state.mode === "edit" ? `Edit ${base.name}` : "Create a package"}</h2>
        <p>Set the price and the limits this plan grants to an organization.</p>
        <div className="two-col-1-1"><div className="field"><label className="label">Name <span className="required">*</span></label><input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pro" autoFocus/></div><div className="field"><label className="label">Price / month (USD)</label><input className="input mono" type="number" value={price} onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value || 0, 10)))}/></div></div>
        <div className="field" style={{ marginTop: 12 }}><label className="label">Description</label><input className="input" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short summary"/></div>
        <label className="label" style={{ marginTop: 12 }}>Limits</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["customers", "Customers"], ["tickets", "Tickets / period"], ["users", "Users"], ["products", "Products"]].map(([k, lbl]) => (
            <div key={k} className="field" style={{ margin: 0 }}><label className="label" style={{ fontSize: 12 }}>{lbl}</label><input className="input mono" type="number" value={limits[k]} onChange={(e) => setLim(k, e.target.value)}/></div>
          ))}
        </div>
        <div className="modal-actions" style={{ marginTop: 16 }}><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant="primary" icon="check" disabled={!name.trim()} onClick={() => onSave({ name: name.trim(), price, desc: desc.trim(), limits })}>{state.mode === "edit" ? "Save changes" : "Create package"}</Button></div>
      </div>
    </div>
  );
};

// ── Billing ──────────────────────────────────────────────────────────────────
const Billing = () => {
  const { data, updateInvoice } = useHQ();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const mrr = data.orgs.reduce((a, o) => a + o.mrr, 0);
  const collected = data.invoices.filter((i) => i.status === "Paid").reduce((a, i) => a + i.amount, 0);
  const outstanding = data.invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + i.amount, 0);
  const overdue = data.invoices.filter((i) => i.status === "Overdue").reduce((a, i) => a + i.amount, 0);
  const filtered = data.invoices.filter((i) => (!search || i.org.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase())) && (status === "All" || i.status === status));
  const sorters = { id: (a, b) => a.id.localeCompare(b.id), org: (a, b) => a.org.localeCompare(b.org), amount: (a, b) => a.amount - b.amount, status: (a, b) => a.status.localeCompare(b.status), date: (a, b) => new Date(a.date) - new Date(b.date) };
  const rows = applySort(filtered, sort, sorters);
  const anyFilter = search || status !== "All" || sort.key;
  return (
    <>
      <div className="page-hd"><div><h1>Billing & subscriptions</h1><p className="sub">Revenue, invoices and payment status across all organizations.</p></div><div className="actions"><Button variant="secondary" size="sm" icon="download">Export</Button><Button variant="primary" size="sm" icon="refresh" onClick={() => toast.success("Billing run queued for all due accounts.")}>Run billing</Button></div></div>
      <div className="stat-grid">
        <StatCard label="MRR" value={money(mrr)} trend="↑ 12% vs last month" trendDir="up" sparkData={[3.6,3.9,4.1,4.3,4.5,4.7,mrr / 1000].map((x) => x * 1000)}/>
        <StatCard label="Collected (period)" value={money(collected)} sub={`${data.invoices.filter((i) => i.status === "Paid").length} invoices paid`} sparkColor="var(--chart-2)"/>
        <StatCard label="Outstanding" value={money(outstanding)} trend={`${data.invoices.filter((i) => i.status !== "Paid").length} unpaid`} trendDir="flat" sparkColor="var(--chart-3)"/>
        <StatCard label="Overdue" value={money(overdue)} trend={overdue ? "Needs follow-up" : "All clear"} trendDir={overdue ? "down" : "flat"} sparkColor="var(--destructive)"/>
      </div>
      <div className="tbl-wrap tickets-table-wrap">
        <div className="tbl-toolbar"><div className="input-wrap" style={{ flex: 1, maxWidth: 380 }}><span className="input-icon"><Icon name="search" size={15}/></span><input className="input has-icon" style={{ height: 36 }} placeholder="Search invoices or organizations..." value={search} onChange={(e) => setSearch(e.target.value)}/></div><div className="spacer"/><span style={{ fontSize: 12.5, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{rows.length} of {data.invoices.length}</span>{anyFilter ? <Button variant="ghost" size="sm" icon="x" onClick={() => { setSearch(""); setStatus("All"); setSort({ key: null, dir: "asc" }); }}>Reset</Button> : null}</div>
        <table className="tbl">
          <thead><tr>
            <th><Th label="Invoice" sortKey="id" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
            <th><Th label="Organization" sortKey="org" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
            <th>Plan</th>
            <th><Th label="Date" sortKey="date" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
            <th><Th label="Amount" sortKey="amount" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
            <th><Th label="Status" sortKey="status" sort={sort} onSort={(k) => cycleSort(setSort, k)} filter={{ value: status, set: setStatus, all: "All", options: ["All", "Paid", "Due", "Overdue"] }}/></th>
            <th></th>
          </tr></thead>
          <tbody>{rows.map((iv) => (
            <tr key={iv.id}><td className="mono" style={{ fontWeight: 600, fontSize: 12.5 }}>{iv.id}</td><td style={{ fontWeight: 500 }}>{iv.org}</td><td><Badge status={iv.package}>{iv.package}</Badge></td><td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{iv.date}</td><td className="mono" style={{ fontWeight: 600 }}>{money(iv.amount)}</td><td><Badge status={iv.status}>{iv.status}</Badge></td><td><div onClick={(e) => e.stopPropagation()}>{iv.status !== "Paid" ? <Button variant="ghost" size="xs" onClick={() => { updateInvoice(iv.id, "Paid", `Marked invoice ${iv.id} as paid`); toast.success(`${iv.id} marked paid.`); }}>Mark paid</Button> : <KebabMenu items={[{ label: "Download PDF", icon: "download" }, { label: "Send receipt", icon: "mail" }]}/>}</div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
};

// ── Support inbox ────────────────────────────────────────────────────────────
const SupportInbox = () => {
  const { data, resolveRequest } = useHQ();
  const toast = useToast();
  const navigate = (to) => { window.location.hash = to; };
  const [tab, setTab] = useState("open");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const list = data.support.filter((r) => (tab === "open" ? r.status === "Open" : tab === "resolved" ? r.status === "Resolved" : true) && (type === "All" || r.type === type));
  const sorters = { org: (a, b) => a.org.localeCompare(b.org), type: (a, b) => a.type.localeCompare(b.type), priority: (a, b) => ["Low", "Medium", "High"].indexOf(a.priority) - ["Low", "Medium", "High"].indexOf(b.priority), created: (a, b) => new Date(a.created) - new Date(b.created) };
  const rows = applySort(list, sort, sorters);
  const openN = data.support.filter((r) => r.status === "Open").length;
  return (
    <>
      <div className="page-hd"><div><h1>Support inbox</h1><p className="sub">Upgrade, capacity and billing requests from organizations.</p></div></div>
      <div className="tabs">
        <button className={`tab ${tab === "open" ? "active" : ""}`} onClick={() => setTab("open")}>Open <span className="tab-count">{openN}</span></button>
        <button className={`tab ${tab === "resolved" ? "active" : ""}`} onClick={() => setTab("resolved")}>Resolved</button>
        <button className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>All</button>
      </div>
      <div className="tbl-wrap tickets-table-wrap">
        <div className="tbl-toolbar"><span style={{ fontSize: 13, fontWeight: 600 }}>{rows.length} request{rows.length === 1 ? "" : "s"}</span><div className="spacer"/></div>
        {rows.length === 0 ? <EmptyState icon="inbox" title="Inbox zero" desc="No requests in this view."/> : (
          <table className="tbl">
            <thead><tr>
              <th>Request</th>
              <th><Th label="Organization" sortKey="org" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th><Th label="Type" sortKey="type" sort={sort} onSort={(k) => cycleSort(setSort, k)} filter={{ value: type, set: setType, all: "All", options: ["All", "Upgrade", "Capacity", "Billing", "Issue"] }}/></th>
              <th>Subject</th>
              <th><Th label="Priority" sortKey="priority" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th><Th label="Created" sortKey="created" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
              <th>Status</th><th></th>
            </tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.id}>
                <td className="mono" style={{ fontWeight: 600, fontSize: 12.5 }}>{r.id}</td>
                <td><a onClick={() => navigate("/orgs/" + r.orgId)} style={{ fontWeight: 500, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}>{r.org}</a></td>
                <td><Badge status="soft">{r.type}</Badge></td>
                <td style={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.subject}</td>
                <td><Badge status={r.priority}>{r.priority}</Badge></td>
                <td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.created}</td>
                <td><Badge status={r.status} dot>{r.status}</Badge></td>
                <td>{r.status === "Open" ? <Button variant="ghost" size="xs" icon="check" onClick={() => { resolveRequest(r.id); toast.success(`${r.id} resolved.`); }}>Resolve</Button> : null}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </>
  );
};

// ── Reports ──────────────────────────────────────────────────────────────────
const Reports = () => {
  const { data } = useHQ();
  const [tab, setTab] = useState("growth");
  const orgs = data.orgs;
  const mrr = orgs.reduce((a, o) => a + o.mrr, 0);
  const byPlan = PACKAGES.map((p) => ({ label: p.name, values: [orgs.filter((o) => o.package === p.name).length] }));
  const revByPlan = PACKAGES.map((p) => ({ label: p.name, values: [orgs.filter((o) => o.package === p.name).reduce((a, o) => a + o.mrr, 0)] }));
  const topOrgs = [...orgs].sort((a, b) => b.mrr - a.mrr).slice(0, 6);
  const byRegion = Object.entries(orgs.reduce((m, o) => { const r = o.region.split(",")[1]?.trim() || o.region; m[r] = (m[r] || 0) + 1; return m; }, {})).map(([k, v]) => ({ label: k, values: [v] }));
  return (
    <>
      <div className="page-hd"><div><h1>Reports</h1><p className="sub">Platform growth, revenue and utilization — last 30 days.</p></div><div className="actions"><Button variant="ghost" icon="download" size="sm">Export CSV</Button></div></div>
      <div className="tabs">{["growth", "revenue", "utilization"].map((k) => <button key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{k[0].toUpperCase() + k.slice(1)}</button>)}</div>
      {tab === "growth" ? (
        <>
          <div className="stat-grid">
            <StatCard label="Total organizations" value={orgs.length} trend="↑ 3 this month" trendDir="up" sparkData={[6,7,8,9,10,11,orgs.length]}/>
            <StatCard label="Active" value={orgs.filter((o) => o.status === "Active").length} sub="Paying customers" sparkColor="var(--chart-2)"/>
            <StatCard label="On trial" value={orgs.filter((o) => o.status === "Trial").length} trend="Converting soon" trendDir="up" sparkColor="var(--chart-3)"/>
            <StatCard label="Churn (90d)" value="1.8%" trend="↓ 0.4% vs prev." trendDir="down" sparkColor="var(--chart-4)"/>
          </div>
          <div className="two-col-1-1" style={{ marginBottom: 16 }}><Card title="Organizations by plan"><BarChart data={byPlan} colors={["var(--chart-2)"]}/></Card><Card title="Organizations by region"><BarChart data={byRegion} colors={["var(--chart-1)"]}/></Card></div>
          <Card className="chart-card"><div className="chart-title"><span className="big mono">{orgs.length}</span><h3>organizations · growth over 12 months</h3></div><LineChart data={{ labels: ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"], values: [4,5,6,7,8,9,9,10,10,11,11,orgs.length], unit: "orgs" }}/></Card>
        </>
      ) : tab === "revenue" ? (
        <>
          <div className="stat-grid">
            <StatCard label="MRR" value={money(mrr)} trend="↑ 12% vs prev." trendDir="up" sparkData={[3.6,3.9,4.1,4.3,4.5,4.7,mrr / 1000].map((x) => x * 1000)}/>
            <StatCard label="ARR (annualized)" value={money(mrr * 12)} sub="Run-rate" sparkColor="var(--chart-2)"/>
            <StatCard label="ARPA" value={money(Math.round(mrr / orgs.filter((o) => o.mrr).length))} sub="Avg. revenue / account" sparkColor="var(--chart-3)"/>
            <StatCard label="Expansion" value="+$1,398" trend="2 plan upgrades" trendDir="up" sparkColor="var(--chart-1)"/>
          </div>
          <div className="two-col-1-1" style={{ marginBottom: 16 }}><Card title="MRR by plan"><BarChart data={revByPlan} colors={["var(--chart-2)"]}/></Card>
            <Card title="Top organizations by revenue" pad={false}><table className="tbl"><thead><tr><th>Organization</th><th>Plan</th><th style={{ textAlign: "right" }}>MRR</th></tr></thead><tbody>{topOrgs.map((o) => <tr key={o.id}><td><span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}><Avatar name={o.name} size="sm"/> {o.name}</span></td><td><Badge status={o.package}>{o.package}</Badge></td><td className="mono" style={{ textAlign: "right" }}>{o.mrr ? money(o.mrr) : "—"}</td></tr>)}</tbody></table></Card>
          </div>
        </>
      ) : (
        <>
          <div className="banner warn" style={{ marginBottom: 16 }}><span className="icon"><Icon name="warning" size={16}/></span><div>{orgs.filter((o) => pctOf(o.usage) >= 90).length} organizations are above 90% of their plan limits — good upsell candidates.</div></div>
          <Card title="License utilization by organization" pad={false}>
            <table className="tbl"><thead><tr><th>Organization</th><th>Plan</th><th style={{ minWidth: 160 }}>Utilization</th><th style={{ textAlign: "right" }}>Status</th></tr></thead>
              <tbody>{[...orgs].sort((a, b) => pctOf(b.usage) - pctOf(a.usage)).map((o) => { const pct = pctOf(o.usage); return (<tr key={o.id}><td style={{ fontWeight: 500 }}>{o.name}</td><td><Badge status={o.package}>{o.package}</Badge></td><td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className={`prog ${pct >= 90 ? "danger" : pct >= 75 ? "warn" : ""}`} style={{ flex: 1, maxWidth: 160 }}><div className="bar" style={{ width: pct + "%" }}/></div><span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{pct}%</span></div></td><td style={{ textAlign: "right" }}>{pct >= 90 ? <Badge status="suspended">Upsell</Badge> : pct >= 75 ? <Badge status="warning">High</Badge> : <Badge status="active">Healthy</Badge>}</td></tr>); })}</tbody>
            </table>
          </Card>
        </>
      )}
    </>
  );
};

// ── Audit trail ──────────────────────────────────────────────────────────────
const AuditTrail = () => {
  const { data } = useHQ();
  const toast = useToast();
  const [q, setQ] = useState(""); const [type, setType] = useState("all"); const [actor, setActor] = useState("all");
  const [sort, setSort] = useState({ key: null, dir: "asc" }); const [page, setPage] = useState(1); const [detail, setDetail] = useState(null); const perPage = 8;
  const actors = useMemo(() => Array.from(new Set(data.audit.map((a) => a.actor))), [data.audit]);
  const filtered = data.audit.filter((a) => (type === "all" || a.type === type) && (actor === "all" || a.actor === actor) && (!q.trim() || `${a.actor} ${a.action} ${a.target || ""}`.toLowerCase().includes(q.trim().toLowerCase())));
  const sorters = { ts: (a, b) => auditTsParse(a.ts) - auditTsParse(b.ts), actor: (a, b) => a.actor.localeCompare(b.actor), action: (a, b) => a.action.localeCompare(b.action), type: (a, b) => a.type.localeCompare(b.type) };
  const sorted = applySort(filtered, sort, sorters);
  useEffect(() => { setPage(1); }, [type, actor, q, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const rows = sorted.slice((page - 1) * perPage, page * perPage);
  const anyFilter = q || type !== "all" || actor !== "all" || sort.key;
  const reset = () => { setQ(""); setType("all"); setActor("all"); setSort({ key: null, dir: "asc" }); };
  return (
    <>
      <div className="page-hd"><div><h1>Audit trail</h1><p className="sub">Every action taken across the platform console.</p></div><div className="actions"><Button variant="secondary" size="sm" icon="download" onClick={() => toast.success(`Exporting ${sorted.length} events to CSV…`, "Export started")}>Export log</Button></div></div>
      <div className="tbl-wrap tickets-table-wrap">
        <div className="tbl-toolbar"><div className="input-wrap" style={{ flex: 1, maxWidth: 380 }}><span className="input-icon"><Icon name="search" size={15}/></span><input className="input has-icon" style={{ height: 36 }} placeholder="Search by user, action or target..." value={q} onChange={(e) => setQ(e.target.value)}/></div><div className="spacer"/><span style={{ fontSize: 12.5, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{sorted.length} of {data.audit.length} events</span>{anyFilter ? <Button variant="ghost" size="sm" icon="x" onClick={reset}>Reset</Button> : null}</div>
        {sorted.length === 0 ? <EmptyState icon="history" title="No matching events" action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}/> : (
          <>
            <table className="tbl">
              <thead><tr>
                <th style={{ minWidth: 150 }}><Th label="Timestamp" sortKey="ts" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
                <th><Th label="User" sortKey="actor" sort={sort} onSort={(k) => cycleSort(setSort, k)} filter={{ value: actor, set: setActor, all: "all", options: [{ value: "all", label: "All users" }, ...actors.map((a) => ({ value: a, label: a }))] }}/></th>
                <th><Th label="Action" sortKey="action" sort={sort} onSort={(k) => cycleSort(setSort, k)}/></th>
                <th>Target</th>
                <th><Th label="Event" sortKey="type" sort={sort} onSort={(k) => cycleSort(setSort, k)} filter={{ value: type, set: setType, all: "all", options: [{ value: "all", label: "All events" }, ...Object.keys(AUDIT_TYPES).map((k) => ({ value: k, label: AUDIT_TYPES[k].label }))] }}/></th>
              </tr></thead>
              <tbody>{rows.map((a) => { const m = auditMeta(a.type); return (
                <tr key={a.id} className="clickable" onClick={() => setDetail(a)} title="View event details">
                  <td className="mono" style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{a.ts}</td>
                  <td><span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500, whiteSpace: "nowrap" }}><Avatar name={a.actor} size="sm"/> {a.actor}</span></td>
                  <td style={{ minWidth: 280 }}>{a.action}</td>
                  <td>{a.target ? <span className="mono" style={{ fontSize: 12 }}>{a.target}</span> : <span style={{ color: "var(--text-subtle)" }}>—</span>}</td>
                  <td><span className={`badge ${m.cls}`}>{m.label}</span></td>
                </tr>
              ); })}</tbody>
            </table>
            <Pagination page={page} totalPages={totalPages} onPage={setPage} summary={`Showing ${(page - 1) * perPage + 1}–${Math.min(page * perPage, sorted.length)} of ${sorted.length} events`}/>
          </>
        )}
      </div>
      <AuditDetailModal entry={detail} onClose={() => setDetail(null)}/>
    </>
  );
};

const AuditDetailModal = ({ entry, onClose }) => {
  if (!entry) return null;
  const m = auditMeta(entry.type); const src = sourceFor(entry);
  const Row = ({ label, children, mono }) => (<div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, padding: "9px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}><div style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500 }}>{label}</div><div className={mono ? "mono" : ""} style={{ fontSize: 13 }}>{children}</div></div>);
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ width: "min(540px, calc(100vw - 32px))" }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}><h2 style={{ marginBottom: 0 }}>Event details</h2><span className={`badge ${m.cls}`}>{m.label}</span></div>
        <p style={{ marginBottom: 12 }}>{entry.action}</p>
        <div><Row label="Event ID" mono>{entry.id}</Row><Row label="Timestamp" mono>{entry.ts}</Row><Row label="User"><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Avatar name={entry.actor} size="sm"/> {entry.actor}</span></Row><Row label="Target" mono>{entry.target || "—"}</Row><Row label="Browser">{src.browser}{src.os ? ` · ${src.os}` : ""}</Row><Row label="IP address" mono>{src.ip}</Row><Row label="Location">{src.location || "—"}</Row></div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 11.5, color: "var(--text-subtle)" }}><Icon name="lock" size={12}/> Browser and OS are read from the session; the public IP is resolved live.</div>
        <div className="modal-actions" style={{ marginTop: 16 }}><Button variant="secondary" onClick={onClose}>Close</Button></div>
      </div>
    </div>
  );
};

// ── Team & roles ─────────────────────────────────────────────────────────────
const TeamRoles = () => {
  const { data, addAudit } = useHQ();
  const toast = useToast();
  const [tab, setTab] = useState("members");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invite, setInvite] = useState({ name: "", email: "", role: "Platform Admin" });
  const memberCount = (roleName) => data.operators.filter((u) => u.role === roleName).length;
  return (
    <>
      <div className="page-hd"><div><h1>Team & roles</h1><p className="sub">Your internal platform operators and their permissions.</p></div>{tab === "members" ? <Button variant="primary" icon="plus" onClick={() => setInviteOpen(true)}>Invite operator</Button> : null}</div>
      <div className="tabs">
        <button className={`tab ${tab === "members" ? "active" : ""}`} onClick={() => setTab("members")}>Operators <span className="tab-count">{data.operators.length}</span></button>
        <button className={`tab ${tab === "roles" ? "active" : ""}`} onClick={() => setTab("roles")}>Roles & permissions</button>
      </div>
      {tab === "members" ? (
        <div className="tbl-wrap">
          <table className="tbl"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Added</th><th></th></tr></thead>
            <tbody>{data.operators.map((u) => (
              <tr key={u.email}><td><span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}><Avatar name={u.name} size="sm"/> {u.name}</span></td><td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{u.email}</td><td>{u.role}</td><td><Badge status={u.status}>{u.status}</Badge></td><td className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{u.created}</td><td><KebabMenu items={[{ label: "Edit", icon: "edit" }, { label: "Change role", icon: "shield" }, { sep: true }, { label: "Deactivate", icon: "archive", destructive: true }]}/></td></tr>
            ))}</tbody>
          </table>
        </div>
      ) : (
        <div className="two-col-7-5" style={{ alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {data.roleDefs.map((r) => (
              <div key={r.key} className="card card-pad">
                <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div className="row" style={{ gap: 10, alignItems: "center", minWidth: 0 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-muted)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="shield" size={18}/></div><div style={{ minWidth: 0 }}><div className="row" style={{ gap: 8 }}><span style={{ fontWeight: 600 }}>{r.name}</span><Badge status="archived">System</Badge></div><div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{r.desc}</div></div></div>
                </div>
                <div className="row" style={{ marginTop: 12, gap: 16, fontSize: 12, color: "var(--text-muted)" }}><span className="row-tight"><Icon name="user" size={13}/> {memberCount(r.name)} member{memberCount(r.name) === 1 ? "" : "s"}</span><span className="row-tight"><Icon name="check-circle" size={13}/> {r.perms.length} permission{r.perms.length === 1 ? "" : "s"}</span></div>
              </div>
            ))}
          </div>
          <Card title="Permission matrix" pad={false}>
            <div style={{ overflow: "auto" }}>
              <table className="tbl"><thead><tr><th style={{ minWidth: 190 }}>Permission</th>{data.roleDefs.map((r) => <th key={r.key} style={{ textAlign: "center", whiteSpace: "nowrap" }}>{r.name.replace("Platform ", "")}</th>)}</tr></thead>
                <tbody>{data.permCatalog.map((p) => (<tr key={p.id}><td style={{ fontWeight: 500 }}>{p.label}</td>{data.roleDefs.map((r) => <td key={r.key} style={{ textAlign: "center", color: r.perms.includes(p.id) ? "var(--fg)" : "var(--text-subtle)" }}>{r.perms.includes(p.id) ? <Icon name="check" size={15} stroke={2.2}/> : "—"}</td>)}</tr>))}</tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite a platform operator" actions={<><Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button><Button variant="primary" icon="send" onClick={() => { setInviteOpen(false); addAudit(`Invited operator ${invite.email || "a new operator"} as ${invite.role}`, null, "team"); toast.success(`Invitation sent to ${invite.email || "the new operator"}.`); setInvite({ name: "", email: "", role: "Platform Admin" }); }}>Send invitation</Button></>}>
        <p>They'll receive an email to set a password and join the HelpDesk HQ console.</p>
        <div className="two-col-1-1"><div className="field"><label className="label">Full name</label><input className="input" placeholder="e.g. Zainab Bello" value={invite.name} onChange={(e) => setInvite({ ...invite, name: e.target.value })} autoFocus/></div><div className="field"><label className="label">Email</label><input className="input" type="email" placeholder="name@helpdesk.io" value={invite.email} onChange={(e) => setInvite({ ...invite, email: e.target.value })}/></div></div>
        <div className="field" style={{ marginTop: 12 }}><label className="label">Role</label><select className="select" value={invite.role} onChange={(e) => setInvite({ ...invite, role: e.target.value })}>{data.roleDefs.map((r) => <option key={r.key}>{r.name}</option>)}</select></div>
      </Modal>
    </>
  );
};

// ── Settings ─────────────────────────────────────────────────────────────────
const Settings = () => {
  const toast = useToast();
  const [trialDays, setTrialDays] = useState(14);
  const [autoSuspend, setAutoSuspend] = useState(true);
  const [notify, setNotify] = useState(true);
  const Toggle = ({ on, set }) => <button type="button" onClick={() => set(!on)} style={{ width: 44, height: 26, borderRadius: 999, border: 0, background: on ? "#000" : "var(--border-strong)", position: "relative", cursor: "pointer", flexShrink: 0 }}><span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left .15s" }}/></button>;
  return (
    <>
      <div className="page-hd"><div><h1>Settings</h1><p className="sub">Platform configuration and defaults.</p></div></div>
      <div className="main-body" style={{ padding: 0, maxWidth: 760 }}>
        <Card title="Platform">
          <div className="field"><label className="label">Platform name</label><input className="input" defaultValue="HelpDesk HQ"/></div>
          <div className="field" style={{ marginTop: 12 }}><label className="label">Billing email</label><input className="input" type="email" defaultValue="billing@helpdesk.io"/></div>
        </Card>
        <Card title="Onboarding defaults" style={{ marginTop: 16 }}>
          <div className="field"><label className="label">Default trial length (days)</label><input className="input mono" type="number" value={trialDays} onChange={(e) => setTrialDays(parseInt(e.target.value || 0, 10))} style={{ maxWidth: 160 }}/></div>
          <div className="divider"/>
          <div className="row" style={{ justifyContent: "space-between" }}><div><div style={{ fontWeight: 500, fontSize: 13.5 }}>Auto-suspend on non-payment</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>Suspend organizations 7 days after an invoice becomes overdue.</div></div><Toggle on={autoSuspend} set={setAutoSuspend}/></div>
          <div className="divider"/>
          <div className="row" style={{ justifyContent: "space-between" }}><div><div style={{ fontWeight: 500, fontSize: 13.5 }}>Capacity alerts</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>Notify the team when an org passes 90% of its plan limits.</div></div><Toggle on={notify} set={setNotify}/></div>
        </Card>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}><Button variant="primary" icon="check" onClick={() => toast.success("Platform settings saved.")}>Save changes</Button></div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// App
// ═══════════════════════════════════════════════════════════════════════════
const App = () => {
  const [route] = useHashRoute("/dashboard");
  let screen = null, params = null;
  if (route === "/login" || route === "/") return <Login/>;
  if (route === "/dashboard") screen = <Dashboard/>;
  else if (route === "/orgs") screen = <OrgsList/>;
  else if (route === "/orgs/new") screen = <OnboardOrg/>;
  else if ((params = matchRoute("/orgs/:id", route))) screen = <OrgDetail id={params.id}/>;
  else if (route === "/packages") screen = <Packages/>;
  else if (route === "/billing") screen = <Billing/>;
  else if (route === "/support") screen = <SupportInbox/>;
  else if (route === "/reports") screen = <Reports/>;
  else if (route === "/audit") screen = <AuditTrail/>;
  else if (route === "/team") screen = <TeamRoles/>;
  else if (route === "/settings") screen = <Settings/>;
  else screen = <Card><EmptyState icon="search" title="Page not found" desc={`No screen for ${route}`} action={<Button variant="primary" onClick={() => { window.location.hash = "/dashboard"; }}>Back to dashboard</Button>}/></Card>;
  return <HQLayout route={route}>{screen}</HQLayout>;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider><HQProvider><App/></HQProvider></ToastProvider>
);

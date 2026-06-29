"use client";

import { ReactNode, useMemo, useState } from 'react';
import { CheckCircle2, Filter, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { VoiceTextarea } from '@/components/VoiceTextarea';

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = Record<string, string>;

export type Panel = {
  title: string;
  value: string;
  detail: string;
};

export type Activity = {
  time: string;
  title: string;
  detail: string;
};

export type Stage = {
  label: string;
  count: string;
  items: string[];
};

export type ClientStat = {
  label: string;
  value: string;
  detail: string;
  iconNode: ReactNode;
};

type StaticModuleClientProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  stats: ClientStat[];
  tableTitle: string;
  tableBadge: string;
  columns: TableColumn[];
  rows: TableRow[];
  panels: Panel[];
  activities: Activity[];
  stages?: Stage[];
};

export function StaticModuleClient({
  eyebrow,
  title,
  description,
  primaryAction,
  stats,
  tableTitle,
  tableBadge,
  columns,
  rows,
  panels,
  activities,
  stages
}: StaticModuleClientProps) {
  const [query, setQuery] = useState('');
  const [actionOpen, setActionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState<TableRow | null>(null);
  const [saved, setSaved] = useState(false);

  const filteredRows = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return rows;
    return rows.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(search)));
  }, [query, rows]);

  function saveDemo() {
    setSaved(true);
    window.setTimeout(() => {
      setSaved(false);
      setActionOpen(false);
    }, 900);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-sidebar text-white shadow-card">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
          <div>
            <Badge className="bg-white/10 text-[#F5D891]">{eyebrow}</Badge>
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D7E0EF]">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => setActionOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D8AA4A]">
                <Plus size={17} />
                {primaryAction}
              </button>
              <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
                <Search size={17} />
                Advanced search
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  {stat.iconNode}
                  <MoreHorizontal size={17} className="text-[#9DB2D3]" />
                </div>
                <p className="mt-5 text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9DB2D3]">{stat.label}</p>
                <p className="mt-3 text-sm text-[#D7E0EF]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {stages ? (
        <section className="grid gap-4 xl:grid-cols-4">
          {stages.map((stage) => (
            <Card key={stage.label} className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{stage.label}</h3>
                <Badge variant="secondary">{stage.count}</Badge>
              </div>
              <div className="mt-5 space-y-3">
                {stage.items.map((item) => (
                  <button key={item} type="button" onClick={() => setQuery(item.split(' ')[0])} className="w-full rounded-2xl border border-border bg-background p-4 text-left text-sm font-medium transition hover:bg-white">
                    {item}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </section>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge>{tableBadge}</Badge>
              <h3 className="mt-3 text-xl font-semibold">{tableTitle}</h3>
            </div>
            <div className="flex h-11 min-w-[240px] items-center rounded-2xl border border-border bg-background px-3">
              <Search size={17} className="text-muted" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search this module" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid bg-background px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
                {columns.map((column) => (
                  <span key={column.key}>{column.label}</span>
                ))}
              </div>
              {filteredRows.map((row, index) => (
                <div
                  key={`${row[columns[0].key]}-${index}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetailOpen(row)}
                  onKeyDown={(event) => event.key === 'Enter' && setDetailOpen(row)}
                  className="grid cursor-pointer border-t border-border px-5 py-4 text-sm transition hover:bg-background/60"
                  style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                >
                  {columns.map((column, columnIndex) => (
                    <span key={column.key} className={columnIndex === 0 ? 'font-semibold text-text' : 'text-muted'}>
                      {row[column.key]}
                    </span>
                  ))}
                </div>
              ))}
              {!filteredRows.length ? (
                <div className="border-t border-border px-5 py-8 text-center text-sm text-muted">No static demo records match this search.</div>
              ) : null}
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="p-6">
            <Badge>Activity</Badge>
            <h3 className="mt-3 text-xl font-semibold">Today&apos;s movement</h3>
            <div className="mt-6 space-y-4">
              {activities.map((activity) => (
                <button key={`${activity.time}-${activity.title}`} type="button" onClick={() => setDetailOpen({ time: activity.time, title: activity.title, detail: activity.detail })} className="w-full rounded-2xl border border-border p-4 text-left transition hover:bg-background">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{activity.time}</p>
                  <p className="mt-2 font-semibold">{activity.title}</p>
                  <p className="mt-1 text-sm text-muted">{activity.detail}</p>
                </button>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {panels.map((panel) => (
              <button key={panel.title} type="button" onClick={() => setDetailOpen({ title: panel.title, value: panel.value, detail: panel.detail })} className="rounded-[28px] border border-border bg-surface p-5 text-left shadow-card transition hover:bg-background">
                <p className="text-sm text-muted">{panel.title}</p>
                <p className="mt-3 text-2xl font-semibold">{panel.value}</p>
                <p className="mt-2 text-sm text-muted">{panel.detail}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Modal
        open={actionOpen}
        onClose={() => setActionOpen(false)}
        title={primaryAction}
        description={`Static ${eyebrow.toLowerCase()} form. This is functional for the demo and ready to connect later.`}
        action={
          <>
            <button type="button" onClick={() => setActionOpen(false)} className="h-11 rounded-2xl border border-border px-4 text-sm font-semibold">
              Cancel
            </button>
            <button type="button" onClick={saveDemo} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              {saved ? <CheckCircle2 size={17} /> : <Plus size={17} />}
              {saved ? 'Saved' : 'Save demo'}
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="text-sm font-semibold text-text">Record title</span>
            <input className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" placeholder={rows[0]?.[columns[0]?.key] ?? 'New record'} />
          </label>
          <label>
            <span className="text-sm font-semibold text-text">Status</span>
            <select className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
              <option>Hot</option>
              <option>Follow-up</option>
              <option>Review</option>
              <option>Completed</option>
            </select>
          </label>
        </div>
        <VoiceTextarea label="Voice note for this record" placeholder="Speak the client note, task detail, payment update, or document instruction..." />
      </Modal>

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Advanced search" description={`Search within ${eyebrow.toLowerCase()} using filters or voice input.`}>
        <div className="flex h-12 items-center rounded-2xl border border-border bg-background px-4">
          <Filter size={18} className="text-muted" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Filter demo records..." />
        </div>
        <VoiceTextarea label="Voice filter" placeholder="Say a client name, property, amount, status, or team member..." minHeight="min-h-[88px]" />
        <div className="grid gap-3 sm:grid-cols-2">
          {columns.map((column) => (
            <button key={column.key} type="button" className="rounded-2xl border border-border bg-background p-4 text-left text-sm font-semibold transition hover:bg-white">
              Filter by {column.label}
            </button>
          ))}
        </div>
      </Modal>

      <Modal open={Boolean(detailOpen)} onClose={() => setDetailOpen(null)} title="Record preview" description="Clickable static row preview for the client demo.">
        <div className="grid gap-3 sm:grid-cols-2">
          {detailOpen
            ? Object.entries(detailOpen).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{key}</p>
                  <p className="mt-2 font-semibold">{value}</p>
                </div>
              ))
            : null}
        </div>
        <VoiceTextarea label="Follow-up voice note" placeholder="Dictate the next action for this record..." minHeight="min-h-[88px]" />
      </Modal>
    </div>
  );
}

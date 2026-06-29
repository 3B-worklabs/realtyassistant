import { LucideIcon, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type Stat = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

type TableColumn = {
  key: string;
  label: string;
};

type TableRow = Record<string, string>;

type Panel = {
  title: string;
  value: string;
  detail: string;
};

type Activity = {
  time: string;
  title: string;
  detail: string;
};

type Stage = {
  label: string;
  count: string;
  items: string[];
};

type StaticModulePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  stats: Stat[];
  tableTitle: string;
  tableBadge: string;
  columns: TableColumn[];
  rows: TableRow[];
  panels: Panel[];
  activities: Activity[];
  stages?: Stage[];
};

export function StaticModulePage({
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
}: StaticModulePageProps) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-sidebar text-white shadow-card">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
          <div>
            <Badge className="bg-white/10 text-[#F5D891]">{eyebrow}</Badge>
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D7E0EF]">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D8AA4A]">
                <Plus size={17} />
                {primaryAction}
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
                <Search size={17} />
                Advanced search
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <stat.icon size={20} className="text-[#F5D891]" />
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
                  <div key={item} className="rounded-2xl border border-border bg-background p-4 text-sm font-medium">
                    {item}
                  </div>
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
              <input className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search this module" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid bg-background px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
                {columns.map((column) => (
                  <span key={column.key}>{column.label}</span>
                ))}
              </div>
              {rows.map((row, index) => (
                <div
                  key={`${row[columns[0].key]}-${index}`}
                  className="grid border-t border-border px-5 py-4 text-sm"
                  style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                >
                  {columns.map((column, columnIndex) => (
                    <span key={column.key} className={columnIndex === 0 ? 'font-semibold text-text' : 'text-muted'}>
                      {row[column.key]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="p-6">
            <Badge>Activity</Badge>
            <h3 className="mt-3 text-xl font-semibold">Today&apos;s movement</h3>
            <div className="mt-6 space-y-4">
              {activities.map((activity) => (
                <div key={`${activity.time}-${activity.title}`} className="rounded-2xl border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{activity.time}</p>
                  <p className="mt-2 font-semibold">{activity.title}</p>
                  <p className="mt-1 text-sm text-muted">{activity.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {panels.map((panel) => (
              <Card key={panel.title} className="p-5">
                <p className="text-sm text-muted">{panel.title}</p>
                <p className="mt-3 text-2xl font-semibold">{panel.value}</p>
                <p className="mt-2 text-sm text-muted">{panel.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

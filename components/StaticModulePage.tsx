import { LucideIcon } from 'lucide-react';
import {
  Activity,
  Panel,
  Stage,
  StaticModuleClient,
  TableColumn,
  TableRow
} from '@/components/StaticModuleClient';

type Stat = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
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

export function StaticModulePage({ stats, ...props }: StaticModulePageProps) {
  return (
    <StaticModuleClient
      {...props}
      stats={stats.map(({ icon: Icon, ...stat }) => ({
        ...stat,
        iconNode: <Icon size={20} className="text-[#F5D891]" />
      }))}
    />
  );
}

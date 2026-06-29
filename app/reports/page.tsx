import { BarChart3, Download, IndianRupee, PieChart } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function ReportsPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Analytics"
        title="Executive reports for sales, rentals, marketing ROI, team productivity, and receivables."
        description="A premium static reporting suite for the client demo, designed to look like management-grade software from day one."
        primaryAction="Export report"
        stats={[
          { label: 'Pipeline value', value: '₹18.4Cr', detail: 'Weighted across active deals', icon: IndianRupee },
          { label: 'Team score', value: '92%', detail: 'DSR and follow-up completion', icon: BarChart3 },
          { label: 'Reports ready', value: '18', detail: 'PDF and spreadsheet previews', icon: Download },
          { label: 'Lead mix', value: '64%', detail: 'Paid channels contribution', icon: PieChart }
        ]}
        tableBadge="Report library"
        tableTitle="Saved management reports"
        columns={[
          { key: 'report', label: 'Report' },
          { key: 'period', label: 'Period' },
          { key: 'owner', label: 'Owner' },
          { key: 'format', label: 'Format' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { report: 'Monthly brokerage forecast', period: 'June 2026', owner: 'Admin', format: 'PDF', status: 'Ready' },
          { report: 'Marketing ROI by project', period: 'Last 30 days', owner: 'Aisha', format: 'Sheet', status: 'Ready' },
          { report: 'Team DSR summary', period: 'Today', owner: 'Omkar', format: 'PDF', status: 'Live' },
          { report: 'Receivables ageing', period: 'Quarter', owner: 'Finance', format: 'Sheet', status: 'Review' }
        ]}
        activities={[
          { time: '09:20 AM', title: 'Report generated', detail: 'Daily sales summary prepared for leadership.' },
          { time: '03:15 PM', title: 'ROI dashboard refreshed', detail: 'Campaign spend linked to hot pipeline value.' },
          { time: '06:30 PM', title: 'Export queued', detail: 'Receivables ageing report prepared for finance review.' }
        ]}
        panels={[
          { title: 'Best source', value: 'Meta Ads', detail: 'Highest qualified lead volume' },
          { title: 'Top project', value: 'Aurum Bay', detail: '₹5.45Cr active pipeline' },
          { title: 'At-risk deals', value: '06', detail: 'No activity in 5 days' }
        ]}
      />
    </DashboardShell>
  );
}

import { CheckCircle2, ClipboardList, PhoneCall, Route } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function DsrPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Daily report"
        title="Daily sales reporting for calls, visits, follow-ups, owner meetings, and closures."
        description="A static manager-ready DSR screen for reviewing team productivity without connecting the database yet."
        primaryAction="Log activity"
        stats={[
          { label: 'Calls logged', value: '186', detail: 'Across 7 team members', icon: PhoneCall },
          { label: 'Visits completed', value: '24', detail: '12 buyer, 8 tenant, 4 owner', icon: Route },
          { label: 'Tasks closed', value: '71', detail: '89 percent completion today', icon: CheckCircle2 },
          { label: 'Reports filed', value: '07', detail: 'All team DSRs submitted', icon: ClipboardList }
        ]}
        tableBadge="Team log"
        tableTitle="Daily performance summary"
        columns={[
          { key: 'member', label: 'Team member' },
          { key: 'calls', label: 'Calls' },
          { key: 'visits', label: 'Visits' },
          { key: 'followups', label: 'Follow-ups' },
          { key: 'summary', label: 'Summary' }
        ]}
        rows={[
          { member: 'Omkar', calls: '34', visits: '05', followups: '12', summary: 'Aurum Bay offer moved forward' },
          { member: 'Neha', calls: '29', visits: '03', followups: '10', summary: 'MetroEdge floor plans sent' },
          { member: 'Rahul', calls: '42', visits: '06', followups: '16', summary: 'Rental agreement draft closed' },
          { member: 'Aisha', calls: '25', visits: '02', followups: '09', summary: 'Owner inventory verified' }
        ]}
        activities={[
          { time: '10:10 AM', title: 'Morning standup', detail: 'Team priorities locked for hot leads and pending visits.' },
          { time: '01:30 PM', title: 'Manager review', detail: 'Open objections mapped against premium inventory.' },
          { time: '06:45 PM', title: 'DSR completed', detail: 'All field activities consolidated for final review.' }
        ]}
        panels={[
          { title: 'Productivity score', value: '92%', detail: 'Weighted by tasks and outcomes' },
          { title: 'Missed follow-ups', value: '05', detail: 'Moved to tomorrow morning' },
          { title: 'Field expenses', value: '₹18.2K', detail: 'Cab and site visit support' }
        ]}
      />
    </DashboardShell>
  );
}

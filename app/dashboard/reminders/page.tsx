import { AlarmClock, Bell, CalendarCheck, MessageSquareText } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function RemindersPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Reminders"
        title="Never miss client callbacks, owner updates, document deadlines, or payment follow-ups."
        description="A full static reminder center showing how brokers can plan priority actions across the day and week."
        primaryAction="New reminder"
        stats={[
          { label: 'Due today', value: '32', detail: '18 client, 9 owner, 5 admin', icon: Bell },
          { label: 'Overdue', value: '04', detail: 'Escalated to managers', icon: AlarmClock },
          { label: 'Auto messages', value: '126', detail: 'WhatsApp-ready reminders', icon: MessageSquareText },
          { label: 'Scheduled visits', value: '19', detail: 'Calendar-linked actions', icon: CalendarCheck }
        ]}
        stages={[
          { label: 'Morning', count: '11', items: ['Call Priya for token update', 'Confirm MetroEdge key pickup', 'Share Powai rental shortlist'] },
          { label: 'Afternoon', count: '09', items: ['Owner price confirmation', 'Send MOU correction', 'Follow up ad enquiries'] },
          { label: 'Evening', count: '08', items: ['Visit feedback call', 'Collect KYC from tenant', 'Send daily summary'] },
          { label: 'Tomorrow', count: '16', items: ['Legal draft review', 'Campaign budget approval', 'Owner photoshoot slot'] }
        ]}
        tableBadge="Task queue"
        tableTitle="Action reminders"
        columns={[
          { key: 'task', label: 'Task' },
          { key: 'linked', label: 'Linked record' },
          { key: 'owner', label: 'Owner' },
          { key: 'due', label: 'Due' },
          { key: 'priority', label: 'Priority' }
        ]}
        rows={[
          { task: 'Collect token receipt', linked: 'Aurum Bay - Mehta', owner: 'Omkar', due: '11:30 AM', priority: 'High' },
          { task: 'Confirm cab for visit', linked: 'MetroEdge - Nikhil', owner: 'Neha', due: '12:00 PM', priority: 'Medium' },
          { task: 'Send rental agreement', linked: 'Lakeside - Sneha', owner: 'Rahul', due: '02:30 PM', priority: 'High' },
          { task: 'Approve campaign copy', linked: 'Weekend launch', owner: 'Aisha', due: '05:00 PM', priority: 'Normal' }
        ]}
        activities={[
          { time: '09:00 AM', title: 'Reminder batch sent', detail: 'Morning client call queue delivered to team.' },
          { time: '12:05 PM', title: 'Deadline escalated', detail: 'Owner approval for Skyline pricing flagged.' },
          { time: '04:45 PM', title: 'Visit reminder', detail: 'Buyer and executive notified for Bandra site visit.' }
        ]}
        panels={[
          { title: 'SLA adherence', value: '96%', detail: 'On-time follow-up rate' },
          { title: 'WhatsApp drafts', value: '22', detail: 'Ready to send manually' },
          { title: 'Escalations', value: '04', detail: 'Need manager attention' }
        ]}
      />
    </DashboardShell>
  );
}

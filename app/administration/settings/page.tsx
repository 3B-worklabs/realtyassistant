import { BellRing, Building2, Settings, SlidersHorizontal } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function SettingsPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Workspace settings"
        title="Configure brokerage profile, modules, lead routing, notification rules, and document defaults."
        description="A static settings center that helps the client see how the product will adapt to their real business after backend setup."
        primaryAction="Save settings"
        stats={[
          { label: 'Enabled modules', value: '13', detail: 'CRM, docs, accounts, reports', icon: Settings },
          { label: 'Branches', value: '04', detail: 'Mumbai teams and territories', icon: Building2 },
          { label: 'Rules active', value: '28', detail: 'Lead routing and reminders', icon: SlidersHorizontal },
          { label: 'Alerts', value: '16', detail: 'Notification templates ready', icon: BellRing }
        ]}
        tableBadge="Configuration"
        tableTitle="Workspace controls"
        columns={[
          { key: 'setting', label: 'Setting' },
          { key: 'module', label: 'Module' },
          { key: 'value', label: 'Value' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { setting: 'Lead assignment rule', module: 'CRM', value: 'Round robin by branch', owner: 'Admin', status: 'Active' },
          { setting: 'Booking form prefix', module: 'Documents', value: 'BF-2026', owner: 'Operations', status: 'Active' },
          { setting: 'Brokerage tax rate', module: 'Accounts', value: '18% GST', owner: 'Finance', status: 'Review' },
          { setting: 'Reminder escalation', module: 'Operations', value: 'After 4 hours', owner: 'Manager', status: 'Active' }
        ]}
        activities={[
          { time: '10:35 AM', title: 'Routing rule edited', detail: 'Fresh paid leads assigned by project and branch.' },
          { time: '02:45 PM', title: 'Template updated', detail: 'Booking form footer changed to match company brand.' },
          { time: '06:10 PM', title: 'Notification enabled', detail: 'Token payment reminder switched on for all sales users.' }
        ]}
        panels={[
          { title: 'Brand theme', value: 'Navy Gold', detail: 'Premium broker workspace' },
          { title: 'Data backup', value: 'Daily', detail: 'Planned backend setting' },
          { title: 'Audit mode', value: 'On', detail: 'Track admin-level changes' }
        ]}
      />
    </DashboardShell>
  );
}

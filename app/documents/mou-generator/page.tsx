import { FileSignature, FileText, Layers3, Stamp } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function MouGeneratorPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="MOU generator"
        title="Prepare professional MOU drafts for sale, rental, channel partner, and brokerage agreements."
        description="The static generator screen shows templates, approval status, draft history, and field completeness for the client demo."
        primaryAction="Generate MOU"
        stats={[
          { label: 'Draft MOUs', value: '14', detail: '8 sale, 4 rental, 2 CP', icon: FileSignature },
          { label: 'Templates', value: '06', detail: 'Brokerage-ready formats', icon: Layers3 },
          { label: 'Stamped docs', value: '09', detail: 'Prepared for signing', icon: Stamp },
          { label: 'Archive', value: '88', detail: 'Completed document previews', icon: FileText }
        ]}
        stages={[
          { label: 'Select template', count: '06', items: ['Sale MOU', 'Rental MOU', 'Owner mandate'] },
          { label: 'Fill parties', count: '18', items: ['Buyer and seller details', 'Brokerage clause', 'Property schedule'] },
          { label: 'Review', count: '07', items: ['Legal wording check', 'Payment milestones', 'Possession terms'] },
          { label: 'Ready', count: '09', items: ['Download PDF', 'Send for signature', 'Mark as executed'] }
        ]}
        tableBadge="Draft desk"
        tableTitle="MOU document register"
        columns={[
          { key: 'doc', label: 'Document' },
          { key: 'party', label: 'Party' },
          { key: 'type', label: 'Type' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { doc: 'MOU-2201', party: 'Mehta family', type: 'Sale', owner: 'Omkar', status: 'Review' },
          { doc: 'MOU-2202', party: 'Sneha Kapoor', type: 'Rental', owner: 'Rahul', status: 'Draft' },
          { doc: 'MOU-2203', party: 'Aarav Developers', type: 'CP Mandate', owner: 'Admin', status: 'Ready' },
          { doc: 'MOU-2204', party: 'Jain Holdings', type: 'Commercial', owner: 'Neha', status: 'Legal' }
        ]}
        activities={[
          { time: '10:50 AM', title: 'Template selected', detail: 'Sale MOU template used for Aurum Bay booking.' },
          { time: '01:25 PM', title: 'Clause updated', detail: 'Brokerage payment milestone adjusted for channel mandate.' },
          { time: '05:05 PM', title: 'Draft ready', detail: 'Rental MOU prepared for tenant signature.' }
        ]}
        panels={[
          { title: 'Clause library', value: '42', detail: 'Reusable document clauses' },
          { title: 'Approval pending', value: '05', detail: 'Manager or legal sign-off' },
          { title: 'Download-ready', value: '09', detail: 'Clean static PDF previews' }
        ]}
      />
    </DashboardShell>
  );
}

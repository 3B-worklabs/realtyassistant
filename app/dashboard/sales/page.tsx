import { Building2, FileCheck2, IndianRupee, TrendingUp } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function SalesPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Sales desk"
        title="Track inventory, offers, booking progress, token payments, and closures in one premium sales board."
        description="Static sales data is shaped like a real brokerage workflow, so the client can understand the product before backend work begins."
        primaryAction="Create deal"
        stats={[
          { label: 'Open deals', value: '57', detail: '18 in high probability stage', icon: Building2 },
          { label: 'Booked value', value: '₹4.6Cr', detail: 'This month across 6 units', icon: IndianRupee },
          { label: 'Docs pending', value: '09', detail: 'PAN, Aadhar, payment proofs', icon: FileCheck2 },
          { label: 'Closure trend', value: '+24%', detail: 'Compared with last month', icon: TrendingUp }
        ]}
        stages={[
          { label: 'Property shared', count: '46', items: ['Skyline Habitat - 2.5 BHK', 'Aurum Bay - C Wing 1402', 'MetroEdge - Office 709'] },
          { label: 'Visit done', count: '22', items: ['Mehta family - Aurum Bay', 'Bafna Group - MetroEdge', 'Dev Malhotra - Opal Heights'] },
          { label: 'Offer made', count: '13', items: ['Aurum Bay - ₹5.32Cr offer', 'Skyline - ₹3.02Cr offer', 'MetroEdge - ₹1.84Cr offer'] },
          { label: 'Token received', count: '06', items: ['Lakeside Grandeur - ₹2L', 'Opal Heights - ₹5L', 'Aurum Bay - ₹10L'] }
        ]}
        tableBadge="Deal tracker"
        tableTitle="Sales pipeline"
        columns={[
          { key: 'deal', label: 'Deal' },
          { key: 'property', label: 'Property' },
          { key: 'amount', label: 'Amount' },
          { key: 'brokerage', label: 'Brokerage' },
          { key: 'stage', label: 'Stage' }
        ]}
        rows={[
          { deal: 'Mehta family', property: 'Aurum Bay Residences', amount: '₹5.45Cr', brokerage: '₹10.9L', stage: 'Token pending' },
          { deal: 'Jain Holdings', property: 'MetroEdge Business Park', amount: '₹1.9Cr', brokerage: '₹3.8L', stage: 'Negotiation' },
          { deal: 'Rohan Shah', property: 'Skyline Habitat', amount: '₹3.1Cr', brokerage: '₹6.2L', stage: 'Documentation' },
          { deal: 'Aarav Infra', property: 'Bulk channel mandate', amount: '₹12Cr', brokerage: '₹24L', stage: 'Proposal' }
        ]}
        activities={[
          { time: '10:00 AM', title: 'Offer revised', detail: 'Aurum Bay buyer increased offer by ₹12L after owner call.' },
          { time: '12:40 PM', title: 'Token proof uploaded', detail: 'Lakeside Grandeur payment screenshot received.' },
          { time: '03:30 PM', title: 'Agreement checklist sent', detail: 'Skyline Habitat documents moved to legal review.' }
        ]}
        panels={[
          { title: 'Expected brokerage', value: '₹48.2L', detail: 'Weighted monthly forecast' },
          { title: 'Ready inventory', value: '31', detail: 'Units available for immediate visit' },
          { title: 'Owner approvals', value: '07', detail: 'Awaiting price confirmation' }
        ]}
      />
    </DashboardShell>
  );
}

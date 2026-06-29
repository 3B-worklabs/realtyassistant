import { FileCheck2, FileText, PenLine, ShieldCheck } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function BookingFormsPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Booking documents"
        title="Generate polished booking forms with buyer, property, payment, and brokerage details."
        description="Static document UI demonstrates the complete booking form journey before PDF generation and backend storage are added."
        primaryAction="Create booking form"
        stats={[
          { label: 'Forms drafted', value: '18', detail: 'Awaiting buyer confirmation', icon: FileText },
          { label: 'Ready to sign', value: '07', detail: 'All required fields complete', icon: PenLine },
          { label: 'Verified KYC', value: '41', detail: 'Buyer and owner records', icon: ShieldCheck },
          { label: 'Completed forms', value: '126', detail: 'Static archive preview', icon: FileCheck2 }
        ]}
        tableBadge="Form register"
        tableTitle="Booking form workflow"
        columns={[
          { key: 'form', label: 'Form' },
          { key: 'buyer', label: 'Buyer' },
          { key: 'property', label: 'Property' },
          { key: 'amount', label: 'Token' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { form: 'BF-1042', buyer: 'Priya Mehta', property: 'Aurum Bay 1402', amount: '₹10L', status: 'Draft' },
          { form: 'BF-1043', buyer: 'Rohan Shah', property: 'Skyline Habitat 803', amount: '₹5L', status: 'Ready' },
          { form: 'BF-1044', buyer: 'Jain Holdings', property: 'MetroEdge 709', amount: '₹7.5L', status: 'Legal review' },
          { form: 'BF-1045', buyer: 'Sneha Kapoor', property: 'Lakeside Grandeur', amount: '₹2L', status: 'Signed' }
        ]}
        activities={[
          { time: '10:20 AM', title: 'Buyer details added', detail: 'PAN and Aadhar fields completed for Priya Mehta.' },
          { time: '12:10 PM', title: 'Payment section updated', detail: 'Token receipt attached to BF-1043.' },
          { time: '04:20 PM', title: 'Signature pending', detail: 'MetroEdge form sent to buyer for final confirmation.' }
        ]}
        panels={[
          { title: 'Missing fields', value: '09', detail: 'Across active drafts' },
          { title: 'Avg completion', value: '14 min', detail: 'From lead to draft' },
          { title: 'Legal flags', value: '03', detail: 'Need clause review' }
        ]}
      />
    </DashboardShell>
  );
}

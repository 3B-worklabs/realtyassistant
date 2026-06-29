import { Banknote, CreditCard, IndianRupee, ReceiptText } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function BankingPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Accounts"
        title="Monitor token payments, brokerage receivables, owner payouts, and campaign expenses."
        description="This finance view gives the client a clear static preview of money movement before ledger and bank integrations are added."
        primaryAction="Record payment"
        stats={[
          { label: 'Receivable', value: '₹38.8L', detail: 'Brokerage expected this month', icon: IndianRupee },
          { label: 'Token held', value: '₹27.5L', detail: 'Across 9 active deals', icon: Banknote },
          { label: 'Expenses', value: '₹4.2L', detail: 'Marketing and operations', icon: CreditCard },
          { label: 'Receipts', value: '73', detail: 'Static payment proofs', icon: ReceiptText }
        ]}
        tableBadge="Ledger"
        tableTitle="Payment and brokerage tracker"
        columns={[
          { key: 'entry', label: 'Entry' },
          { key: 'linked', label: 'Linked deal' },
          { key: 'amount', label: 'Amount' },
          { key: 'mode', label: 'Mode' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { entry: 'Token receipt', linked: 'Aurum Bay - Mehta', amount: '₹10L', mode: 'Bank transfer', status: 'Verified' },
          { entry: 'Brokerage invoice', linked: 'Skyline Habitat', amount: '₹6.2L', mode: 'Invoice', status: 'Raised' },
          { entry: 'Campaign spend', linked: 'Weekend launch', amount: '₹1.1L', mode: 'Card', status: 'Approved' },
          { entry: 'Rental brokerage', linked: 'Lakeside - Sneha', amount: '₹1.4L', mode: 'UPI', status: 'Pending' }
        ]}
        activities={[
          { time: '11:10 AM', title: 'Receipt verified', detail: 'Aurum Bay token receipt marked as reconciled.' },
          { time: '02:35 PM', title: 'Invoice generated', detail: 'Skyline brokerage invoice prepared for buyer.' },
          { time: '06:00 PM', title: 'Expense reviewed', detail: 'Weekend marketing spend moved to approved queue.' }
        ]}
        panels={[
          { title: 'Unreconciled', value: '₹8.4L', detail: 'Needs payment proof matching' },
          { title: 'Invoices due', value: '12', detail: 'Expected within 7 days' },
          { title: 'Net inflow', value: '₹24.1L', detail: 'Projected this month' }
        ]}
      />
    </DashboardShell>
  );
}

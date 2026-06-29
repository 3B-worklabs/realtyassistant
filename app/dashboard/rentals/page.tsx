import { CalendarDays, Home, IndianRupee, KeyRound } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function RentalsPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Rental desk"
        title="Manage rental enquiries, owner coordination, visit slots, deposits, and possession handovers."
        description="The rental module shows an end-to-end static flow for tenant requirements, shortlists, agreement status, and brokerage collection."
        primaryAction="Add rental lead"
        stats={[
          { label: 'Active rentals', value: '64', detail: '23 furnished premium homes', icon: Home },
          { label: 'Visits today', value: '12', detail: 'Powai, BKC, Bandra, Juhu', icon: CalendarDays },
          { label: 'Keys ready', value: '18', detail: 'Owner-approved for viewing', icon: KeyRound },
          { label: 'Monthly value', value: '₹42L', detail: 'Rent under active negotiation', icon: IndianRupee }
        ]}
        stages={[
          { label: 'Requirement', count: '28', items: ['Expat family - Juhu 4 BHK', 'Founder - BKC serviced apartment', 'Couple - Powai 2 BHK'] },
          { label: 'Shortlisted', count: '21', items: ['Lakeside Grandeur 1702', 'Bandra Crest 902', 'Juhu Palms Villa 4'] },
          { label: 'Agreement', count: '08', items: ['Powai lease draft', 'BKC lock-in review', 'Juhu owner KYC'] },
          { label: 'Possession', count: '04', items: ['Keys handover tomorrow', 'Police verification pending', 'Deposit receipt ready'] }
        ]}
        tableBadge="Rental pipeline"
        tableTitle="Tenant and owner coordination"
        columns={[
          { key: 'tenant', label: 'Tenant' },
          { key: 'location', label: 'Location' },
          { key: 'rent', label: 'Rent' },
          { key: 'owner', label: 'Owner' },
          { key: 'stage', label: 'Stage' }
        ]}
        rows={[
          { tenant: 'Sneha Kapoor', location: 'Powai furnished 2 BHK', rent: '₹1.4L/mo', owner: 'S. Iyer', stage: 'Visit' },
          { tenant: 'Arjun Rao', location: 'BKC serviced 1 BHK', rent: '₹2.2L/mo', owner: 'Patel Estates', stage: 'Negotiation' },
          { tenant: 'Mira Jain', location: 'Juhu 4 BHK', rent: '₹6.5L/mo', owner: 'Private owner', stage: 'Agreement' },
          { tenant: 'FinEdge Team', location: 'Andheri staff housing', rent: '₹3.8L/mo', owner: 'Kumar Realty', stage: 'Shortlist' }
        ]}
        activities={[
          { time: '09:30 AM', title: 'Key pickup confirmed', detail: 'Lakeside Grandeur keys available from lobby manager.' },
          { time: '02:00 PM', title: 'Agreement draft sent', detail: 'BKC lease draft shared with tenant and owner.' },
          { time: '05:15 PM', title: 'Deposit reminder', detail: 'Juhu tenant deposit due before possession block.' }
        ]}
        panels={[
          { title: 'Brokerage receivable', value: '₹14.6L', detail: 'From current rental pipeline' },
          { title: 'Vacant listings', value: '39', detail: 'Ready for immediate viewing' },
          { title: 'Agreement queue', value: '08', detail: 'Drafts needing review' }
        ]}
      />
    </DashboardShell>
  );
}

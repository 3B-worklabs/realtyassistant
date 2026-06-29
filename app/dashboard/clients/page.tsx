import { CalendarCheck, PhoneCall, Target, Users } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function ClientsPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Client CRM"
        title="Complete client command center for buyers, owners, tenants, and investors."
        description="A polished static view of enquiry capture, lead quality, assigned relationship managers, and next actions for the client walkthrough."
        primaryAction="Add client"
        stats={[
          { label: 'Active clients', value: '248', detail: '42 high-intent buyers', icon: Users },
          { label: 'Calls due', value: '36', detail: '12 scheduled before 2 PM', icon: PhoneCall },
          { label: 'Visits booked', value: '19', detail: 'Across 8 premium projects', icon: CalendarCheck },
          { label: 'Hot pipeline', value: '₹7.8Cr', detail: 'Likely closure in 21 days', icon: Target }
        ]}
        stages={[
          { label: 'New enquiry', count: '32', items: ['Aditi Rao - 3 BHK Worli', 'Nikhil Bafna - office lease', 'Karan Gill - villa investment'] },
          { label: 'Qualified', count: '84', items: ['Priya Mehta - Bandra West', 'Rohan Shah - Lower Parel', 'Aarav Infra - bulk mandate'] },
          { label: 'Visit planned', count: '27', items: ['Sneha Kapoor - Powai rental', 'Dev Malhotra - Thane resale', 'Mira Jain - Juhu duplex'] },
          { label: 'Negotiation', count: '11', items: ['Mehta family - Aurum Bay', 'Jain Holdings - MetroEdge', 'Kapoor Realty - owner deal'] }
        ]}
        tableBadge="Directory"
        tableTitle="Client master"
        columns={[
          { key: 'client', label: 'Client' },
          { key: 'requirement', label: 'Requirement' },
          { key: 'budget', label: 'Budget' },
          { key: 'owner', label: 'RM' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { client: 'Priya & Rohan Mehta', requirement: '3 BHK, Bandra sea-facing', budget: '₹5.2Cr', owner: 'Omkar', status: 'Hot' },
          { client: 'Nikhil Shah', requirement: 'Commercial office, Andheri', budget: '₹1.8Cr', owner: 'Neha', status: 'Visit' },
          { client: 'Sneha Kapoor', requirement: 'Furnished rental, Powai', budget: '₹1.4L/mo', owner: 'Rahul', status: 'Follow-up' },
          { client: 'Aarav Developers', requirement: 'Channel partner mandate', budget: '₹12Cr', owner: 'Admin', status: 'Negotiation' }
        ]}
        activities={[
          { time: '09:45 AM', title: 'Lead qualified', detail: 'Priya Mehta moved to hot pipeline after budget confirmation.' },
          { time: '11:20 AM', title: 'Call completed', detail: 'Nikhil Shah requested MetroEdge revised floor plan.' },
          { time: '01:10 PM', title: 'Visit assigned', detail: 'Sneha Kapoor assigned to Rahul for Lakeside Grandeur.' }
        ]}
        panels={[
          { title: 'Avg response time', value: '08 min', detail: 'Across fresh web enquiries' },
          { title: 'Conversion rate', value: '18.6%', detail: 'Qualified to site visit' },
          { title: 'Pending KYC', value: '14', detail: 'Documents needed for booking' }
        ]}
      />
    </DashboardShell>
  );
}

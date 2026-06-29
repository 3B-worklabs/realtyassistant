import { BarChart3, Megaphone, MousePointerClick, Target } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function MarketingPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="Growth"
        title="Plan property campaigns, capture leads, compare channels, and prove marketing ROI."
        description="The marketing module is fully static for now, with realistic campaign metrics that make the demo feel connected to sales."
        primaryAction="Launch campaign"
        stats={[
          { label: 'Campaigns live', value: '09', detail: 'Meta, Google, portals, WhatsApp', icon: Megaphone },
          { label: 'Qualified leads', value: '1,842', detail: 'This month from paid channels', icon: Target },
          { label: 'CTR', value: '4.8%', detail: 'Premium project creatives', icon: MousePointerClick },
          { label: 'ROI', value: '7.4x', detail: 'Brokerage pipeline vs spend', icon: BarChart3 }
        ]}
        stages={[
          { label: 'Ideation', count: '06', items: ['Aurum Bay weekend open house', 'Rental push for Powai', 'NRI investment carousel'] },
          { label: 'Creative', count: '11', items: ['Sea-facing 3 BHK reel', 'Commercial office brochure', 'Owner mandate post'] },
          { label: 'Live', count: '09', items: ['Bandra luxury campaign', 'Andheri office search', 'Powai rental lead form'] },
          { label: 'Reporting', count: '05', items: ['Weekly ROI report', 'Lead quality score', 'Budget reallocation'] }
        ]}
        tableBadge="Campaigns"
        tableTitle="Marketing campaign performance"
        columns={[
          { key: 'campaign', label: 'Campaign' },
          { key: 'channel', label: 'Channel' },
          { key: 'spend', label: 'Spend' },
          { key: 'leads', label: 'Leads' },
          { key: 'quality', label: 'Quality' }
        ]}
        rows={[
          { campaign: 'Aurum Bay Luxury Launch', channel: 'Meta Ads', spend: '₹86K', leads: '342', quality: 'High' },
          { campaign: 'MetroEdge Office Demand', channel: 'Google Search', spend: '₹62K', leads: '118', quality: 'High' },
          { campaign: 'Powai Rental Weekend', channel: 'Instagram', spend: '₹31K', leads: '205', quality: 'Medium' },
          { campaign: 'Owner Inventory Drive', channel: 'WhatsApp', spend: '₹18K', leads: '74', quality: 'Warm' }
        ]}
        activities={[
          { time: '10:05 AM', title: 'Campaign optimized', detail: 'Aurum Bay budget shifted to high-performing audience.' },
          { time: '01:55 PM', title: 'Creative approved', detail: 'Weekend open house story set moved to ready queue.' },
          { time: '04:35 PM', title: 'Lead sync complete', detail: '78 new ad enquiries added to CRM queue.' }
        ]}
        panels={[
          { title: 'Cost per lead', value: '₹418', detail: 'Across paid campaigns' },
          { title: 'Creative pending', value: '11', detail: 'Awaiting approval' },
          { title: 'Hot enquiries', value: '126', detail: 'Need sales calls today' }
        ]}
      />
    </DashboardShell>
  );
}

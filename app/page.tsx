import {
  Banknote,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileSignature,
  IndianRupee,
  MapPin,
  Megaphone,
  PhoneCall,
  Plus,
  TrendingUp,
  Users
} from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const metrics = [
  { label: 'Active clients', value: '248', delta: '+18 this week', icon: Users },
  { label: 'Open inventory', value: '73', delta: '12 premium units', icon: Building2 },
  { label: 'Site visits', value: '31', delta: '9 scheduled today', icon: CalendarDays },
  { label: 'Pipeline value', value: '₹18.4Cr', delta: '+₹2.1Cr this month', icon: IndianRupee }
];

const leads = [
  { name: 'Priya & Rohan Mehta', need: '3 BHK sea-facing, Bandra', budget: '₹5.2Cr', stage: 'Hot' },
  { name: 'Nikhil Shah', need: 'Commercial office, Andheri East', budget: '₹1.8Cr', stage: 'Visit' },
  { name: 'Aarav Developers', need: 'Channel partner bulk mandate', budget: '₹12Cr', stage: 'Negotiation' },
  { name: 'Sneha Kapoor', need: 'Rental, Powai furnished', budget: '₹1.4L/mo', stage: 'Follow-up' }
];

const visits = [
  { time: '10:30 AM', client: 'Priya Mehta', property: 'Aurum Bay Residences', status: 'Confirmed' },
  { time: '12:15 PM', client: 'Nikhil Shah', property: 'MetroEdge Business Park', status: 'Cab pending' },
  { time: '04:00 PM', client: 'Sneha Kapoor', property: 'Lakeside Grandeur', status: 'Owner joined' }
];

const properties = [
  { name: 'Aurum Bay Residences', area: 'Bandra West', config: '3 BHK', price: '₹5.45Cr', tag: 'Featured' },
  { name: 'Skyline Habitat', area: 'Lower Parel', config: '2.5 BHK', price: '₹3.1Cr', tag: 'New' },
  { name: 'MetroEdge Business Park', area: 'Andheri East', config: 'Office', price: '₹1.9Cr', tag: 'Ready' }
];

const tasks = [
  'Send MOU draft for Aurum Bay',
  'Collect token receipt from Shah',
  'Publish weekend campaign creatives',
  'Verify owner KYC for Lakeside'
];

const money = [
  { label: 'Token due', value: '₹12.5L' },
  { label: 'Brokerage receivable', value: '₹38.8L' },
  { label: 'Ad spend this month', value: '₹2.4L' }
];

export default function HomePage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <section className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-[28px] bg-sidebar p-6 text-white shadow-card sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <Badge className="bg-white/10 text-[#F5D891]">Trial workspace</Badge>
                <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                  Broker command center for leads, visits, inventory, documents, and collections.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D7E0EF]">
                  Today&apos;s board is prepared for a client walkthrough with realistic demo data across the full sales cycle.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-sm font-semibold text-white">
                  <Plus size={17} />
                  Add lead
                </button>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 text-sm font-semibold text-white">
                  <FileSignature size={17} />
                  MOU
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4">
                  <div className="flex items-center justify-between">
                    <item.icon size={20} className="text-[#F5D891]" />
                    <TrendingUp size={16} className="text-[#9DB2D3]" />
                  </div>
                  <p className="mt-5 text-3xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9DB2D3]">{item.label}</p>
                  <p className="mt-3 text-sm text-[#D7E0EF]">{item.delta}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge>Today</Badge>
                <h3 className="mt-3 text-xl font-semibold">Priority follow-ups</h3>
              </div>
              <Bell className="text-accent" size={22} />
            </div>
            <div className="mt-6 space-y-3">
              {tasks.map((task, index) => (
                <div key={task} className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                  <CheckCircle2 size={18} className={index === 0 ? 'text-accent' : 'text-muted'} />
                  <span className="text-sm font-medium">{task}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge>CRM pipeline</Badge>
                <h3 className="mt-3 text-xl font-semibold">High intent opportunities</h3>
              </div>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-border px-4 text-sm font-semibold">
                <PhoneCall size={17} />
                Call queue
              </button>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1.1fr_1.3fr_0.7fr_0.7fr] bg-background px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span>Client</span>
                <span>Requirement</span>
                <span>Budget</span>
                <span>Stage</span>
              </div>
              {leads.map((lead) => (
                <div key={lead.name} className="grid grid-cols-[1.1fr_1.3fr_0.7fr_0.7fr] border-t border-border px-4 py-4 text-sm">
                  <span className="font-semibold">{lead.name}</span>
                  <span className="text-muted">{lead.need}</span>
                  <span className="font-semibold">{lead.budget}</span>
                  <span>
                    <Badge variant={lead.stage === 'Hot' ? 'default' : 'secondary'}>{lead.stage}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge>Schedule</Badge>
                <h3 className="mt-3 text-xl font-semibold">Site visits</h3>
              </div>
              <Clock3 className="text-accent" size={22} />
            </div>
            <div className="mt-6 space-y-4">
              {visits.map((visit) => (
                <div key={`${visit.time}-${visit.client}`} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{visit.time}</p>
                    <Badge variant="secondary">{visit.status}</Badge>
                  </div>
                  <p className="mt-3 font-semibold">{visit.client}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <MapPin size={15} />
                    {visit.property}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_0.7fr_0.7fr]">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge>Inventory</Badge>
                <h3 className="mt-3 text-xl font-semibold">Properties to showcase</h3>
              </div>
              <Building2 className="text-accent" size={22} />
            </div>
            <div className="mt-6 space-y-3">
              {properties.map((property) => (
                <div key={property.name} className="grid gap-3 rounded-2xl border border-border p-4 sm:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{property.name}</p>
                      <Badge variant="secondary">{property.tag}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {property.area} · {property.config}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">{property.price}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div>
              <Badge>Accounts</Badge>
              <h3 className="mt-3 text-xl font-semibold">Collections</h3>
            </div>
            <div className="mt-6 space-y-3">
              {money.map((item) => (
                <div key={item.label} className="rounded-2xl bg-background p-4">
                  <p className="text-sm text-muted">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div>
              <Badge>Marketing</Badge>
              <h3 className="mt-3 text-xl font-semibold">Campaign pulse</h3>
            </div>
            <div className="mt-6 rounded-3xl bg-background p-5">
              <Megaphone className="text-accent" size={28} />
              <p className="mt-5 text-3xl font-semibold">1,842</p>
              <p className="mt-1 text-sm text-muted">qualified ad enquiries this month</p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full w-[72%] rounded-full bg-accent" />
              </div>
            </div>
            <button className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              <Banknote size={17} />
              View ROI report
            </button>
          </Card>
        </section>
      </div>
    </DashboardShell>
  );
}

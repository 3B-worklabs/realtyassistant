"use client";

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Cake,
  CheckCircle2,
  Gift,
  IndianRupee,
  MessageCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { VoiceTextarea } from '@/components/VoiceTextarea';

type Client = {
  id: string;
  name: string;
  phone: string;
  segment: string;
  dob: string;
  city: string;
};

type Festival = {
  id: string;
  name: string;
  date: string;
  tone: string;
  template: string;
};

const clients: Client[] = [
  { id: 'priya', name: 'Priya Mehta', phone: '+91 98765 22110', segment: 'Hot buyer', dob: '12 Aug', city: 'Bandra' },
  { id: 'nikhil', name: 'Nikhil Shah', phone: '+91 98220 44881', segment: 'Commercial lead', dob: '03 Sep', city: 'Andheri' },
  { id: 'sneha', name: 'Sneha Kapoor', phone: '+91 99876 55123', segment: 'Rental client', dob: '27 Jan', city: 'Powai' },
  { id: 'aarav', name: 'Aarav Developers', phone: '+91 90044 78119', segment: 'Owner partner', dob: '18 Nov', city: 'Lower Parel' },
  { id: 'rohan', name: 'Rohan Bafna', phone: '+91 97654 11987', segment: 'Investor', dob: '09 Jun', city: 'Juhu' },
  { id: 'mira', name: 'Mira Jain', phone: '+91 98111 34009', segment: 'Luxury buyer', dob: '21 Dec', city: 'Worli' }
];

const festivals: Festival[] = [
  {
    id: 'diwali',
    name: 'Diwali',
    date: '08 Nov',
    tone: 'Premium festive',
    template:
      'Dear {name}, wishing you and your family a bright and prosperous Diwali. May your new beginnings be filled with happiness, success, and the perfect home.'
  },
  {
    id: 'new-year',
    name: 'New Year',
    date: '01 Jan',
    tone: 'Warm renewal',
    template:
      'Dear {name}, wishing you a wonderful New Year. May this year bring growth, peace, and beautiful new milestones for you and your family.'
  },
  {
    id: 'birthday',
    name: 'Birthday',
    date: 'Client DOB',
    tone: 'Personal greeting',
    template:
      'Happy Birthday {name}! Wishing you health, joy, and a year full of meaningful achievements from the Realty Assistant team.'
  },
  {
    id: 'gudi-padwa',
    name: 'Gudi Padwa',
    date: '19 Mar',
    tone: 'Maharashtra festive',
    template:
      'Dear {name}, warm wishes on Gudi Padwa. May this auspicious day bring prosperity, fresh opportunities, and happiness to your home.'
  }
];

const packs = [
  { name: 'Starter Pack', credits: '500', price: '₹1,499', detail: 'For birthday and small festival sends' },
  { name: 'Festival Pack', credits: '2,500', price: '₹5,999', detail: 'For Diwali, New Year, Eid, Holi, and Gudi Padwa' },
  { name: 'Premium Pack', credits: '10,000', price: '₹18,999', detail: 'For all-client seasonal campaigns' }
];

function personalize(template: string, client: Client) {
  return template.split('{name}').join(client.name);
}

export function MessagingModule() {
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>(['priya', 'nikhil', 'sneha']);
  const [selectedFestivalId, setSelectedFestivalId] = useState('diwali');
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState(festivals[0].template);
  const [sendOpen, setSendOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const selectedFestival = festivals.find((festival) => festival.id === selectedFestivalId) ?? festivals[0];
  const selectedClients = clients.filter((client) => selectedClientIds.includes(client.id));

  const filteredClients = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return clients;
    return clients.filter((client) => [client.name, client.segment, client.city, client.phone].some((value) => value.toLowerCase().includes(search)));
  }, [query]);

  function toggleClient(id: string) {
    setSelectedClientIds((current) => (current.includes(id) ? current.filter((clientId) => clientId !== id) : [...current, id]));
    setSent(false);
  }

  function selectFestival(id: string) {
    const festival = festivals.find((item) => item.id === id);
    if (!festival) return;
    setSelectedFestivalId(id);
    setDraft(festival.template);
    setSent(false);
  }

  function sendDemoMessages() {
    setSent(true);
    window.setTimeout(() => setSendOpen(false), 900);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-sidebar text-white shadow-card">
        <div className="grid gap-6 p-6 xl:grid-cols-[1.25fr_0.75fr] xl:p-8">
          <div>
            <Badge className="bg-white/10 text-[#F5D891]">WhatsApp campaigns</Badge>
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
              Sell message packs, draft festival wishes, and send personalized WhatsApp greetings.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D7E0EF]">
              Static demo flow for selecting clients, choosing festivals or birthdays, personalizing each message with the client name, and showing a send confirmation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => setSendOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D8AA4A]">
                <Send size={17} />
                Send campaign
              </button>
              <button type="button" onClick={() => setDraft(selectedFestival.template)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
                <Sparkles size={17} />
                Generate draft
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Message credits', value: '7,420', detail: 'Available for paid packs', icon: MessageCircle },
              { label: 'Selected clients', value: selectedClients.length.toString().padStart(2, '0'), detail: 'Ready for this send', icon: Users },
              { label: 'Birthday queue', value: '18', detail: 'DOB greetings this month', icon: Cake },
              { label: 'Pack revenue', value: '₹84K', detail: 'Static upsell pipeline', icon: IndianRupee }
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
                <stat.icon size={20} className="text-[#F5D891]" />
                <p className="mt-5 text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9DB2D3]">{stat.label}</p>
                <p className="mt-3 text-sm text-[#D7E0EF]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge>Clients</Badge>
              <h3 className="mt-3 text-xl font-semibold">Choose recipients</h3>
            </div>
            <div className="flex h-11 items-center rounded-2xl border border-border bg-background px-3 sm:min-w-[240px]">
              <Search size={17} className="text-muted" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search clients" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {filteredClients.map((client) => {
              const active = selectedClientIds.includes(client.id);
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => toggleClient(client.id)}
                  className={`rounded-3xl border p-4 text-left transition ${active ? 'border-accent bg-accent/10 shadow-sm' : 'border-border bg-background hover:bg-white'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-text">{client.name}</p>
                      <p className="mt-1 text-sm text-muted">{client.segment}</p>
                    </div>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${active ? 'border-accent bg-accent text-white' : 'border-border bg-white'}`}>
                      {active ? <CheckCircle2 size={15} /> : null}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
                    <span>DOB: {client.dob}</span>
                    <span>{client.city}</span>
                    <span className="col-span-2">{client.phone}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <Badge>Occasion</Badge>
          <h3 className="mt-3 text-xl font-semibold">Select festival or birthday</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {festivals.map((festival) => {
              const active = selectedFestivalId === festival.id;
              return (
                <button
                  key={festival.id}
                  type="button"
                  onClick={() => selectFestival(festival.id)}
                  className={`rounded-3xl border p-4 text-left transition ${active ? 'border-accent bg-accent/10 shadow-sm' : 'border-border bg-background hover:bg-white'}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{festival.name}</p>
                    <Gift size={17} className={active ? 'text-accent' : 'text-muted'} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{festival.tone}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{festival.date}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-text">Draft message</span>
              <Badge variant="secondary">{selectedFestival.name}</Badge>
            </div>
            <textarea
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setSent(false);
              }}
              className="min-h-[132px] w-full resize-none rounded-3xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <p className="mt-2 text-xs text-muted">Use {'{name}'} wherever the client name should appear.</p>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="border-b border-border p-5 sm:p-6">
            <Badge>Preview</Badge>
            <h3 className="mt-3 text-xl font-semibold">Personalized WhatsApp messages</h3>
          </div>
          <div className="divide-y divide-border">
            {selectedClients.map((client) => (
              <motion.div key={client.id} layout className="p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">{client.name}</p>
                    <p className="mt-1 text-sm text-muted">{client.phone}</p>
                  </div>
                  <Badge className={sent ? 'bg-emerald-500/10 text-emerald-700' : undefined}>{sent ? 'Sent' : 'Ready'}</Badge>
                </div>
                <div className="mt-4 rounded-3xl border border-border bg-[#F7F4ED] p-4 text-sm leading-6 text-text">
                  {personalize(draft, client)}
                </div>
              </motion.div>
            ))}
            {!selectedClients.length ? <div className="p-8 text-center text-sm text-muted">Select at least one client to preview personalized messages.</div> : null}
          </div>
        </Card>

        <div className="grid gap-4">
          {packs.map((pack) => (
            <button key={pack.name} type="button" className="rounded-[28px] border border-border bg-surface p-5 text-left shadow-card transition hover:bg-background">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{pack.name}</p>
                  <p className="mt-1 text-sm text-muted">{pack.detail}</p>
                </div>
                <Badge>{pack.price}</Badge>
              </div>
              <p className="mt-5 text-2xl font-semibold">{pack.credits}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">WhatsApp credits</p>
            </button>
          ))}
        </div>
      </section>

      <Modal
        open={sendOpen}
        onClose={() => setSendOpen(false)}
        title="Send WhatsApp campaign"
        description="Static confirmation for the client demo. Backend and WhatsApp API can be connected after approval."
        action={
          <>
            <button type="button" onClick={() => setSendOpen(false)} className="h-11 rounded-2xl border border-border px-4 text-sm font-semibold">
              Review
            </button>
            <button type="button" onClick={sendDemoMessages} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              {sent ? <CheckCircle2 size={17} /> : <Send size={17} />}
              {sent ? 'Sent' : `Send ${selectedClients.length} messages`}
            </button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Occasion</p>
            <p className="mt-2 font-semibold">{selectedFestival.name}</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Recipients</p>
            <p className="mt-2 font-semibold">{selectedClients.length}</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Credits</p>
            <p className="mt-2 font-semibold">{selectedClients.length}</p>
          </div>
        </div>
        <VoiceTextarea label="Internal note" placeholder="Speak a note for this WhatsApp campaign..." minHeight="min-h-[88px]" />
        <AnimatePresence>
          {sent ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-800">
              Demo messages marked as sent. The preview list now shows sent status.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Modal>
    </div>
  );
}

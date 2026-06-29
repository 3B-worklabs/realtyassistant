"use client";

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlarmClock,
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Plus,
  Repeat,
  Search,
  ShieldAlert,
  Smartphone,
  Users,
  Volume2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { VoiceTextarea } from '@/components/VoiceTextarea';

type Reminder = {
  id: string;
  title: string;
  linked: string;
  owner: string;
  date: string;
  time: string;
  priority: string;
  channel: string;
  repeat: string;
  status: string;
};

const initialReminders: Reminder[] = [
  {
    id: 'token',
    title: 'Collect token receipt',
    linked: 'Aurum Bay - Priya Mehta',
    owner: 'Omkar',
    date: '2026-06-29',
    time: '11:30',
    priority: 'Critical',
    channel: 'Push + WhatsApp',
    repeat: 'No repeat',
    status: 'Due today'
  },
  {
    id: 'visit',
    title: 'Confirm cab for site visit',
    linked: 'MetroEdge - Nikhil Shah',
    owner: 'Neha',
    date: '2026-06-29',
    time: '12:00',
    priority: 'High',
    channel: 'Push + Call alert',
    repeat: '30 min before',
    status: 'Armed'
  },
  {
    id: 'agreement',
    title: 'Send rental agreement',
    linked: 'Lakeside - Sneha Kapoor',
    owner: 'Rahul',
    date: '2026-06-29',
    time: '14:30',
    priority: 'Critical',
    channel: 'Push + WhatsApp',
    repeat: 'Daily until done',
    status: 'Escalate if missed'
  },
  {
    id: 'owner',
    title: 'Owner price confirmation',
    linked: 'Skyline Habitat',
    owner: 'Admin',
    date: '2026-06-30',
    time: '10:15',
    priority: 'Medium',
    channel: 'Push only',
    repeat: 'No repeat',
    status: 'Tomorrow'
  }
];

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(time: string) {
  const [hourValue, minute] = time.split(':');
  const hour = Number(hourValue);
  if (!Number.isFinite(hour)) return time;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

export function ReminderCenter() {
  const [reminders, setReminders] = useState(initialReminders);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<Reminder | null>(null);
  const [saved, setSaved] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState('Demo alerts ready');
  const [form, setForm] = useState({
    title: 'Call Priya for token receipt',
    linked: 'Aurum Bay - Priya Mehta',
    owner: 'Omkar',
    date: '2026-06-29',
    time: '18:30',
    priority: 'Critical',
    channel: 'Push + WhatsApp',
    repeat: 'Daily until done'
  });

  const filteredReminders = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return reminders;
    return reminders.filter((reminder) => Object.values(reminder).some((value) => value.toLowerCase().includes(search)));
  }, [query, reminders]);

  const criticalCount = reminders.filter((reminder) => reminder.priority === 'Critical').length;
  const todayCount = reminders.filter((reminder) => reminder.date === '2026-06-29').length;

  async function requestNotificationPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationStatus('Browser notifications are not supported here.');
      return false;
    }

    if (Notification.permission === 'granted') {
      setNotificationStatus('Phone-style alerts are enabled.');
      return true;
    }

    if (Notification.permission === 'denied') {
      setNotificationStatus('Notifications are blocked in browser settings.');
      return false;
    }

    const permission = await Notification.requestPermission();
    const allowed = permission === 'granted';
    setNotificationStatus(allowed ? 'Phone-style alerts are enabled.' : 'Permission not granted yet.');
    return allowed;
  }

  async function triggerDemoAlert(reminder: Reminder) {
    setToast(reminder);
    window.setTimeout(() => setToast(null), 4800);

    const allowed = await requestNotificationPermission();
    if (allowed) {
      new Notification('Realty Assistant reminder', {
        body: `${reminder.title} - ${reminder.linked} at ${formatTime(reminder.time)}`,
        icon: '/icons/icon-192.png',
        badge: '/icons/maskable-192.png',
        tag: `reminder-${reminder.id}`
      });
    }
  }

  function saveReminder() {
    const newReminder: Reminder = {
      id: `custom-${Date.now()}`,
      title: form.title,
      linked: form.linked,
      owner: form.owner,
      date: form.date,
      time: form.time,
      priority: form.priority,
      channel: form.channel,
      repeat: form.repeat,
      status: 'Armed'
    };

    setReminders((current) => [newReminder, ...current]);
    setSaved(true);
    setToast(newReminder);
    window.setTimeout(() => {
      setSaved(false);
      setModalOpen(false);
    }, 900);
    window.setTimeout(() => setToast(null), 4800);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-sidebar text-white shadow-card">
        <div className="grid gap-6 p-6 xl:grid-cols-[1.2fr_0.8fr] xl:p-8">
          <div>
            <Badge className="bg-white/10 text-[#F5D891]">Sensitive reminders</Badge>
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
              Calendar reminders with phone alerts for callbacks, visits, payments, and documents.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D7E0EF]">
              Built for brokers who cannot afford to forget. Schedule date and time, choose alert channels, repeat missed reminders, and escalate critical tasks.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => setModalOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D8AA4A]">
                <Plus size={17} />
                New reminder
              </button>
              <button type="button" onClick={() => triggerDemoAlert(reminders[0])} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
                <Bell size={17} />
                Test phone alert
              </button>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#9DB2D3]">{notificationStatus}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Due today', value: todayCount.toString().padStart(2, '0'), detail: 'Date and time locked', icon: Bell },
              { label: 'Critical alerts', value: criticalCount.toString().padStart(2, '0'), detail: 'Repeat until completed', icon: ShieldAlert },
              { label: 'Phone channels', value: '03', detail: 'Push, WhatsApp, call alert', icon: Smartphone },
              { label: 'Visit alerts', value: '19', detail: 'Calendar-linked actions', icon: CalendarCheck }
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

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="p-5 sm:p-6">
          <Badge>Quick scheduler</Badge>
          <h3 className="mt-3 text-xl font-semibold">Create an alert</h3>
          <div className="mt-5 grid gap-4">
            <label>
              <span className="text-sm font-semibold text-text">Reminder title</span>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" />
            </label>
            <label>
              <span className="text-sm font-semibold text-text">Linked client / record</span>
              <select value={form.linked} onChange={(event) => setForm({ ...form, linked: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
                <option>Aurum Bay - Priya Mehta</option>
                <option>MetroEdge - Nikhil Shah</option>
                <option>Lakeside - Sneha Kapoor</option>
                <option>Skyline Habitat</option>
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm font-semibold text-text">Date</span>
                <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" />
              </label>
              <label>
                <span className="text-sm font-semibold text-text">Time</span>
                <input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm font-semibold text-text">Alert channel</span>
                <select value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
                  <option>Push + WhatsApp</option>
                  <option>Push + Call alert</option>
                  <option>Push only</option>
                  <option>WhatsApp only</option>
                </select>
              </label>
              <label>
                <span className="text-sm font-semibold text-text">Repeat rule</span>
                <select value={form.repeat} onChange={(event) => setForm({ ...form, repeat: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
                  <option>No repeat</option>
                  <option>15 min before</option>
                  <option>30 min before</option>
                  <option>Daily until done</option>
                </select>
              </label>
            </div>
            <button type="button" onClick={saveReminder} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-sidebar px-5 text-sm font-semibold text-white transition hover:bg-[#102B50]">
              <Bell size={17} />
              Arm reminder
            </button>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <Badge>Alert queue</Badge>
              <h3 className="mt-3 text-xl font-semibold">Scheduled reminders</h3>
            </div>
            <div className="flex h-11 items-center rounded-2xl border border-border bg-background px-3 sm:min-w-[260px]">
              <Search size={17} className="text-muted" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search reminders" />
            </div>
          </div>
          <div className="divide-y divide-border">
            {filteredReminders.map((reminder) => (
              <button key={reminder.id} type="button" onClick={() => triggerDemoAlert(reminder)} className="w-full p-5 text-left transition hover:bg-background/70 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-text">{reminder.title}</p>
                      <Badge className={reminder.priority === 'Critical' ? 'bg-red-500/10 text-red-700' : undefined}>{reminder.priority}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted">{reminder.linked}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
                      <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1"><Users size={13} /> {reminder.owner}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1"><CalendarCheck size={13} /> {formatDate(reminder.date)}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1"><Clock size={13} /> {formatTime(reminder.time)}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1"><Repeat size={13} /> {reminder.repeat}</span>
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm lg:min-w-[180px]">
                    <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 font-semibold text-text">
                      <Smartphone size={15} className="text-accent" />
                      {reminder.channel}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 text-muted">
                      <AlarmClock size={15} />
                      {reminder.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Push notification', value: 'Phone lock-screen alert', detail: 'Demo uses browser notifications; backend push can schedule exact future alerts.', icon: Smartphone },
          { title: 'WhatsApp reminder', value: 'Client/team nudges', detail: 'Useful for payment follow-ups, visit confirmations, and document deadlines.', icon: MessageCircle },
          { title: 'Escalation alert', value: 'Repeat until done', detail: 'Critical reminders can repeat and escalate to admin when missed.', icon: Volume2 }
        ].map((item) => (
          <Card key={item.title} className="p-5">
            <item.icon size={20} className="text-accent" />
            <p className="mt-4 text-sm text-muted">{item.title}</p>
            <p className="mt-2 text-xl font-semibold">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
          </Card>
        ))}
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New reminder"
        description="Schedule a date, time, channel, and repeat rule. This is static now and ready for backend scheduling later."
        action={
          <>
            <button type="button" onClick={() => setModalOpen(false)} className="h-11 rounded-2xl border border-border px-4 text-sm font-semibold">
              Cancel
            </button>
            <button type="button" onClick={saveReminder} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              {saved ? <CheckCircle2 size={17} /> : <Bell size={17} />}
              {saved ? 'Armed' : 'Arm alert'}
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-sm font-semibold text-text">Reminder title</span>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" />
          </label>
          <label>
            <span className="text-sm font-semibold text-text">Date</span>
            <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" />
          </label>
          <label>
            <span className="text-sm font-semibold text-text">Time</span>
            <input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" />
          </label>
          <label>
            <span className="text-sm font-semibold text-text">Priority</span>
            <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Normal</option>
            </select>
          </label>
          <label>
            <span className="text-sm font-semibold text-text">Channel</span>
            <select value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
              <option>Push + WhatsApp</option>
              <option>Push + Call alert</option>
              <option>Push only</option>
              <option>WhatsApp only</option>
            </select>
          </label>
        </div>
        <VoiceTextarea label="Voice reminder note" placeholder="Speak the reminder details, client promise, payment amount, or visit instruction..." minHeight="min-h-[88px]" />
      </Modal>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            className="fixed bottom-5 right-5 z-[70] w-[min(92vw,380px)] rounded-[28px] border border-white/60 bg-white/95 p-4 shadow-[0_24px_80px_rgba(7,27,53,0.22)] backdrop-blur-xl"
          >
            <div className="flex gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sidebar text-white">
                <Phone size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text">Reminder alert</p>
                <p className="mt-1 text-sm text-muted">{toast.title}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{formatDate(toast.date)} at {formatTime(toast.time)}</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

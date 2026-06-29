"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Users, FileText, ClipboardList, CalendarCheck, Banknote, CreditCard, BarChart3, Settings, Bell, Search, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Clients', href: '/dashboard/clients', icon: Users, group: 'CRM' },
  { label: 'Sales', href: '/dashboard/sales', icon: Briefcase, group: 'Sales' },
  { label: 'Rentals', href: '/dashboard/rentals', icon: CalendarCheck, group: 'Sales' },
  { label: 'DSR', href: '/dashboard/dsr', icon: ClipboardList, group: 'Daily Work' },
  { label: 'Reminders', href: '/dashboard/reminders', icon: Bell, group: 'Daily Work' },
  { label: 'Booking Forms', href: '/documents/booking-forms', icon: FileText, group: 'Documents' },
  { label: 'MOU Generator', href: '/documents/mou-generator', icon: FileText, group: 'Documents' },
  { label: 'Banking', href: '/accounts/banking', icon: Banknote, group: 'Accounts' },
  { label: 'Marketing', href: '/marketing', icon: CreditCard, group: 'Marketing' },
  { label: 'Reports', href: '/reports', icon: BarChart3, group: 'Reports' },
  { label: 'Users', href: '/administration/users', icon: Users, group: 'Administration' },
  { label: 'Settings', href: '/administration/settings', icon: Settings, group: 'Administration' }
];

const groupedNav = navItems.reduce<Record<string, typeof navItems>>((acc, item) => {
  const group = item.group || 'General';
  if (!acc[group]) acc[group] = [];
  acc[group].push(item);
  return acc;
}, {});

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="relative mx-auto flex min-h-screen max-w-[1900px] flex-col lg:flex-row">
        <aside className="z-20 w-full border-b border-border bg-sidebar/95 px-6 py-8 text-white shadow-[0_25px_120px_rgba(11,31,58,0.12)] lg:sticky lg:top-0 lg:h-screen lg:w-[340px] lg:border-r lg:border-b-0 lg:px-8 lg:py-10">
          <div className="flex items-center gap-3 text-white">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-white/12 text-accent">
              <Home size={20} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#D2C9B4]">Realty Assistant</p>
              <h2 className="text-2xl font-semibold">Broker HQ</h2>
            </div>
          </div>

          <div className="mt-10 space-y-8">
            {Object.entries(groupedNav).map(([group, items]) => (
              <div key={group}>
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9DB2D3]">{group}</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as any}
                      className={cn(
                        'flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition duration-150 hover:bg-white/10',
                        item.href === '/' ? 'bg-white/10' : ''
                      )}
                    >
                      <span className="inline-block h-4 w-4 rounded bg-white/20" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Workspace</p>
              <h1 className="mt-2 text-3xl font-semibold">Premium broker experience</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex items-center rounded-full border border-border bg-white px-4 py-3 shadow-sm">
                <Search size={18} className="text-muted" />
                <input
                  type="search"
                  placeholder="Search modules"
                  className="ml-3 w-full bg-transparent text-sm text-text placeholder:text-muted focus:outline-none"
                />
              </div>
              <button className="inline-flex items-center rounded-full border border-border bg-white px-4 py-3 text-sm font-semibold text-text transition hover:bg-background">
                <span className="mr-2 h-2.5 w-2.5 rounded-full bg-accent" />
                Live
              </button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Banknote,
  BarChart3,
  Bell,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', href: '/', icon: Home, group: 'Workspace' },
  { label: 'Clients', href: '/dashboard/clients', icon: Users, group: 'CRM' },
  { label: 'Sales', href: '/dashboard/sales', icon: Building2, group: 'CRM' },
  { label: 'Rentals', href: '/dashboard/rentals', icon: CalendarCheck, group: 'CRM' },
  { label: 'DSR', href: '/dashboard/dsr', icon: ClipboardList, group: 'Operations' },
  { label: 'Reminders', href: '/dashboard/reminders', icon: Bell, group: 'Operations' },
  { label: 'Booking Forms', href: '/documents/booking-forms', icon: FileText, group: 'Documents' },
  { label: 'MOU Generator', href: '/documents/mou-generator', icon: FileText, group: 'Documents' },
  { label: 'Banking', href: '/accounts/banking', icon: Banknote, group: 'Finance' },
  { label: 'Marketing', href: '/marketing', icon: CreditCard, group: 'Growth' },
  { label: 'Reports', href: '/reports', icon: BarChart3, group: 'Growth' },
  { label: 'Users', href: '/administration/users', icon: Users, group: 'Admin' },
  { label: 'Settings', href: '/administration/settings', icon: Settings, group: 'Admin' }
];

const groupedNav = navItems.reduce<Record<string, typeof navItems>>((acc, item) => {
  if (!acc[item.group]) acc[item.group] = [];
  acc[item.group].push(item);
  return acc;
}, {});

function SidebarLabel({ children, collapsed }: { children: React.ReactNode; collapsed: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {!collapsed ? (
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.16 }}
          className="truncate"
        >
          {children}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F7F4ED_0%,#EEF3F8_52%,#F8F6F1_100%)] text-text">
      <div className="mx-auto flex min-h-screen max-w-[1920px]">
        <motion.aside
          animate={{ width: collapsed ? 96 : 328 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="sticky top-0 hidden h-screen shrink-0 p-4 lg:block"
        >
          <div className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[#071B35]/90 p-4 text-white shadow-[0_28px_100px_rgba(7,27,53,0.28)] backdrop-blur-2xl">
            <div className={cn('flex items-center gap-3', collapsed ? 'justify-center' : 'justify-between')}>
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-[#E9C46A] shadow-inner">
                  <Sparkles size={20} />
                </div>
                <SidebarLabel collapsed={collapsed}>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9DB2D3]">Realty</p>
                    <h2 className="text-lg font-semibold leading-tight">Assistant</h2>
                  </div>
                </SidebarLabel>
              </div>
              {!collapsed ? (
                <button
                  type="button"
                  onClick={() => setCollapsed(true)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-white transition hover:bg-white/[0.14]"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft size={18} />
                </button>
              ) : null}
            </div>

            {collapsed ? (
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="mx-auto mt-4 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-white transition hover:bg-white/[0.14]"
                aria-label="Expand sidebar"
              >
                <Menu size={18} />
              </button>
            ) : (
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.08] p-3">
                <p className="text-xs text-[#C9D6EA]">Trial board</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-2xl font-semibold">₹18.4Cr</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#8EA7CA]">Pipeline</p>
                  </div>
                  <span className="rounded-full bg-[#E9C46A]/15 px-3 py-1 text-xs font-semibold text-[#F5D891]">Live</span>
                </div>
              </div>
            )}

            <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
              {Object.entries(groupedNav).map(([group, items]) => (
                <div key={group}>
                  <SidebarLabel collapsed={collapsed}>
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7F99BE]">{group}</p>
                  </SidebarLabel>
                  <div className="space-y-1.5">
                    {items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href as any}
                          title={collapsed ? item.label : undefined}
                          className={cn(
                            'group relative flex h-12 items-center gap-3 rounded-2xl px-3 text-sm font-medium text-[#D7E0EF] transition',
                            collapsed ? 'justify-center' : '',
                            active ? 'bg-white text-[#071B35] shadow-[0_14px_40px_rgba(255,255,255,0.16)]' : 'hover:bg-white/10 hover:text-white'
                          )}
                        >
                          {active ? (
                            <motion.span
                              layoutId="active-nav"
                              className="absolute inset-0 rounded-2xl bg-white"
                              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                            />
                          ) : null}
                          <item.icon size={18} className={cn('relative z-10 shrink-0', active ? 'text-[#C89B3C]' : 'text-[#9DB2D3] group-hover:text-[#F5D891]')} />
                          {!collapsed ? <span className="relative z-10 min-w-0 truncate">{item.label}</span> : null}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className={cn('mt-5 rounded-3xl border border-white/10 bg-white/[0.08] p-3', collapsed ? 'px-2' : '')}>
              {collapsed ? (
                <button className="grid h-11 w-full place-items-center rounded-2xl bg-[#E9C46A] text-[#071B35]" aria-label="Add new lead">
                  <Plus size={18} />
                </button>
              ) : (
                <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#E9C46A] px-4 text-sm font-semibold text-[#071B35] transition hover:bg-[#F5D891]">
                  <Plus size={17} />
                  New lead
                </button>
              )}
            </div>
          </div>
        </motion.aside>

        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-4 lg:py-4 xl:px-6">
          <div className="mb-4 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between lg:sticky lg:top-4 lg:z-20">
            <div className="flex min-w-0 items-center gap-3">
              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-sidebar text-white lg:hidden" aria-label="Open navigation">
                <Menu size={19} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Premium broker workspace</p>
                <h1 className="mt-1 truncate text-2xl font-semibold text-text">Realty Assistant CRM</h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 min-w-[260px] items-center rounded-2xl border border-border bg-white px-3 shadow-sm">
                <Search size={17} className="text-muted" />
                <input
                  type="search"
                  placeholder="Search leads, properties, documents"
                  className="ml-3 min-w-0 flex-1 bg-transparent text-sm text-text placeholder:text-muted focus:outline-none"
                />
              </div>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102B50]">
                <Plus size={17} />
                Add lead
              </button>
            </div>
          </div>

          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

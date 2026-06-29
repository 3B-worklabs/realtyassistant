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
  CheckCircle2,
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
  Users,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/modal';
import { VoiceTextarea } from '@/components/VoiceTextarea';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function saveDemoLead() {
    setSaved(true);
    window.setTimeout(() => {
      setSaved(false);
      setLeadOpen(false);
    }, 900);
  }

  const renderNav = (mode: 'desktop' | 'mobile') => {
    const iconOnly = mode === 'desktop' && collapsed;

    return (
      <nav className={cn('flex-1 overflow-y-auto pr-1', iconOnly ? 'mt-4 space-y-2' : 'mt-6 space-y-6')}>
        {Object.entries(groupedNav).map(([group, items]) => (
          <div key={group}>
            {!iconOnly ? (
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7F99BE]">{group}</p>
            ) : null}
            <div className={cn(iconOnly ? 'space-y-1' : 'space-y-1.5')}>
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    title={iconOnly ? item.label : undefined}
                    onClick={() => mode === 'mobile' && setMobileOpen(false)}
                    className={cn(
                      'group relative flex items-center rounded-2xl text-sm font-medium text-[#D7E0EF] transition',
                      iconOnly ? 'mx-auto h-10 w-10 justify-center px-0' : 'h-12 gap-3 px-3',
                      active ? 'bg-white text-[#071B35] shadow-[0_14px_40px_rgba(255,255,255,0.16)]' : 'hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId={mode === 'mobile' ? 'active-mobile-nav' : 'active-nav'}
                        className="absolute inset-0 rounded-2xl bg-white"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    ) : null}
                    <item.icon size={18} className={cn('relative z-10 shrink-0', active ? 'text-[#C89B3C]' : 'text-[#9DB2D3] group-hover:text-[#F5D891]')} />
                    {!iconOnly ? <span className="relative z-10 min-w-0 truncate">{item.label}</span> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#F7F4ED_0%,#EEF3F8_52%,#F8F6F1_100%)] text-text">
      <div className="mx-auto flex min-h-screen max-w-[1920px]">
        <motion.aside
          animate={{ width: collapsed ? 88 : 328 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className={cn('sticky top-0 hidden h-screen shrink-0 lg:block', collapsed ? 'p-3' : 'p-4')}
        >
          <div className={cn('flex h-full flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[#071B35]/90 text-white shadow-[0_28px_100px_rgba(7,27,53,0.28)] backdrop-blur-2xl', collapsed ? 'p-3' : 'p-4')}>
            <div className={cn('flex items-center gap-3', collapsed ? 'justify-center' : 'justify-between')}>
              <div className="flex min-w-0 items-center gap-3">
                <div className={cn('grid shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-[#E9C46A] shadow-inner', collapsed ? 'h-10 w-10' : 'h-12 w-12')}>
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
                className="mx-auto mt-3 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-white transition hover:bg-white/[0.14]"
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

            {renderNav('desktop')}

            <div className={cn('rounded-3xl border border-white/10 bg-white/[0.08] p-3', collapsed ? 'mt-3 px-2' : 'mt-5')}>
              {collapsed ? (
                <button type="button" onClick={() => setLeadOpen(true)} className="grid h-10 w-full place-items-center rounded-2xl bg-[#E9C46A] text-[#071B35]" aria-label="Add new lead">
                  <Plus size={18} />
                </button>
              ) : (
                <button type="button" onClick={() => setLeadOpen(true)} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#E9C46A] px-4 text-sm font-semibold text-[#071B35] transition hover:bg-[#F5D891]">
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
              <button type="button" onClick={() => setMobileOpen(true)} className="grid h-11 w-11 place-items-center rounded-2xl bg-sidebar text-white lg:hidden" aria-label="Open navigation">
                <Menu size={19} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Premium broker workspace</p>
                <h1 className="mt-1 truncate text-2xl font-semibold text-text">Realty Assistant CRM</h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={() => setSearchOpen(true)} className="flex h-11 min-w-[260px] items-center rounded-2xl border border-border bg-white px-3 text-left shadow-sm">
                <Search size={17} className="text-muted" />
                <span className="ml-3 truncate text-sm text-muted">Search leads, properties, documents</span>
              </button>
              <button type="button" onClick={() => setLeadOpen(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#102B50]">
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

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              initial={{ x: -340 }}
              animate={{ x: 0 }}
              exit={{ x: -340 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="flex h-full w-[min(88vw,340px)] flex-col overflow-hidden rounded-r-[32px] border-r border-white/15 bg-[#071B35] p-4 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10 text-[#E9C46A]">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9DB2D3]">Realty</p>
                    <h2 className="text-lg font-semibold">Assistant</h2>
                  </div>
                </div>
                <button type="button" onClick={() => setMobileOpen(false)} className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.08]">
                  <X size={18} />
                </button>
              </div>
              {renderNav('mobile')}
              <button type="button" onClick={() => { setMobileOpen(false); setLeadOpen(true); }} className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#E9C46A] px-4 text-sm font-semibold text-[#071B35]">
                <Plus size={17} />
                New lead
              </button>
            </motion.div>
            <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="absolute inset-0 -z-10" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Modal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        title="Add lead"
        description="Static demo form with the fields users will fill after backend integration."
        action={
          <>
            <button type="button" onClick={() => setLeadOpen(false)} className="h-11 rounded-2xl border border-border px-4 text-sm font-semibold">
              Cancel
            </button>
            <button type="button" onClick={saveDemoLead} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              {saved ? <CheckCircle2 size={17} /> : <Plus size={17} />}
              {saved ? 'Saved' : 'Save lead'}
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="text-sm font-semibold text-text">Client name</span>
            <input className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" placeholder="Priya Mehta" />
          </label>
          <label>
            <span className="text-sm font-semibold text-text">Requirement</span>
            <input className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" placeholder="3 BHK Bandra" />
          </label>
        </div>
        <VoiceTextarea label="Voice requirement" placeholder="Speak buyer requirement, budget, area preference, urgency..." />
      </Modal>

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search workspace" description="Functional static search panel for the demo.">
        <div className="flex h-12 items-center rounded-2xl border border-border bg-background px-4">
          <Search size={18} className="text-muted" />
          <input className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none" autoFocus placeholder="Try Aurum Bay, Priya, MOU, brokerage..." />
        </div>
        <VoiceTextarea label="Voice search" placeholder="Say what you want to find..." minHeight="min-h-[88px]" />
        <div className="grid gap-3 sm:grid-cols-2">
          {['Priya Mehta - hot client', 'Aurum Bay - active deal', 'MOU-2201 - review', '₹38.8L receivable'].map((result) => (
            <button key={result} type="button" className="rounded-2xl border border-border bg-background p-4 text-left text-sm font-semibold transition hover:bg-white">
              {result}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

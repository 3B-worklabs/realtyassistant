"use client";

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Banknote,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  IndianRupee,
  PieChart,
  Search,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';

type ReportType = 'bank' | 'client' | 'master';
type ExportType = 'Excel' | 'PDF';

type BankAccount = {
  id: string;
  name: string;
  bank: string;
  account: string;
  balance: string;
  inflow: string;
  outflow: string;
};

type Transaction = {
  date: string;
  client: string;
  bankId: string;
  type: string;
  amount: string;
  mode: string;
  status: string;
};

const bankAccounts: BankAccount[] = [
  {
    id: 'hdfc-current',
    name: 'NP Property Current',
    bank: 'HDFC Bank',
    account: 'XX-4291',
    balance: '₹24.8L',
    inflow: '₹18.2L',
    outflow: '₹4.6L'
  },
  {
    id: 'icici-escrow',
    name: 'NP Property Escrow',
    bank: 'ICICI Bank',
    account: 'XX-7714',
    balance: '₹38.4L',
    inflow: '₹31.0L',
    outflow: '₹8.1L'
  },
  {
    id: 'axis-collections',
    name: 'NP Property Collections',
    bank: 'Axis Bank',
    account: 'XX-1180',
    balance: '₹12.6L',
    inflow: '₹9.8L',
    outflow: '₹2.2L'
  }
];

const transactions: Transaction[] = [
  { date: '29 Jun 2026', client: 'Priya Mehta', bankId: 'hdfc-current', type: 'Token received', amount: '₹10.0L', mode: 'NEFT', status: 'Matched' },
  { date: '29 Jun 2026', client: 'Nikhil Shah', bankId: 'icici-escrow', type: 'Brokerage invoice', amount: '₹6.2L', mode: 'RTGS', status: 'Pending invoice' },
  { date: '28 Jun 2026', client: 'Aarav Developers', bankId: 'axis-collections', type: 'Marketing pack', amount: '₹1.8L', mode: 'UPI', status: 'Matched' },
  { date: '28 Jun 2026', client: 'Sneha Kapoor', bankId: 'hdfc-current', type: 'Rental brokerage', amount: '₹1.4L', mode: 'UPI', status: 'Review' },
  { date: '27 Jun 2026', client: 'Rohan Bafna', bankId: 'icici-escrow', type: 'Agreement token', amount: '₹12.0L', mode: 'RTGS', status: 'Matched' },
  { date: '27 Jun 2026', client: 'Mira Jain', bankId: 'axis-collections', type: 'Consulting fee', amount: '₹2.4L', mode: 'IMPS', status: 'Matched' }
];

const clients = ['All clients', 'Priya Mehta', 'Nikhil Shah', 'Aarav Developers', 'Sneha Kapoor', 'Rohan Bafna', 'Mira Jain'];

function amountToNumber(amount: string) {
  const value = Number(amount.replace(/[₹L]/g, ''));
  return Number.isFinite(value) ? value : 0;
}

function makeReportHtml(title: string, subtitle: string, rows: Transaction[]) {
  const bodyRows = rows
    .map(
      (row) => `
        <tr>
          <td>${row.date}</td>
          <td>${row.client}</td>
          <td>${bankAccounts.find((bank) => bank.id === row.bankId)?.bank ?? row.bankId}</td>
          <td>${row.type}</td>
          <td>${row.amount}</td>
          <td>${row.mode}</td>
          <td>${row.status}</td>
        </tr>`
    )
    .join('');

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #1F2A37; padding: 28px; }
          h1 { margin: 0; color: #071B35; }
          p { color: #667085; }
          table { border-collapse: collapse; width: 100%; margin-top: 24px; }
          th, td { border: 1px solid #E8DFD0; padding: 10px 12px; text-align: left; font-size: 13px; }
          th { background: #F7F4ED; color: #667085; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Bank</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </body>
    </html>`;
}

export function ReportsConsole() {
  const [reportType, setReportType] = useState<ReportType>('bank');
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0].id);
  const [selectedClient, setSelectedClient] = useState('All clients');
  const [period, setPeriod] = useState('June 2026');
  const [query, setQuery] = useState('');
  const [exportModal, setExportModal] = useState<ExportType | null>(null);
  const [exported, setExported] = useState(false);

  const activeBank = bankAccounts.find((bank) => bank.id === selectedBank) ?? bankAccounts[0];
  const reportTitle = reportType === 'bank' ? 'Bank-wise report' : reportType === 'client' ? 'Client-wise report' : 'Master report';

  const filteredRows = useMemo(() => {
    const search = query.trim().toLowerCase();
    return transactions.filter((row) => {
      const bankMatch = reportType !== 'bank' || row.bankId === selectedBank;
      const clientMatch = reportType !== 'client' || selectedClient === 'All clients' || row.client === selectedClient;
      const searchMatch = !search || Object.values(row).some((value) => value.toLowerCase().includes(search));
      return bankMatch && clientMatch && searchMatch;
    });
  }, [query, reportType, selectedBank, selectedClient]);

  const totalAmount = filteredRows.reduce((total, row) => total + amountToNumber(row.amount), 0);
  const matchedCount = filteredRows.filter((row) => row.status === 'Matched').length;

  function exportExcel() {
    const html = makeReportHtml(reportTitle, `${period} | NP Property`, filteredRows);
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportTitle.toLowerCase().replace(/\s+/g, '-')}-${period.toLowerCase().replace(/\s+/g, '-')}.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExported(true);
  }

  function exportPdf() {
    const html = makeReportHtml(reportTitle, `${period} | NP Property`, filteredRows);
    const printWindow = window.open('', '_blank', 'width=1024,height=768');
    if (!printWindow) return;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setExported(true);
  }

  function confirmExport() {
    if (exportModal === 'Excel') exportExcel();
    if (exportModal === 'PDF') exportPdf();
    window.setTimeout(() => {
      setExportModal(null);
      setExported(false);
    }, 900);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-sidebar text-white shadow-card">
        <div className="grid gap-6 p-6 xl:grid-cols-[1.15fr_0.85fr] xl:p-8">
          <div>
            <Badge className="bg-white/10 text-[#F5D891]">Analytics</Badge>
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
              Generate bank-wise, client-wise, and master reports with Excel and PDF exports.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#D7E0EF]">
              Static premium reporting console for NP Property, including three operating bank accounts, transaction matching, client filters, and export-ready report previews.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => setExportModal('Excel')} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D8AA4A]">
                <FileSpreadsheet size={17} />
                Export Excel
              </button>
              <button type="button" onClick={() => setExportModal('PDF')} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.14]">
                <FileText size={17} />
                Export PDF
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Report value', value: `₹${totalAmount.toFixed(1)}L`, detail: 'Filtered transaction value', icon: IndianRupee },
              { label: 'Matched entries', value: `${matchedCount}/${filteredRows.length}`, detail: 'Bank proof reconciled', icon: CheckCircle2 },
              { label: 'Bank accounts', value: '03', detail: 'NP Property active accounts', icon: Banknote },
              { label: 'Exports ready', value: 'PDF/XLS', detail: 'Client walkthrough buttons', icon: Download }
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
          <Badge>Report builder</Badge>
          <h3 className="mt-3 text-xl font-semibold">Choose report type</h3>
          <div className="mt-5 grid gap-3">
            {[
              { id: 'bank' as const, title: 'Bank-wise report', detail: 'View HDFC, ICICI, or Axis transactions separately.', icon: Banknote },
              { id: 'client' as const, title: 'Client-wise report', detail: 'Filter every receipt, invoice, and brokerage by client.', icon: Users },
              { id: 'master' as const, title: 'Master report', detail: 'Complete NP Property finance report across all banks.', icon: BarChart3 }
            ].map((item) => {
              const active = reportType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setReportType(item.id)}
                  className={`rounded-3xl border p-4 text-left transition ${active ? 'border-accent bg-accent/10 shadow-sm' : 'border-border bg-background hover:bg-white'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${active ? 'bg-accent text-white' : 'bg-white text-muted'}`}>
                      <item.icon size={18} />
                    </span>
                    <span>
                      <span className="block font-semibold text-text">{item.title}</span>
                      <span className="mt-1 block text-sm text-muted">{item.detail}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4">
            <label>
              <span className="text-sm font-semibold text-text">Period</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
                <option>June 2026</option>
                <option>Q2 2026</option>
                <option>Last 30 days</option>
                <option>Financial year 2026</option>
              </select>
            </label>

            {reportType === 'bank' ? (
              <label>
                <span className="text-sm font-semibold text-text">Bank account</span>
                <select value={selectedBank} onChange={(event) => setSelectedBank(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
                  {bankAccounts.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.bank} - {bank.account}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            {reportType === 'client' ? (
              <label>
                <span className="text-sm font-semibold text-text">Client</span>
                <select value={selectedClient} onChange={(event) => setSelectedClient(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
                  {clients.map((client) => (
                    <option key={client}>{client}</option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
        </Card>

        <div className="grid gap-4">
          <section className="grid gap-4 md:grid-cols-3">
            {bankAccounts.map((bank) => {
              const active = reportType !== 'bank' || selectedBank === bank.id;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => {
                    setReportType('bank');
                    setSelectedBank(bank.id);
                  }}
                  className={`rounded-[28px] border p-5 text-left shadow-card transition ${active ? 'border-border bg-surface' : 'border-border bg-background opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{bank.name}</p>
                      <p className="mt-1 text-sm text-muted">{bank.bank} {bank.account}</p>
                    </div>
                    <Building2 size={18} className="text-accent" />
                  </div>
                  <p className="mt-5 text-2xl font-semibold">{bank.balance}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted">
                    <span>In {bank.inflow}</span>
                    <span>Out {bank.outflow}</span>
                  </div>
                </button>
              );
            })}
          </section>

          <Card className="overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <Badge>Preview</Badge>
                <h3 className="mt-3 text-xl font-semibold">{reportTitle}</h3>
                <p className="mt-1 text-sm text-muted">
                  {reportType === 'bank' ? `${activeBank.bank} ${activeBank.account}` : reportType === 'client' ? selectedClient : 'All banks and clients'} | {period}
                </p>
              </div>
              <div className="flex h-11 items-center rounded-2xl border border-border bg-background px-3 sm:min-w-[260px]">
                <Search size={17} className="text-muted" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search reports" />
              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <div className="min-w-[860px]">
                <div className="grid grid-cols-[1fr_1.2fr_1fr_1.2fr_0.8fr_0.8fr_1fr] bg-background px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <span>Date</span>
                  <span>Client</span>
                  <span>Bank</span>
                  <span>Type</span>
                  <span>Amount</span>
                  <span>Mode</span>
                  <span>Status</span>
                </div>
                {filteredRows.map((row) => (
                  <div key={`${row.date}-${row.client}-${row.type}`} className="grid grid-cols-[1fr_1.2fr_1fr_1.2fr_0.8fr_0.8fr_1fr] border-t border-border px-5 py-4 text-sm">
                    <span className="font-medium text-text">{row.date}</span>
                    <span className="text-muted">{row.client}</span>
                    <span className="text-muted">{bankAccounts.find((bank) => bank.id === row.bankId)?.bank}</span>
                    <span className="text-muted">{row.type}</span>
                    <span className="font-semibold text-text">{row.amount}</span>
                    <span className="text-muted">{row.mode}</span>
                    <span className="text-muted">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="divide-y divide-border lg:hidden">
              {filteredRows.map((row) => (
                <div key={`${row.date}-${row.client}-${row.type}-card`} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{row.client}</p>
                      <p className="mt-1 text-sm text-muted">{row.type}</p>
                    </div>
                    <Badge>{row.amount}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
                    <span>{row.date}</span>
                    <span>{bankAccounts.find((bank) => bank.id === row.bankId)?.bank}</span>
                    <span>{row.mode}</span>
                    <span>{row.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Client report use', value: 'Brokerage follow-up', detail: 'Send filtered statements to owners, buyers, or internal RMs.', icon: Users },
          { title: 'Bank report use', value: 'Reconciliation', detail: 'Match proof, bank account, receipt, and invoice status.', icon: Filter },
          { title: 'Master report use', value: 'Management review', detail: 'All income, token, brokerage, expenses, and pending entries.', icon: PieChart }
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
        open={Boolean(exportModal)}
        onClose={() => setExportModal(null)}
        title={`Export ${exportModal ?? 'report'}`}
        description="Static export flow for the demo. Excel downloads an .xls file; PDF opens the browser print dialog."
        action={
          <>
            <button type="button" onClick={() => setExportModal(null)} className="h-11 rounded-2xl border border-border px-4 text-sm font-semibold">
              Cancel
            </button>
            <button type="button" onClick={confirmExport} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              {exported ? <CheckCircle2 size={17} /> : <Download size={17} />}
              {exported ? 'Exported' : `Download ${exportModal}`}
            </button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-4">
            <CalendarDays size={18} className="text-accent" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Period</p>
            <p className="mt-2 font-semibold">{period}</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-4">
            <BarChart3 size={18} className="text-accent" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Report</p>
            <p className="mt-2 font-semibold">{reportTitle}</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-4">
            <IndianRupee size={18} className="text-accent" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Value</p>
            <p className="mt-2 font-semibold">₹{totalAmount.toFixed(1)}L</p>
          </div>
        </div>
        <AnimatePresence>
          {exported ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-800">
              Export prepared successfully for the static demo.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Modal>
    </div>
  );
}

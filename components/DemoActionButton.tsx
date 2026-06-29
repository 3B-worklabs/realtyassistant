"use client";

import { ReactNode, useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { VoiceTextarea } from '@/components/VoiceTextarea';
import { cn } from '@/lib/utils';

type DemoActionButtonProps = {
  label: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function DemoActionButton({ label, title, description, icon, className }: DemoActionButtonProps) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function saveDemo() {
    setSaved(true);
    window.setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 900);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {icon}
        {label}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title ?? label}
        description={description ?? 'Static demo action. This shows the intended flow before backend integration.'}
        action={
          <>
            <button type="button" onClick={() => setOpen(false)} className="h-11 rounded-2xl border border-border px-4 text-sm font-semibold">
              Cancel
            </button>
            <button type="button" onClick={saveDemo} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-sidebar px-4 text-sm font-semibold text-white">
              {saved ? <CheckCircle2 size={17} /> : <Plus size={17} />}
              {saved ? 'Saved' : 'Save demo'}
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-text">Name</span>
            <input className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent" placeholder="Client or record name" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-text">Priority</span>
            <select className="mt-2 h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-accent">
              <option>High</option>
              <option>Medium</option>
              <option>Normal</option>
            </select>
          </label>
        </div>
        <VoiceTextarea label="Voice note" placeholder="Speak or type the note the team should see..." />
        <div className={cn('rounded-2xl border border-border bg-background p-4 text-sm text-muted', saved ? 'text-accent' : '')}>
          {saved ? 'Demo record saved on screen.' : 'This will become a real saved record once backend/database work starts.'}
        </div>
      </Modal>
    </>
  );
}

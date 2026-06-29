'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex bg-black/20 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl sm:w-[420px]">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Quick panel</p>
            <h2 className="text-lg font-semibold text-text">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted transition hover:bg-background hover:text-text">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>,
    document.body
  );
}

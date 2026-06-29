'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function Modal({ open, onClose, title, description, children, action }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 py-6 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white p-6 shadow-card sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">{title}</h2>
            {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted transition hover:bg-background hover:text-text">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-6">{children}</div>
        {action ? <div className="mt-8 flex justify-end gap-3">{action}</div> : null}
      </div>
    </div>,
    document.body
  );
}

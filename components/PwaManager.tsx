'use client';

import { useEffect, useState } from 'react';
import { Download, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function PwaManager() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed.
      });
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt || installed) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-border bg-white/95 p-4 shadow-card backdrop-blur-sm sm:inset-x-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-accent/10 text-accent">
            <Download size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Install Realty Assistant</p>
            <p className="text-sm text-muted">Add this workspace to your device for quick access and offline support.</p>
          </div>
        </div>
        <Button variant="primary" size="md" onClick={handleInstall}>
          Install App
        </Button>
      </div>
    </div>
  );
}

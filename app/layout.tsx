import './globals.css';
import './theme.css';
import type { Metadata } from 'next';
import PwaManager from '@/components/PwaManager';

export const metadata: Metadata = {
  title: 'Realty Assistant',
  description: 'Premium CRM and business management platform for real estate brokers.',
  metadataBase: new URL('https://example.com'),
  themeColor: '#0B1F3A'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon.svg" />
        <meta name="theme-color" content="#0B1F3A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body>
        {children}
        <PwaManager />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { AppProvider } from '@/lib/context';
import './globals.css';

export const metadata: Metadata = {
  title: 'There & Back',
  description: 'A quest-based learning and adventure tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

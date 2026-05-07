import './globals.css';
import { Geist } from 'next/font/google';
import Providers from '@/components/Providers';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: 'Rajshahi Mangoes - Premium Fresh Mangoes',
  description: 'Order premium mangoes from Rajshahi with custom boxes and fast delivery across Bangladesh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Nunito, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://matikaren.jurajmarcinka123.chatgpt.site'),
  title: 'Matikáreň | Matematika, ktorej rozumieš',
  description:
    'Doučovanie matematiky pre ZŠ, SŠ a VŠ. Príprava na T9, prijímačky a maturitu.',
  icons: {
    icon: '/matikaren-logo.png',
  },
  openGraph: {
    title: 'Matikáreň | Matematika, ktorej rozumieš',
    description:
      'Doučovanie matematiky pre ZŠ, SŠ a VŠ. Príprava na T9, prijímačky a maturitu.',
    url: 'https://matikaren.jurajmarcinka123.chatgpt.site',
    siteName: 'Matikáreň',
    locale: 'sk_SK',
    type: 'website',
    images: [
      {
        url: 'https://matikaren.jurajmarcinka123.chatgpt.site/og.png',
        width: 1734,
        height: 909,
        alt: 'Matikáreň – Matematika, ktorej rozumieš.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matikáreň | Matematika, ktorej rozumieš',
    description:
      'Doučovanie matematiky pre ZŠ, SŠ a VŠ. Príprava na T9, prijímačky a maturitu.',
    images: ['https://matikaren.jurajmarcinka123.chatgpt.site/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#061947',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" style={{ backgroundColor: '#061947' }}>
      <body
        className={`${poppins.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
        style={{ backgroundColor: '#061947' }}
      >
        {children}
      </body>
    </html>
  );
}

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

const siteTitle = 'Matikáreň – Doučovanie matematiky, T9 a prijímačky';
const siteDescription = 'Doučovanie matematiky a príprava na Testovanie 9 a prijímačky na strednú školu. Skúsení lektori, malé skupiny aj individuálne hodiny online a osobne.';

export const metadata: Metadata = {
  metadataBase: new URL('https://matikaren.sk'),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/matikaren-logo.png',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://matikaren.sk/',
    siteName: 'Matikáreň',
    locale: 'sk_SK',
    type: 'website',
    images: [
      {
        url: 'https://matikaren.sk/og.png',
        width: 1734,
        height: 909,
        alt: 'Matikáreň – Matematika, ktorej rozumieš.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['https://matikaren.sk/og.png'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Matikáreň',
            alternateName: ['Matikaren', 'matikaren.sk'],
            url: 'https://matikaren.sk/',
          }) }}
        />
        {children}
      </body>
    </html>
  );
}

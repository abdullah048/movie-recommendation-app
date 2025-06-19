import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const dmSans = localFont({
  src: './fonts/DMSans-VF.ttf',
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MovieMosaic - Discover, Rate, and Share Movies You Love',
  description:
    'Explore trending films, hidden gems, and personal recommendations. Create watchlists, rate movies, and share favorites with friends on MovieMosaic.',
  keywords: [
    'movie recommendations',
    'movie ratings',
    'create watchlist',
    'top movies to watch',
    'hidden gem movies',
    'social movie app',
    'streaming guide',
    'film discovery platform',
    'share movie favorites',
    'movie suggestions',
  ],
  openGraph: {
    title: 'MovieMosaic — Personalized Movie Discovery & Sharing',
    description:
      'Find the best movies for every mood. Add to watchlist, rate them, and share what you love with friends on MovieMosaic.',
    url: 'https://movie-mosiac.asprojects.men',
    type: 'website',
    images: 'https://movie-mosiac.asprojects.men/hero-img.png',
    siteName: 'MovieMosaic',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={dmSans.variable}>
      <body className='antialiased bg-black-100 text-white'>{children}</body>
    </html>
  );
}

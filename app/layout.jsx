import { Instrument_Serif, Hanken_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'SportNest - Your All-Access Pass to Play',
  description: 'Book football turfs, badminton courts, swimming lanes, and tennis courts near you.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${hankenGrotesk.variable} ${spaceMono.variable} bg-grain antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

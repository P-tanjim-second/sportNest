import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'SportNest - Your All-Access Pass to Play',
  description: 'Book football turfs, badminton courts, swimming lanes, and tennis courts near you.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-grain antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

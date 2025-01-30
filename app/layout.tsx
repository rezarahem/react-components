import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';

export const metadata: Metadata = {
 title: 'react-components',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html>
   <body>
    <ThemeProvider
     attribute='class'
     defaultTheme='system'
     enableSystem
     disableTransitionOnChange>
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}

import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import SessionProvider from '../providers/SessionProvider';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'MyAmazon',
    description: 'I will make your wallet cry',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <SessionProvider>
                    <NextTopLoader />
                    <Navbar />
                    <main className='m-auto min-w-[300px] max-w-7xl p-4'>{children}</main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}

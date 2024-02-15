
import { Nunito } from 'next/font/google'

import Navbar from '@/components/navbar/Navbar';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import SearchModal from '@/components/modals/SearchModal';
import RentModal from '@/components/modals/RentModal';

import ToasterProvider from '@/providers/ToasterProvider';

import './globals.css'
import ClientOnly from '@/components/ClientOnly';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

export const metadata = {
  title: 'Property example',
  description: 'Property example',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <Navbar/>
          </ClientOnly>
          <div className="pb-20 pt-28">
              {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}

'use client'

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import localFont from "next/font/local";
import { DotPattern } from "@/components/ui/dot-pattern"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-rose-50`}>
          <DotPattern
            className="fixed inset-0 opacity-80 pointer-events-none"
          />
          <div className="relative">
            <div className="p-4 bg-rose-50 flex justify-center border-2 border-orange-700">
              <div className='flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0'>
                <div
                  id='left-menu-items'
                  className='flex'
                >
                  <nav className="space-x-4 md:space-x-20">
                    <Link href="/create" className="text-lg font-semibold px-4 py-2 bg-slate-50 border-2 border-amber-800 rounded-md hover:bg-[#d6ebf3] transition-colors">create</Link>
                    <Link href="/upload" className="text-lg font-semibold px-4 py-2 bg-slate-50 border-2 border-amber-800 rounded-md hover:bg-[#d6ebf3] transition-colors">upload</Link>
                  </nav>
                </div>
                <div id='heading' className='flex justify-center'>
                  <a href="/" className="text-2xl md:text-4xl font-mono text-center">art & friends</a>
                </div>
                <div id='right-menu-items' className='flex items-center space-x-4 md:space-x-20'>
                  <div id='profile'>
                    <Link href="/profile" className="text-lg font-semibold px-4 py-2 bg-slate-50 border-2 border-amber-800 rounded-md hover:bg-[#e3ecef] transition-colors">profile</Link>
                  </div>
                  <div id='clerk-user' className='flex'>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

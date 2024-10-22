import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { getURL } from '@/utils/helpers';
import '@/styles/main.css';
import { createClient } from '@/utils/supabase/server'
import SupabaseProvider from './supabase-provider'

const title = 'Next.js Subscription Starter';
const description = 'Brought to you by Vercel, Stripe, and Supabase.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  )
}

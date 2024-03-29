import '@/styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import LoginModel from '@/components/models/LoginModel'
import RegisterModel from '@/components/models/RegisterModel'
import EditModel from '@/components/models/EditModel'

import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react' 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster/>
      <EditModel />
      <RegisterModel />
      <LoginModel />
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </SessionProvider>
  )
}

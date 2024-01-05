import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar/Navbar'

export default function App({
  Component,
  pageProps: { session, ...pageProps},
}) 
{
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
        <Navbar />
        <Component {...pageProps} />
    </ThemeProvider>
  )
}
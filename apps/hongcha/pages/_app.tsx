import Header from 'components/Header';
import './index.css';
import type { AppProps } from 'next/app';
import Footer from 'components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

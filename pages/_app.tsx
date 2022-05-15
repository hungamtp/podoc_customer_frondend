import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppPropsWithLayout } from '@/models/common';
import { EmptyLayout } from '@/components/layouts';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return <Component {...pageProps} />;
}

export default MyApp;

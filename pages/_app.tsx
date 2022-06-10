import { EmptyLayout } from '@/components/layouts';
import { AppPropsWithLayout } from '@/models/common';
import { persistor, store } from '@/redux/store';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/raw-product.css';
import '../styles/product-detail.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import '../styles/global.scss';
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

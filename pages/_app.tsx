import { EmptyLayout } from "@/components/layouts";
import { AppPropsWithLayout } from "@/models/common";
import { persistor, store } from "@/redux/store";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/raw-product.css";
import "../styles/product-detail.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import "../styles/global.scss";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AXtc9DqyqTCgesK5RMtPckwA8VQ7r0zKWKMABjTFdZXrbIpMpFCz2BRMiFMM4W9b4gISymIZHp1kNnaK",
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PayPalScriptProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

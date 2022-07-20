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
import { useRouter } from "next/router";
import { useEffect } from "react";
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  const queryClient = new QueryClient();
  const router = useRouter();

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath") || "";
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname);
  }
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

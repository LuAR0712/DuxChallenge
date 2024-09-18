import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import { UserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <UserProvider initialUsers={pageProps.initialUsers}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </PrimeReactProvider>
  );
}

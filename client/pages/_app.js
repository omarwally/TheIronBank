import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";


function MyApp({ Component, pageProps }) {
const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}><Component {...pageProps} /></QueryClientProvider>;
}

export default MyApp;

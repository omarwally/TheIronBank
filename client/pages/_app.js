import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery, useQueryClient, useMutation, QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  //return <Component {...pageProps} />;
  return <QueryClientProvider client={queryClient}><Component {...pageProps} /> </QueryClientProvider >;

}

export default MyApp;

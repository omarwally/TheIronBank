// // import React from "react";
// // import ReactDom from "react-dom";
// // import { useState, useEffect } from "react";
// // import axios from "axios";

// // function Trans() {
// //   //   const [transactionss, setTransactionss] = useState([]);
// //   let transactionss = [];
// //   function gett() {
// //     axios.get("http://localhost:3002/transactions/list").then((response) => {
// //       const data = response.data;
// //       transactionss = data;
// //       //console.log(data);
// //     });
// //     return transactionss;
// //   }
// // }
// // export default Trans;
// import apiService from "../services/apiService";
// import {
//   useQuery,
//   useQueryClient,
//   useMutation,
//   QueryClientProvider,
//   QueryClient,
// } from "react-query";

// export function useFetchUser(transactionId) {
//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>
//       {useQuery(["transactionData", transactionId], () =>
//         apiService
//           .get(`transaction/list:${transactionId}`)
//           .then(({ data }) => data)
//       )}
//     </QueryClientProvider>
//   );
// }

import apiService from "../services/apiService";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
export function useFetchUser(userId) {
  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({ data }) => data)
  );
}


export function useMutateLoginUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email ? user.email : "");
      data.append("password", user?.password);
      return axios.post("http://localhost:3000/auth/login", user)
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        console.log(responseData.data.name)
        localStorage.setItem("jwt", responseData.data.token)
        localStorage.setItem("user", JSON.stringify(responseData.data._doc))

        window.location.replace("http://localhost:3001")
      },
      onError: (e) => console.log(e.message),
    }
  );
}
export function useMutateCreateAccount() {
  return useMutation(
    (acc) => {

      return axios.post('http://localhost:3000/account/post', acc);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {

      },
      onError: (e) => console.log(e.message),
    }
  );
}


export function useMutateCreateExternalTransaction() {
  return useMutation(
    (endPointState, data) => {



      // await axios
      //   .post(endPointState, data, {
      //     headers: {
      //       Authorization: "Bearer ${ ExToken }",
      //       "Bypass-Tunnel-Reminder": "any",
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      //       "Access-Control-Allow-Headers":
      //         "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      //     }
      //   })


    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {

      },
      onError: (e) => console.log(e.message),
    }
  );
}


export function useMutateupdateAccount() {
  return useMutation(
    (acc) => {
      return axios.put(`http://localhost:3000/account/${acc.accountId}`, acc);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        window.location.replace("http://localhost:3001")


      },
      onError: (e) => console.log(e.message),
    }
  );
}



export function useMutateCreateTransaction() {
  return useMutation(
    (Transaction) => {

      return axios.post('http://localhost:3000/external/post', Transaction);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {

      },
      onError: (e) => console.log(e.message),
    }
  );
}



export function usegetTransactions(transactionId) {
  return axios.get(`http://localhost:3000/external/${userId}`).then(({ data }) => data)

}

// export function useMutateGetAccount() {
//   return useMutation(
//     () => {
//       const toAccountId = localStorage.getItem("toAccountId")
//       return axios.get(`http://localhost:3000/account/acc/${toAccountId}`)
//     },
//     {
//       // When mutate is called:
//       onCompleted: (responseData) => {
//         console.log(responseData.data)
//       },
//       onError: (e) => console.log(e.message),
//     }
//   );

// }



export function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      return apiService.post(`http://localhost:3000/user/post`, user);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page
        window.location.replace("http://localhost:3001");
      },
      onError: (e) => console.log(e.message),
    }
  );
}

export function useMutateUpdateUser(userId) {
  const queryClint = useQueryClient();
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/${userId}`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        return queryClint.setQueryData(["userData", userId], (data) => {
          return [
            {
              email: responseData.data.body.email,
              password: responseData.data.body.password,
            },
            ...data,
          ];
        });
      },
      onError: (e) => console.log(e.message),
    }
  );
}

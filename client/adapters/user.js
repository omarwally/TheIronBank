import apiService from "../services/apiService";
import { useQuery, useQueryClient, useMutation } from "react-query";

export function useFetchUser(userId) {
  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({ data }) => data)
  );
}

export function useMutateLoginUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/login`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Store Token in local storage
      },
      onError: (e) => console.log(e.message),
    }
  );
}

<<<<<<< Updated upstream
=======
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

export function useMutateupdateAccount() {
  return useMutation(
    (acc) => {
      const accountId = localStorage.getItem("accountid")
      return axios.put(`http://localhost:3000/account/${accountId}`, acc);
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

      return axios.post('http://localhost:3000/transactions/post', Transaction);
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
  return axios.get(`http://localhost:3000/transactions/${userId}`).then(({ data }) => data)

}

export function useMutateGetAccount() {
  return useMutation(
    () => {
      const toAccountId = localStorage.getItem("toAccountId")
      return axios.get(`http://localhost:3000/account/acc/${toAccountId}`)
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        console.log(responseData.data)
      },
      onError: (e) => console.log(e.message),
    }
  );

}



>>>>>>> Stashed changes
export function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/register`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page
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

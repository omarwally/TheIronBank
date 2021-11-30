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
      data.append("giuEmail", user.giuEmail);
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


export  function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      return apiService.post(`http://localhost:3002/users/postt`, user);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page
        window.location.replace("http://localhost:3000");
      },
      onError: (e) => console.log(e.message), 
    }
  );
}

export  function useMutateUpdateUser(userId) {
  const queryClint = useQueryClient();
  return useMutation(
    (user) => {
      return apiService.post(`user/${userId}`, user);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        return queryClint.setQueryData(
          ["userData", userId],
          (data) => {
            return [
              {
                giuEmail: responseData.data.body.giuEmail,
                password: responseData.data.body.password,
                confirmPassword: responseData.data.body.confirmPassword,
                name: responseData.data.body.name,
                username: responseData.data.body.username,
                phone: responseData.data.body.phone,
                giuID: responseData.data.body.giuID,

              },
              ...data,
            ];
          }
        );
      },
      onError: (e) => console.log(e.message),
    }
  );
}

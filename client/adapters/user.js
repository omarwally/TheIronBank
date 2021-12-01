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
      data.append("email", user.email?user.email:"");
      data.append("password", user?.password);
      return axios.post("http://localhost:3002/auth/login",user)},
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        console.log(responseData.headers['x-access-token'])
        localStorage.setItem("jwt",responseData.headers['x-access-token'])
        console.log(localStorage.getItem("jwt"))
      },
      onError: (e) => console.log(e.message),
    }
  );
}

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

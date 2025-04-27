import axios from "axios";

export const useAxios = () => {
  const request = ({ url, method, body, params }) => {
    return axios({
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params,
    }).then((res) => res.data.data);
  };
  return request;
};

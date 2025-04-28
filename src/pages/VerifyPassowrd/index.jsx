import { Input } from "antd";
import React from "react";
import { useAxios } from "../../hooks/useAxios";

const VerifyPassowrd = () => {
  const axios = useAxios();
  const onChange = (text) => {
    axios({
      url: "api/auth/verify",
      method: "POST",
      body: {
        email: localStorage.getItem("email"),
        code: text,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div className="flex-col w-[400px] h-screen flex items-center justify-center m-auto gap-5">
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
    </div>
  );
};

export default VerifyPassowrd;

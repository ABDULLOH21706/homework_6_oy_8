import { Input } from "antd";
import React, { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyPassowrd = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const axios = useAxios();
  const onChange = (text) => {
    setLoading(true);
    axios({
      url: "api/auth/verify",
      method: "POST",
      body: {
        email: localStorage.getItem("email"),
        code: text,
      },
    })
      .then((res) => {
        toast.success("xush kelibsiz !");
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/")
      })
      .catch((error) => toast.error("parol xato, qaytadan urinib ko'ring !")).finally(() => setLoading(false))
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div className="flex-col w-[400px] h-screen flex items-center justify-center m-auto gap-5">
      {loading ? (
        <Loader className="animate-spin" />
      ) : (
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      )}
    </div>
  );
};

export default VerifyPassowrd;

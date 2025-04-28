import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const SignUp = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const register = (e) => {
    setLoading(true);
    axios({
      url: "api/auth/sign-up",
      method: "POST",
      body: e,
    })
      .then(() => {
        localStorage.setItem("email", e.email)
        toast.success("Iltimos emailingizga borgan parollni kiriting !")
        navigate("/verify-password")
      })
      .catch((error) => {
        toast.error("Bu email oldin ro'yxatdan o'tgan !")
        navigate("/sign-in")
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex-col w-[400px] h-screen flex items-center justify-center m-auto gap-5">
      <div className="text-center">
        <h1>Ro'yxatdan o'ting !</h1>
        <p>Biz yanada yaxshiroq bo'lishga intilamiz</p>
      </div>
      <Form className="w-full" onFinish={register}>
        <Form.Item
          name={"first_name"}
          rules={[{ required: true, message: "ilitmos maydonni to'ldiring !" }]}
        >
          <Input placeholder="ismingizni kiriting..." />
        </Form.Item>
        <Form.Item
          name={"last_name"}
          rules={[{ required: true, message: "ilitmos maydonni to'ldiring !" }]}
        >
          <Input placeholder="Familiyangizni kiriting..." />
        </Form.Item>
        <Form.Item
          name={"email"}
          rules={[{ required: true, message: "ilitmos maydonni to'ldiring !" }]}
        >
          <Input placeholder="Emailingizni kiriting..." />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "ilitmos maydonni to'ldiring !" }]}
        >
          <Input.Password placeholder="****************" />
        </Form.Item>
        <Button htmlType="submit" className="w-full" type="primary">
          {loading ? <Loader className="animate-spin" /> : "Ro'yxatdan o'tish"}
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;

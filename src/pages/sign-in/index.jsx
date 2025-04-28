import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useAxios } from "../../hooks/useAxios";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = (e) => {
    setLoading(true);
    axios({ url: "api/auth/sign-in", method: "POST", body: e })
      .then((data) => {
        toast.success("Xush kelibsiz");
        let { token } = data.data;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error.response?.data || error.message);
        toast.error(
          error.response?.data?.message || "Loginda xatolik yuz berdi"
        );
      })

      .finally(() => setLoading(false));
  };
  return (
    <div className="flex-col w-[400px] h-screen flex items-center justify-center m-auto gap-5">
      <div className="text-center">
        <h1>Hayrli kun !</h1>
        <p>Biz yanada yaxshiroq bo'lishga intilamiz !</p>
      </div>
      <Form onFinish={login} className="w-full">
        <Form.Item
          name={"email"}
          rules={[
            { required: true, message: "iltimos emailingizni kiriting !" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[
            { required: true, message: "iltimos passwordingizni kiriting !" },
          ]}
        >
          <Input.Password placeholder="**************" />
        </Form.Item>
        <Link to="/sign-up" className="text-end w-full">
          Siz ro'yxatdan o'tmaganmisiz?
        </Link>

        <Button className="w-full h-[45px]" htmlType="submit" type="primary">
          {loading ? <Loader className="animate-spin text-[16px]" /> : "Kirish"}
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;

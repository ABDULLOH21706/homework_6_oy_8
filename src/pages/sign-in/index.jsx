import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useAxios } from "../../hooks/useAxios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const login = async (values) => {
    setLoading(true);
    try {
      const data = await axios({
        url: "api/auth/sign-in",
        method: "POST",
        body: values,
      });

      const { token } = data.data;
      const { email } = data.data;
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);

      message.success("Xush kelibsiz!");
      navigate("/");
      form.resetFields();
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message || "Loginda xatolik yuz berdi"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col w-[400px] h-screen flex items-center justify-center m-auto gap-5">
      <div className="text-center">
        <h1>Hayrli kun !</h1>
        <p>Biz yanada yaxshiroq bo'lishga intilamiz !</p>
      </div>
      <Form form={form} onFinish={login} className="w-full">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Iltimos emailingizni kiriting!" },
            { type: "email", message: "Email formati noto'g'ri!" },
          ]}
        >
          <Input placeholder="Email" aria-label="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Iltimos parolingizni kiriting!" },
            {
              min: 6,
              message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
            },
          ]}
        >
          <Input.Password placeholder="**************" aria-label="Parol" />
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

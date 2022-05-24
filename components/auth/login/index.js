import { Form, Input, Button } from "antd";
import React, { useContext } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../store/auth";
import { useRouter } from "next/router";

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};

const LoginForm = ({ setStatus }) => {
  const router = useRouter();
  const { setAuthNewState } = useContext(AuthContext);

  return (
    <Form
      layout="vertical"
      name="login"
      {...layout}
      onFinish={(value) => {
        console.log(value);
        axios
          .post("/api/auth/login", value)
          .then((res) => {
            axios
              .post("/api/auth/user", { user: res.data.user })
              .then((res) => {
                window.localStorage.setItem("user", JSON.stringify(res.data.user));
                if (res.data.token) {
                  setAuthNewState({
                    token: res.data.token,
                    user: res.data.user,
                  });
                  toast.success("شما با موفقیت وارد شدید!");
                  router.push("/");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            if (err.response) {
              toast.error(err.response.data.error);
            } else {
              toast.error("مشکلی رخ داده است!");
            }
          });
      }}
      onFinishFailed={(err) => {
        toast.warning("لطفا فیلد های الزامی را وارد کنید!");
      }}
    >
      <Form.Item
        label="نام کاربری "
        name="username"
        rules={[
          { required: true, message: "نام کاربری را وارد کنید!" },
          { min: 5, message: "نام کاربری باید بیش از 5 حرف باشد!" },
          {
            pattern: /^[A-Za-z][a-zA-Z0-9_-]+$/,
            message: "نام کاربری نباید شامل حروف غیر انگلیسی و معتبر باشد!",
          },
          {
            whitespace: true,
            message: "فاصله نامعتبر است!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="رمز عبور "
        name="password"
        rules={[
          { required: true, message: "رمزعبور را وارد کنید!" },
          { min: 6, message: "رمزعبور شما می بایست بیش از 6 حرف باشد!" },
          {
            whitespace: true,
            message: "فاصله نامعتبر است!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout} className="text-center ">
        <Button className={styles.submit_btn} htmlType="submit">
          {" "}
          ورود{" "}
        </Button>
        <br />
        <Button onClick={() => setStatus(true)} className="mt-3" type="link">
          ثبت نام نکرده اید؟
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

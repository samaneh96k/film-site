import React from "react";
import styles from "./register.module.css";
import { Form, Button, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

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

const RegisterForm = ({ setStatus }) => {
  return (
    <Form
      layout="vertical"
      name="register"
      {...layout}
      onFinish={(value) => {
        console.log(value);
        if (value.password === value.re_password) {
          const { username, password, email } = value;
          const values = { username, password, email };
          axios
            .post("/api/auth/register", values)
            .then((res) => {
              console.log(res);
              toast.success("ثبت نام با موفقیت انجام شد!");
            })
            .catch((err) => {
              if(err.response){
          
                toast.error(err.response.data.error)
              }else{
                toast.error("مشکلی رخ داده است!")
              }
              
            });
        } else {
          toast.error("تکرار رمز عبور اشتباه است!");
        }
      }}
      onFinishFailed={(err) => {
        // console.log(err);
        toast.warning("لطفا فیلد های الزامی را وارد کنید!")
      }}
    >
      <Form.Item
        label="پست الکترونیکی "
        name="email"
        rules={[
          { required: true, message: "پست الکترونیکی را وارد کنید!" },
          { type: "email", message: "ایمیل وارد شده معتبر نیست!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        
        help="مانند : user_2 , user23675 , user_user"
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
      <Form.Item
        label="تکرار رمز عبور"
        name="re_password"
        rules={[
          { required: true, message: "تکرار رمزعبور را وارد کنید!" },
          { min: 6, message: "تکرار رمزعبور شما می بایست بیش از 6 حرف باشد!" },

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
          ثبت نام{" "}
        </Button>
        <br />
        <Button onClick={() => setStatus(false)} className="mt-3" type="link">
          می خواهم وارد شوم.
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;

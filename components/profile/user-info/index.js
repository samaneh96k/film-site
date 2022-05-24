import React, { useContext, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { Card } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../../store/auth";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { authState ,  setAuthNewState} = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  return (
    <div className="mt-5">
      <Card className="p-3">
        <Card.Body>
          <Form
            layout="vertical"
            initialValues={{ email: authState.user.email }}
            onFinish={(values) => {
              console.log(values);
              Modal.confirm({
                title: <h2 className="rtl text-right">ذخیره سازی اطلاعات</h2>,
                content: (
                  <p className="rtl text-right">
                    در صورتی که از ذخیره سازی اطلاعات وارد شده اطمینان دارید بر
                    روی تایید کلیک کنید.
                  </p>
                ),
                okText: "تایید",
                cancelText: "لغو",
                cancelButtonProps: "danger",
                onOk: () => {
                  const newValues = {
                    ...values,
                    username: authState.user.username,
                  };
                  axios
                    .put("/api/user/update", { values: newValues })
                    .then((res) => {
                        setAuthNewState({user:res.data.user , token:authState.token})
                        toast.success("اطلاعات وارد شده با موفقیت تغییر پیدا کرد!")
                    })
                    .catch((err) => {
                      if (err.response) {
                        toast.error(err.response.data.error);
                      } else {
                        toast.error("مشکلی رخ داده است!");
                      }
                    });
                  setDisabled(true);
                },
              });
            }}
            onFinishFailed={(err) => {
              console.log(err);
            }}
          >
            <Form.Item
              label="پست الکترونیکی"
              name="email"
              rules={[
                { required: true, message: "پست الکترونیکی را وارد کنید!" },
                { type: "email", message: "ایمیل وارد شده معتبر نیست!" },
              ]}
            >
              <Input disabled={disabled} />
            </Form.Item>
            <Form.Item
              label="رمز عبور گذشته"
              name="past_password"
              rules={[
                { min: 6, message: "رمزعبور شما می بایست بیش از 6 حرف باشد!" },

                {
                  whitespace: true,
                  message: "فاصله نامعتبر است!",
                },
              ]}
            >
              <Input.Password disabled={disabled} />
            </Form.Item>
            <Form.Item
              label="رمز عبور جدید"
              name="password"
              rules={[
                { min: 6, message: "رمزعبور شما می بایست بیش از 6 حرف باشد!" },

                {
                  whitespace: true,
                  message: "فاصله نامعتبر است!",
                },
              ]}
            >
              <Input.Password disabled={disabled} />
            </Form.Item>
            {disabled ? (
              <div className="text-center">
                <Button onClick={() => setDisabled(false)} type="link">
                  تغییر اطلاعات کاربری
                </Button>
              </div>
            ) : (
              <Form.Item className="text-center">
                <Button htmlType="submit" type="link">
                  تایید تغییر اطلاعات کاربری
                </Button>
              </Form.Item>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserInfo;

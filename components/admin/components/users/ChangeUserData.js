import React from "react";
import { Form, Input, Button, Select , Switch } from "antd";
import axios from "axios"
import { toast } from "react-toastify";
const { Option } = Select;
const ChangeUserDataModal = ({userData}) => {
    
  return (
    <div>
      <Form
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
          axios.post("/api/admin/users/update" , {values , userId:userData._id}).then(res => {
            //   console.log(res)
              toast.success("تغییرات با موفقیت اعمال شد!")
          }).catch(err => {
            //   console.log(err)
              toast.error("مشکلی رخ داده است!")
          })
        }}
        onFinishFailed={(err) => toast.error("لطفا مقادیر را بدرستی وارد کنید!")}
        initialValues={{username:userData.username , role:userData.role , sub:userData.sub}}
      >
        <Form.Item name="username" label="نام کاربری">
          <Input />
        </Form.Item>
        <Form.Item name="role" label="نقش کاربر">
          <Select
            placeholder="نقش کاربر را وارد کنید."
            
            allowClear
          >
            <Option value="admin">ادمین</Option>
            <Option value="user">کاربر عادی</Option>
          </Select>
        </Form.Item>
        <Form.Item name="sub" valuePropName="checked" label="وضعیت اشتراک">
          <Switch />
        </Form.Item>
        <Form.Item className="text-center">
          <Button htmlType="submit">تغییر اطلاعات</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeUserDataModal;

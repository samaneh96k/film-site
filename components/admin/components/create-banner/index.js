import React from "react";
import { Form, Input, InputNumber, Divider, Button , Switch } from "antd";
import UploadComponent from "../../../upload";
import styles from "./create-banner.module.css";
import classNames from "classnames";
import axios from "axios";
import { toast } from "react-toastify";
import SearchFilm from "../../../search-films/search-film";

const CreateBannerPage = () => {
  const [form] = Form.useForm();
  return (
    <div className={classNames(styles.form_div, "w-100")}>
      <Divider>
        <h2>ایجاد بنر جدید</h2>
      </Divider>
      <Form
        form={form}
        layout="vertical"
        initialValues={{show:false}}
        onFinish={(values) => {
          console.log(values);
          axios
            .post("/api/admin/home/banner", { values })
            .then((res) => {
              console.log(res);
              // if (res.data._id) {
                toast.success(`بنر با موفقیت ایجاد شد!`);
                form.resetFields();
              // }
            })
            .catch((err) => {
              toast.error("مشکلی رخ داده است!");
              console.log(err);
            });
        }}
        onFinishFailed={(err) => {
          console.log(err);
        }}
        className="mb-3"
      >
        
        <Form.Item
          className="text-center"
          label="انتخاب فیلم"
          name="film"
          rules={[{ required: true, message: "فیلم مورد نظر را انتخاب کنید!" }]}
        >
            <SearchFilm getFilmID={id => form.setFieldsValue({film:id})}/>
        </Form.Item>
        <Form.Item
          className="text-center"
          label="بارگذاری بنر جدید"
          name="banner"
          rules={[{ required: true, message: "بنر را بارگذاری کنید!" }]}
        >
          <UploadComponent
            key="banner"
            img={true}
            afterUpload={(value) => {
              form.setFieldsValue({ banner: value[0]._id });
            }}
          />
        </Form.Item>
        <Form.Item
          className="text-center"
          label="وضعیت نمایش بنر جدید"
          name="show"
          
        >
            <Switch onChange={value => form.setFieldsValue({show:value})}/>
        </Form.Item>
        
        <Form.Item>
          <Button block htmlType="submit" size="large">
            ایجاد بنر
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBannerPage;

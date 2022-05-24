import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import axios from "axios";
import UploadComponent from "../../../upload/index";
import { toast } from "react-toastify";
import moment from "moment-jalaali";

const ChangeFilmDataModal = ({ filmData }) => {
  const [form] = Form.useForm();
  return (
    <div className="w-100">
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
          axios
            .put("/api/admin/films/update", { values:{...values, filmId: filmData._id} })
            .then((res) => {
                console.log(res.data)
              toast.success("تغییرات با موفقیت اعمال شد!");
            })
            .catch((err) => {
              //   console.log(err)
              toast.error("مشکلی رخ داده است!");
            });
        }}
        onFinishFailed={(err) =>
          toast.error("لطفا مقادیر را بدرستی وارد کنید!")
        }
        initialValues={{
          name: filmData.name,
          content: filmData.content,
          imdb_score: filmData.imdb_score,
          date: filmData.date,
          time: filmData.time,
          poster: filmData.poster._id,
          video: filmData.video,
        }}
      >
        <Form.Item
          label="عنوان فیلم"
          name="name"
          rules={[{ required: true, message: "نام فیلم را وارد کنید!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="توضیحات فیلم"
          name="content"
          rules={[
            { required: true, message: "توضیحات فیلم را وارد کنید!" },
            { min: 30, message: "توضیحات فیلم می بایست بیش از 30 حرف باشد!" },
            {
              max: 500,
              message: "توضیحات فیلم می بایست کمتر از 500 حرف باشد!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="امتیاز IMDB "
          name="imdb_score"
          rules={[
            { required: true, message: "امتیاز IMDB فیلم را وارد کنید!" },
          ]}
        >
          <InputNumber className="w-100" min={0} max={10} />
        </Form.Item>
        <Form.Item
          label="سال ساخت"
          name="date"
          rules={[{ required: true, message: "سال ساخت فیلم را وارد کنید!" }]}
        >
          <InputNumber
            className="w-100"
            min={1330}
            max={parseInt(moment(new Date()).format("jYYYY")) + 1}
          />
        </Form.Item>
        <Form.Item
          label="مدت زمان فیلم (دقیقه)"
          name="time"
          rules={[{ required: true, message: "مدت زمان فیلم را وارد کنید!" }]}
        >
          <InputNumber className="w-100" min={0} />
        </Form.Item>
        <Form.Item
          className="text-center"
          label="بارگذاری پوستر فیلم"
          name="poster"
          rules={[{ required: true, message: "پوستر فیلم را بارگذاری کنید!" }]}
        >
          <UploadComponent
            key="poster"
            img={true}
            afterUpload={(value) => {
              form.setFieldsValue({ poster: value[0]._id });
            }}
          />
        </Form.Item>
        <Form.Item
          className="text-center"
          label="بارگذاری فیلم"
          name="video"
          rules={[{ required: true, message: "فایل فیلم را بارگذاری کنید!" }]}
        >
          <UploadComponent
            key="film"
            afterUpload={(value) => {
              form.setFieldsValue({ video: value[0]._id });
            }}
          />
        </Form.Item>
        <Form.Item className="text-center">
          <Button htmlType="submit">تغییر اطلاعات</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeFilmDataModal;

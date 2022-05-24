import React from "react";
import { Form, Button, Switch } from "antd";
import axios from "axios";
import UploadComponent from "../../../upload/index";
import { toast } from "react-toastify";

import SearchFilm from "../../../search-films/search-film";

const ChangeBannerDataModal = ({ bannerData }) => {
  const [form] = Form.useForm();
  return (
    <div className="w-100">
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          console.log(values);
          axios
            .put("/api/admin/banners/update", {
              values: { ...values, bannerId: bannerData._id },
            })
            .then((res) => {
              // console.log(res);
              if(res.data._id){

                toast.success("تغییرات با موفقیت اعمال شد!");
              }else{
                toast.error("اطلاعات تغییر یافته ثبت نشد!")
              }
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
          film: bannerData.film,
          banner: bannerData.banner,
          show: bannerData.show,
        }}
      >
        <Form.Item
          label="فیلم"
          name="film"
          rules={[{ required: true, message: "فیلم را وارد کنید!" }]}
        >
          <SearchFilm initialValue={bannerData.film} getFilmID={film => form.setFieldsValue({film})}/>
        </Form.Item>
        <Form.Item
          className="text-center"
          label="بارگذاری بنر فیلم"
          name="banner"
          rules={[{ required: true, message: "بنر فیلم را بارگذاری کنید!" }]}
        >
          <UploadComponent
            key="banner"
            img={true}
            afterUpload={(value) => {
              form.setFieldsValue({ poster: value[0]._id });
            }}
          />
        </Form.Item>
        <Form.Item
          className="text-center"
          label="وضعیت نمایش بنر جدید"
          name="show"
            valuePropName="checked"
        >
          <Switch onChange={(value) => form.setFieldsValue({ show: value })} />
        </Form.Item>

        <Form.Item className="text-center">
          <Button htmlType="submit">تغییر اطلاعات</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeBannerDataModal;

import React, { useState } from "react";
import { Badge, Button, Space, Table, Modal, Divider } from "antd";
import useSWR from "swr";
import { toast } from "react-toastify";
import axios from "axios";
import classNames from "classnames";
import styles from "./banners.module.css";
import ChangeBannerDataModal from "./ChangeBannerData";
import moment from "moment-jalaali"

const BannersListAdminComponent = () => {
  const [pageSize, setPageSize] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState();

  const { error } = useSWR("/api/admin/banners", (url) =>
    axios
      .get(url, { params: { pageSize, page: activePage } })
      .then((res) => {
        console.log(res.data);
        setTableData(res.data.banners);
        setCount(res.data.count);
      })
      .catch((err) => toast.error("دریافت اطلاعات با مشکل مواجه شده است!"))
  );

  const handlePaginationChange = ({ page, pageSize }) => {
    axios
      .get("/api/admin/films", { params: { pageSize, page } })
      .then((res) => {
        setTableData(res.data.films);
        setCount(res.data.count);
      })
      .catch((err) => toast.error("دریافت اطلاعات با مشکل مواجه شده است!"));
  };

  const columns = [
    {
      title: "نام بنر فیلم",
      dataIndex: "film",
      key: "film",
      render: (text) => <a>{text.name}</a>,
    },
    {
      title: "تاریخ ساخت",
      dataIndex: "created",
      key: "created",
      render:(date) => <p>{moment(date).format("در تاریخ jYYYY/jM/jD و HH:mm:ss")}</p>
    },
    {
      title: "وضعیت نمایش",
      dataIndex: "show",
      key: "show",
      render:(text) => text ? <p className="text-success">منتشر شده</p> : <p className="text-danger">منتشر نشده</p>
    },

    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() =>
              Modal.info({
                title: `تغییر اطلاعات بنر فیلم ${record.film.name}`,
                content: <ChangeBannerDataModal bannerData={record} />,
                style: { direction: "rtl" },
                className: "w-75",
                okText: "لغو",
                okType: "danger",
              })
            }
          >
            تغییر
          </Button>
          <Divider type="vertical" />
          <Button
            danger
            type="text"
            onClick={() =>
              Modal.confirm({
                title: `حذف بنر`,
                content: (
                  <p className="text-right">
                    اگر از حذف بنر اطمینان دارید روی حذف کلیک کنید.
                  </p>
                ),
                style: { direction: "rtl" },
                okText: "حذف",
                okType: "danger",
                cancelText: "لغو",
                cancelButtonProps: "primary",
                okButtonProps:{className:"mr-2"},
                onOk:()=>{
                    axios.delete("/api/admin/banners/update" , {params:{bannerId:record._id}}).then(res => {
                        
                        if(res.data._id){
                            toast.warning("بنر مورد نظر با موفقیت حذف شد!")
                        }else{
                            toast.error("حذف صورت نگرفته است!")
                        }
                    }).catch(err => {
                        toast.error("مشکلی رخ داده است!")
                    })
                }
              })
            }
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  if (error) {
    toast.error("دریافت اطلاعات با مشکل مواجه شد!");
    return <div>مشکلی رخ داده است!</div>;
  }
  if (!tableData) {
    return <div>درحال بارگذاری...</div>;
  }
  console.log(tableData);
  return (
    <div className={classNames(styles.main_table, "w-100")}>
      <Table
        pagination={{
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setActivePage(page);
            setPageSize(pageSize);
            handlePaginationChange({ page, pageSize });
          },
          total: count,
        }}
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default BannersListAdminComponent;

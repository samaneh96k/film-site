import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import useSWR from "swr";

const HomeAdminComponent = () => {
  const { data, error } = useSWR("/api/admin/home/count");
  if (error) {
    toast.error("دریافت اطلاعات با مشکل مواجه شد!");
    return <div>مشکلی رخ داده است!</div>;
  }
  if (!data) {
    return <div>درحال بارگذاری...</div>;
  }

  return (
    <Row className="w-100 rtl">
      <Col xl={3} lg={3} md={4} sm={6} xs={12}>
        <Card
          className="rtl text-center"
          style={{ minHeight: "200px" }}
          text="light"
          bg="success"
        >
          <Card.Header>تعداد کاربران</Card.Header>
          <Card.Body>
            <h3 className="text-white">{data.users}</h3>
            <h2 className="text-white">کاربر</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={3} lg={3} md={4} sm={6} xs={12}>
        <Card
          className="rtl text-center"
          style={{ minHeight: "200px" }}
          text="light"
          bg="danger"
        >
          <Card.Header>تعداد فیلم ها</Card.Header>
          <Card.Body>
            <h3 className="text-white">{data.films}</h3>
            <h2 className="text-white">فیلم</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={3} lg={3} md={4} sm={6} xs={12}>
        <Card
          className="rtl text-center"
          style={{ minHeight: "200px" }}
          text="light"
          bg="secondary"
        >
          <Card.Header></Card.Header>
          <Card.Body>در حال بروزرسانی...</Card.Body>
        </Card>
      </Col>
      <Col xl={3} lg={3} md={4} sm={6} xs={12}>
        <Card
          className="rtl text-center"
          style={{ minHeight: "200px" }}
          text="light"
          bg="dark"
        >
          <Card.Header></Card.Header>
          <Card.Body>درحال بروز رسانی...</Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default HomeAdminComponent;

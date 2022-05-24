import { Avatar, Divider, Tag } from "antd";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import styles from "./film-details.module.css";

const FilmDetails = () => {
  return (
    <div>
      <Card className="rtl mt-3">
        <Divider>عوامل فیلم</Divider>
        <Row className="mb-4">
          <Col xl={1} lg={1} md={1} sm={1} xs={1}>
            <Tag className={styles.tag}>
              <Avatar
                size={32}
                src={
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }
              />
              {"آقای بازیگر"}
            </Tag>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FilmDetails;

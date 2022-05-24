import React, { useState } from "react";
import { Layout, Menu } from "antd";
import pages from "./menu";
import styles from "./admin-layout.module.css";
import classNames from "classnames";
import HomeAdminComponent from "../components/home";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const [activeComponent, setActiveComponent] = useState(<HomeAdminComponent />);

  //   const DetectComponent = (key) => {
  //     switch (key) {
  //       case pages[0].key:
  //         return pages[0].component;
  //       case pages[1].key:
  //         return pages[1].component;
  //       case pages[2].key:
  //         return pages[2].component;
  //       case pages[3].key:
  //         return pages[3].component;
  //     default:
  //         return ""
  //     }
  //   };

  return (
    <Layout className="rtl h-100">
      <Sider collapsed={true} className="rtl">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}>
          {pages.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => setActiveComponent(item.component)}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className={classNames(styles.site_layout, "rtl")}>
        <Content
          className={styles.site_layout_background}
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "90vh",
            height:"100%"
          }}
        >
          {
            //   DetectComponent()
            activeComponent
          }
        </Content>
      </Layout>
    </Layout>
  );
};

import { Divider, Badge, Avatar, Dropdown, Menu } from "antd";
import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import styles from "./layout.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../../store/auth";
import { toast } from "react-toastify";
import axios from "axios";

const Layout = ({ children, customize, setLoader }) => {
  const { isAuthenticated, authState, setAuthNewState } =
    useContext(AuthContext);
  const router = useRouter();

  const menu = (
    <Menu className={styles.avatar_menu}>
      <Menu.Item key="profile">
        <Link href={"/user/[id]"} as={`/user/${authState.user?.username}`}>
          <a>پروفایل</a>
        </Link>
      </Menu.Item>

      <Menu.Item
        key="logout"
        onClick={() => {
          axios
            .get("/api/auth/logout")
            .then((res) => {
              window.localStorage.removeItem("user");
              setAuthNewState({});
              toast.warning("شما از حساب کاربری خود خارج شدید!");
            })
            .catch((err) => console.log(err));
        }}
        danger
      >
        خروج
      </Menu.Item>
    </Menu>
  );

  console.log(router.pathname);
  if (customize) {
    return <div>{children}</div>;
  } else {
    return (
      <div>
        <Navbar className={styles.navbar} bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img src={"/favicon.ico"} /> تاپ فیلم
          </Navbar.Brand>
          <Divider
            style={{ backgroundColor: "white !important" }}
            type="vertical"
          />
          <Nav className="ml-auto">
            <Link href={"/"}>
              <Nav.Link active={router.pathname === "/"} href="#home">
                خانه
              </Nav.Link>
            </Link>
            <Link href={"/films"}>
              <Nav.Link
                active={router.pathname.split("/")[1] == "films"}
                href="#features"
              >
                فیلم ها
              </Nav.Link>
            </Link>
          </Nav>
          {isAuthenticated() === false ? (
            <Link href="/auth">
              <Button className={styles.auth_btn} variant="light">
                ورود
              </Button>
            </Link>
          ) : (
            <Dropdown overlay={menu}>
              <Badge
                dot
                status={authState.user?.sub === true ? "success" : "error"}
              >
                <Avatar src={authState.user?.profilePhoto} size={32}></Avatar>
              </Badge>
            </Dropdown>
          )}
        </Navbar>
        <div>{children}</div>
        <footer className={styles.footer}>
          <div className="mr-auto ml-auto">
            <p className="text-center ">@تمام حقوق تاپ فیلم متعلق به ما است</p>
          </div>
        </footer>
      </div>
    );
  }
};

export default Layout;

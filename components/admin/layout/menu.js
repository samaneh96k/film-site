import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    HomeOutlined
  } from "@ant-design/icons";
import BannersListAdminComponent from "../components/banners";
import CreateBannerPage from "../components/create-banner";
import CreateMediaPage from "../components/create-film";
import FilmsListAdminComponent from "../components/films";
import HomeAdminComponent from "../components/home";
import UsersListAdminComponent from "../components/users";

const pages = [
    {name:" صفحه اصلی" , key:"home" , icon:<HomeOutlined /> , component:<HomeAdminComponent />},
    {name:"لیست کاربران" , key:"users" , icon:<UserOutlined /> , component:<UsersListAdminComponent />},
    {name:"لیست فیلم ها" , key:"films" , icon:<VideoCameraOutlined /> , component:<FilmsListAdminComponent />},
    {name:"لیست بنر ها" , key:"banners" , icon:<VideoCameraOutlined /> , component:<BannersListAdminComponent />},
    {name:"لیست اسلایدر ها" , key:"sliders" , icon:<VideoCameraOutlined /> , component:<FilmsListAdminComponent />},
    {name:"ایجاد فیلم جدید" , key:"create_media" , icon:<UploadOutlined /> , component:<CreateMediaPage />},
    {name:"ایجاد بنر جدید" , key:"create_banner" , icon:<UploadOutlined /> , component:<CreateBannerPage />},
    {name:"ایجاد اسلایدر جدید" , key:"create_slider" , icon:<UploadOutlined /> , component:<CreateMediaPage />},
]

export default pages
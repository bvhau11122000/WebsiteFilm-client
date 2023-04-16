import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  UserAddOutlined,
  HeartOutlined ,
  FormOutlined,
  VideoCameraOutlined ,
  HomeOutlined,
  EyeOutlined 
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="DbSidebar">
      <Menu
        className="DbSidebarMenu"
        mode="vertical"
        onClick={(item) => {
          // item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            key: "/admin",
            icon: <HomeOutlined />,
            label: "HomePage",
          },
          {
            key: "/admin/User",
            icon: <UserAddOutlined />,
            label: "User",
          },
          {
            key: "/admin/Favorites",
            icon: <HeartOutlined />,
            label: "Favorites",
          },
          {
            key: "/admin/Reviews",
            icon: <FormOutlined />,
            label: "Reviews",
          },
          {
            key: "/admin/Film",
            icon: <VideoCameraOutlined />,
            label: "Film",
          },
          {
            key: "/admin/Views",
            icon: <EyeOutlined />,
            label: "Views",
          },
         
        ]}
      />
    </div>
  );
};

export default Sidebar;

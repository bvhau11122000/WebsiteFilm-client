import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Avatar,  Space } from "antd";
import { Link } from "react-router-dom";
const User = () => {
 

  return (
    <div style={{ cursor: "pointer" }}>
        <Space >
        <Link to={"/"}>
          <Avatar
            size="default"
            icon={<HomeOutlined />}
          ></Avatar>
          <span>{ "HOME"}</span>
          </Link>
        </Space>
    </div>
  );
};

export default User;

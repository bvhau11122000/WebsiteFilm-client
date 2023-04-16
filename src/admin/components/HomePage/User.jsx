import React from "react";
import { UserAddOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
const User = () => {
  const user = {
  };
  const items2 = [
  
    {
      key: "1",
      label: (
        <Link to="/">
          <div>Đăng xuất</div>
        </Link>
      ),
    },
  ];

  const items =
    Object.keys(user).length === 0
      ? [
          {
            key: "1",
            label: <Link to="/signin">Đăng nhập</Link>,
          },
          {
            key: "2",
            label: (
              <Link to="/signup">
                <div>Đăng ký</div>
              </Link>
            ),
          },
        ]
      : items2;

  return (
    <div style={{ cursor: "pointer" }}>
      <Dropdown menu={{ items }}>
     

        <Space>
          <Avatar
            size="default"
            icon={<UserAddOutlined />}
            src={user.image || ""}
          ></Avatar>
          <span>{user.name || "Người dùng"}</span>
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default User;

import { Typography,Space } from "antd";
import React from "react";
import "./footer.css";
import {PhoneOutlined, AndroidOutlined, ReadOutlined    } from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="DbFooter">
      <Space  >
        <PhoneOutlined  className="icon-all icon-PhoneOutlined "/> 
          <Typography.Link href="tel:+84 903 592 298" > +84 903 592 298 </Typography.Link>
      </Space>

      <Space>
        <AndroidOutlined className="icon-all icon-AndroidOutlined" />
          <Typography.Link href="https://github.com/bvhau11122000" target={"_blank"} >
            Quyền riêng tư
          </Typography.Link>
        </Space>

        <Space>
          <ReadOutlined className="icon-all icon-ReadOutlined "/>
          <Typography.Link href="https://github.com/bvhau11122000" target={"_blank"}>
            Điều khoản sử dụng
          </Typography.Link>
        </Space>
    </div>
  );
};

export default Footer;

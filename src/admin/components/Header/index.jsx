import React, { useEffect, useState } from "react";
import {  Space, Badge, Drawer, List } from "antd";
import { MailOutlined, BellOutlined } from "@ant-design/icons";
import User from "../HomePage/User";
import { getNotification } from "../../../api/index.js";
import "./header.css";


const Header = () => {
  const [notification, setNotification] = useState([]);

  const [hideNotification, setHideNotification] = useState(false);
  const [hideMail, setHideMail] = useState(false);
  useEffect(() => {
    getNotification().then((res) => {
      setNotification(res.comments);
    });
  }, []);
  return (
    <div className="DbHeader">
      <h1 >VANHAU</h1>
      <div className="DbHeader_item">
        <User />
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react'
import {  Space, Table,  } from "antd";
import mediaApi from '../../../api/moudules/media.api';
const View = () => {
    
  const [users, setUsers] = useState([]);

  // lấy data user
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("HAHAH");
      const { response } = await mediaApi.getList();
      console.log(response);
      if (response) {
        setUsers(response);
      } 
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <Space size={20} direction="vertical">
      <Table 
        columns={[
          { title: "ID", dataIndex: "ID", key: "id"},
          { title: "User", dataIndex: "user", key: "user" },
          { title: "MediaType", dataIndex: "mediaType",  key: "mediaType"  },
          { title: "MediaId", dataIndex: "mediaId", key: "mediaId",},
          { title: "MediaTitle", dataIndex: "mediaTitle", key: "mediaTitle", },
          { title: "MediaPoster", dataIndex: "mediaPoster", key: "mediaPoster", },
          { title: "CreatedAt",  dataIndex: "createdAt", key: "createdAt", },
          { title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt", },
          
        ]}
        dataSource={users || []}
        pagination={{
          pageSize: 5
        }}
      />
      </Space>
    </div>
  )
}

export default View;


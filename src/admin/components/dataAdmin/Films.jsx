import React from 'react'
import {  Space, Table,  } from "antd";

const Films = () => {
   
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
          pagination={{
          pageSize: 5
        }}
      />
      </Space>
    </div>
  )
}

export default Films;



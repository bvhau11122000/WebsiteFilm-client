import React, { useState, useEffect } from 'react'
import { Popconfirm, Space, Table,Button  } from "antd";
import {  DeleteOutlined,} from "@ant-design/icons";
import viewApi from '../../../api/moudules/view.api';
const View = () => {
    
  const [view, setView] = useState([]);

  // lấy data user
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("view");
      const { response } = await viewApi.getAll();
      console.log(response);
      if (response) {
        setView(response);
      } 
    };
    fetchUsers();
  }, []);

  const handleDelete = async (record) => {
    const { response } = await  viewApi.remove({ viewId: record.id });
    console.log("delete",response);
    if (response) {
      const newViews = view.filter((item) => item.id !== record.id);
      setView(newViews);
      console.log("delete1",newViews);
    }
  };

  return (
    <div>
      <Space size={20} direction="vertical">
      <Table 
        columns={[
          { title: "ID", dataIndex: "id", key: "id"},
          { title: "User", dataIndex: "user", key: "user" },
          { title: "MediaType", dataIndex: "mediaType",  key: "mediaType"  },
          { title: "MediaId", dataIndex: "mediaId", key: "mediaId",},
          { title: "MediaTitle", dataIndex: "mediaTitle", key: "mediaTitle", },
          { title: "MediaPoster", dataIndex: "mediaPoster", key: "mediaPoster", },
          { title: "CreatedAt",  dataIndex: "createdAt", key: "createdAt", },
          { title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt", },
          { title: "Delete", dataIndex: "Delete",key: "delete",
            render: (text, record) => (
              <Space size="middle">
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => handleDelete(record)}
                > 
                  <Button>
                    <DeleteOutlined style={{color: "red"}}/>
                  </Button>
                </Popconfirm>
              </Space>
            )
          }
        ]}
        dataSource={view || []}
        pagination={{
          pageSize: 5
        }}
      />
      </Space>
    </div>
  )
}

export default View;


import React, { useState, useEffect } from 'react'
import {  Popconfirm, Space, Table, Button} from "antd";
import {  DeleteOutlined,} from "@ant-design/icons";
import userApi from '../../../api/moudules/user.api.js';
const User = () => {
  
  const [users, setUsers] = useState([]);

  // lấy data user
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("HAHAH");
      const { response } = await userApi.getAll();
      console.log(response);
      if (response) {
        setUsers(response);
      } 
    };
    fetchUsers();
  }, []);

  const handleDelete = async (record) => {
    const { response } = await  userApi.remove({ userId: record.id });
    console.log("delete",response);
    if (response) {
      const newReviews = users.filter((item) => item.id !== record.id);
      setUsers(newReviews);
      console.log("delete1",newReviews);
    }
  };

  return (
    <Space size={20} direction="vertical">
      <Table 
        dataSource={users || []}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "username", dataIndex: "username",key: "username"},
          { title: "DisplayName", dataIndex: "displayName", key: "displayName"},
          { title: "Password", dataIndex: "password", key: "password",},
          { title: "CreatedAt", dataIndex: "createdAt", key: "createdAt",},
          {title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt", },
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
        pagination={{
        pageSize: 5
      }}
    />
    </Space>
  )
}

export default User

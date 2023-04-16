import React, {useState,useEffect} from 'react'
import { Popconfirm, Space, Table, Button } from "antd";
import {  DeleteOutlined,} from "@ant-design/icons";
import favoriteApi from '../../../api/moudules/favorite.api';
const Favorites = () => {
   
  const [favorite, setFavorites] = useState([]);

  //lấy date favorite từ server
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Hhihi");
      const { response } = await favoriteApi.getAll();
      console.log(response);
      if (response) {
        setFavorites(response);
      } 
    };
    fetchUsers();
  }, []);
  
  const handleDelete = async (record) => {
    const { response } = await favoriteApi.remove({ favoriteId: record.id });
    console.log("delete",response);
    if (response) {
      const newFavorites = favorite.filter((item) => item.id !== record.id);
      setFavorites(newFavorites);
      console.log("delete1",newFavorites);
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
          // { title: "CreatedAt",  dataIndex: "createdAt", key: "createdAt", },
          // { title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt", },
          { title: "Delete", dataIndex: "Delete", key: "delete",
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
        dataSource = {favorite}
        pagination={{
          pageSize: 5
        }}
      />
      </Space>
    </div>
  )
}

export default Favorites

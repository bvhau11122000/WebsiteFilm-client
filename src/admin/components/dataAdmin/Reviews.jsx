import React,{useState, useEffect} from 'react'
import { Popconfirm, Space, Table,  Button} from "antd";
import {  DeleteOutlined,} from "@ant-design/icons";
import reviewApi from '../../../api/moudules/review.api';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // lấy data review
    const fetchUsers = async () => {
      const { response } = await reviewApi.getAll();
      console.log("review",response);
      if (response) {
        setReviews(response);
      } 
    };
    fetchUsers();
  }, []);
 


  const handleDelete = async (record) => {
    const { response } = await reviewApi.remove({ reviewId: record.id });
    console.log("delete",response);
    if (response) {
      const newReviews = reviews.filter((item) => item.id !== record.id);
      setReviews(newReviews);
      console.log("delete1",newReviews);
    }
  };

  return (
    <Space size={20} direction="vertical">
      <Table 
        dataSource={reviews}
          columns={[
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "User", dataIndex: "user", key: "user" },
            { title: "content", dataIndex: "content", key: "content" },
            { title: "MediaType", dataIndex: "mediaType", key: "mediaType"},
            { title: "MediaId", dataIndex: "mediaId", key: "mediaId",},
            { title: "MediaTitle", dataIndex: "mediaTitle",key: "mediaTitle",},
            { title: "MediaPoster", dataIndex: "mediaPoster", key: "mediaPoster", },
            // { title: "CreatedAt", dataIndex: "createdAt", key: "createdAt",},
            // { title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt",},
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
          pagination={{
          pageSize: 5
        }}
      />
    </Space>
  )
}

export default Reviews

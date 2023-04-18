import React, {useState, useEffect} from 'react'
import {  Space, Table, Input,Button,Popconfirm } from "antd";
import {  DeleteOutlined,} from "@ant-design/icons";
import filmApi from '../../../api/moudules/flim.api';

const Films = () => {
   
  const [films, setFilms] = useState([]);
  const [moviesname, setMoviesname] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaPoster, setMediaPoster] = useState("");
  const [mediaRate, setMediaRate] = useState("");

  const handleAddFilm = async () => {
    const result = await filmApi.add ({
      moviesname,
      mediaId,
      mediaType,
      mediaTitle,
      mediaPoster,
      mediaRate
    });
    if (result.success) {
      // clear input values
      setMoviesname("");
      setMediaId("");
      setMediaType("");
      setMediaTitle("");
      setMediaPoster("");
      setMediaRate("");
    }
    const fetchUsers = async () => {
      const { response } = await filmApi.getAll();
      if (response) {
        setFilms(response);
      } 
    };
    fetchUsers();
  };

  useEffect(() => {
    // lấy data flims
    const fetchUsers = async () => {
      const { response } = await filmApi.getAll();
      console.log("film",response);
      if (response) {
        setFilms(response);
      } 
    };
    fetchUsers();
  }, []);

  const handleDelete = async (record) => {
    const { response } = await filmApi.remove({ filmId: record.id });
    console.log("delete",response);
    if (response) {
      const newFilm = films.filter((item) => item.id !== record.id);
      setFilms(newFilm);
      console.log("delete1",newFilm);
    }
  };
  return (
    <div>
      <Space size={20} direction="vertical">
      <Space direction="vertical">
      <Space>
        <Input
          value={moviesname}
          onChange={(e) => setMoviesname(e.target.value)}
          placeholder="Films"
        />
        <Input
          value={mediaId}
          onChange={(e) => setMediaId(e.target.value)}
          placeholder="MediaId"
        />
        <Input
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          placeholder="MediaType"
        />
        </Space>
        <Space>
        <Input
          value={mediaTitle}
          onChange={(e) => setMediaTitle(e.target.value)}
          placeholder="MediaTitle"
        />
        <Input
          value={mediaPoster}
          onChange={(e) => setMediaPoster(e.target.value)}
          placeholder="MediaPoster"
        />
        <Input
          value={mediaRate}
          onChange={(e) => setMediaRate(e.target.value)}
          placeholder="MediaRate"
        />
        </Space>
        <Button type="primary"  onClick={handleAddFilm}>
          Add Film
        </Button>
      </Space>
      <Table 
        columns={[
          { title: "ID", dataIndex: "id", key: "id"},
          { title: "Films", dataIndex: "moviesname", key: "moviesname" },
          { title: "MediaType", dataIndex: "mediaType",  key: "mediaType"  },
          { title: "MediaId", dataIndex: "mediaId", key: "mediaId",},
          { title: "MediaTitle", dataIndex: "mediaTitle", key: "mediaTitle", },
          { title: "MediaPoster", dataIndex: "mediaPoster", key: "mediaPoster", },
          { title: "MediaRate", dataIndex: "mediaRate", key: "mediaRate", },
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
        dataSource={films}
        pagination={{
          pageSize: 4
        }}
      />
      </Space>
    </div>
  )
}

export default Films;



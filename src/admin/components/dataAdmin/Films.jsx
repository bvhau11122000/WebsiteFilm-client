import React, {useState, useEffect} from 'react'
import {  Space, Table, Input,Button,Popconfirm,Form, Modal, Option ,Select } from "antd";
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

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    handleAddFilm();
    setConfirmLoading(true);           
    setTimeout(() => {    
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAddFilm = async () => {
    const result = await filmApi.add ({
      moviesname,
      mediaId,
      mediaType,
      mediaTitle,
      mediaPoster,
      mediaRate
    });
    console.log(result,"hihihih");
    if (result.response) {
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
    if (response) {
      const newFilm = films.filter((item) => item.id !== record.id);
      setFilms(newFilm);
    }
  };
  return (
    <div>
      <Space size={20} direction="vertical">
      <Space direction="vertical">
        <Button 
          type="primary"
          onClick={showModal}
          >
          Add film
        </Button>
      
        <Modal
          title="Add "
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item>
              <label >Add films</label>
              <Input
                value={moviesname}
                onChange={(e) => setMoviesname(e.target.value)}
                placeholder="Films"
              />
            </Form.Item>

            <Form.Item>
              <label >MeadiaId</label>
              <Input
                value={mediaId}
                onChange={(e) => setMediaId(e.target.value)}
                placeholder="MediaId"
              />
            </Form.Item>

            <Form.Item>
              <label >MediaType</label> 
              <Select
                value={mediaType}
                onChange={(value) => setMediaType(value)}
                placeholder="MediaType"
                style={{
                  width: "100%",
                }}
                options={[
                  {
                    value: 'tv',
                    label: 'tv',
                  },
                  {
                    value: 'movie',
                    label: 'movie',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <label >MediaTitle</label>
              <Input
                value={mediaTitle}
                onChange={(e) => setMediaTitle(e.target.value)}
                placeholder="MediaTitle"
              />
            </Form.Item>

            <Form.Item>
            <label >MediaPoster</label>
              <Input
                value={mediaPoster}
                onChange={(e) => setMediaPoster(e.target.value)}
                placeholder="MediaPoster"
              />
            </Form.Item>

            <Form.Item>
              <label >MediaRate</label>
              <Input
                value={mediaRate}
                onChange={(e) => setMediaRate(e.target.value)}
                placeholder="MediaRate"
              />
            </Form.Item>
          </Form>
        </Modal>
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
          { title: "CreatedAt",  dataIndex: "createdAt", key: "createdAt", },
          // { title: "UpdatedAt", dataIndex: "updatedAt", key: "updatedAt", },
          { title: "Delete", dataIndex: "Delete", key: "delete",
            render: (text, record) => (
              <Space size="middle">
                <Popconfirm
                  title="Are you sure you want to delete?"
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
          pageSize: 5
        }}
      />
      </Space>
    </div>
  )
}

export default Films;



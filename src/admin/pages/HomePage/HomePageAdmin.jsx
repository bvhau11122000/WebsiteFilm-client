import React, { useEffect, useState } from "react";
import { Card, Space, Statistic, Table } from "antd";
import {UserOutlined, HeartOutlined, VideoCameraOutlined, FormOutlined,} from "@ant-design/icons";

import favoriteApi from '../../../api/moudules/favorite.api';
import userApi from '../../../api/moudules/user.api.js';
import reviewApi from '../../../api/moudules/review.api';
import { getChart, } from "../../../api/index";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./HomePage.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip,  Legend);

const HomePageAdmin = () => {
 
  const [users, setUsers] = useState(0);
  const [favorite, setFavorites] = useState(0);
  const [reviews, setReviews] = useState([]);
  
// lấy data user
  useEffect(() => {
    const fetchUsers = async () => {
      const { response } = await userApi.getAll();
      if (response) {
        setUsers(response.length);
      } 
    };
    fetchUsers();
  }, []);

   //lấy date từ server
   useEffect(() => {
    const fetchUsers = async () => {
      const { response } = await favoriteApi.getAll();
      if (response) {
        setFavorites(response.length);
      } 
    };
    fetchUsers();
  }, []);

  //lấy data review
  useEffect(() => {
    const fetchUsers = async () => {
      const { response } = await reviewApi.getAll();
      if (response) {
        setReviews(response.length);
      } 
    };
    fetchUsers();
  }, []);

  return (
    <div className="HomePage">
      <Space size={12} direction="vertical">
        <Space direction="horizontal">
          <HomeCard
            icon={<UserOutlined className="icon-all icon-UserOutlined" />}
            title={"User"}
            value={users}
          >
          </HomeCard>

          <HomeCard
            icon={<HeartOutlined  className="icon-all icon-HeartOutlined " />}
            title={"Favorites"}
            value={favorite}
          > 
          </HomeCard>

          <HomeCard
            icon={<FormOutlined className="icon-all icon-FormOutlined" />}
            title={"Reviews"}
            value={reviews}
          >
          </HomeCard>

          <HomeCard
            icon={<VideoCameraOutlined className="icon-all icon-VideoCameraOutlined " />}
            title={"Films"} 
          >
          </HomeCard>

        </Space>
        <Space>
          <Inf />
          <Chart />
        </Space>
      </Space>
    </div>
  );
};

// hiển thị thông số 
function HomeCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

//bản hiển thị data
function Inf() {
  const [favorite, setFavorites] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

   //lấy data user
  useEffect(() => {
    const fetchUsers = async () => {
      const { response } = await userApi.getAll();
      if (response) {
        setUsers(response);
      } 
    };
    fetchUsers();
  }, []);

  //lấy data favorite
  useEffect(() => {
    const fetchFavorites = async () => {
      const { response } = await favoriteApi.getAll();
      if (response) {
        setFavorites(response);
      } 
    };
    fetchFavorites();
  }, []);

  //lấy data review
  useEffect(() => {
    const fetchUsers = async () => {
      const { response } = await reviewApi.getAll();
      if (response) {
        setReviews(response);
      } 
    };
    fetchUsers();
  }, []);

  const data = users.map((user) => {
    const userFavorites = favorite.filter((item) => item.user === user.id); 
    const userReviews = reviews.filter((item) => item.user === user.id); 
  
    return {
      key: user.id,
      username: user.username,
      mediaTitle: userFavorites.map((favorite) => favorite.mediaTitle).join(", "),
      content:  userReviews.map((reviews) => reviews.content).join(", "),
    }; 
  });

  const columns = [   
    { title: "Users", dataIndex: "username" }, 
    { title: "Favorites", dataIndex: "mediaTitle" },    
    { title: "Reviews", dataIndex: "content" },    
    { title: "Films", dataIndex: "" },    
    { title: "Views", dataIndex: "" },  
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      pagination={{
        pageSize: 3
      }}
    />  
  );
}

// hiển thi sơ đồ 
function Chart() {
  const [reve, setReve] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getChart().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: "rgba(153, 50, 204, 0.5)",
          },
        ],
      };
      setReve(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Statistical",
      },
    },
  };

  return (
    <div>
    <Card style={{ width: 400, height: 250 }}>
      <Bar options={options} data={reve} />
    </Card>
    </div>
  );
}

export default HomePageAdmin;

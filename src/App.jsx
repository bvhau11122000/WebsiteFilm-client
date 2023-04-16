import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AuthModal from "./components/common/AuthModal";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";
import AdminLayout from "./admin/layout/AdminMainLayout";
import HomePageAdmin from "./admin/pages/HomePage/HomePageAdmin";
// import PersonelPage from "./admin/pages/PersonelRecord/PersonelPage";
// import UserProfile from "./admin/pages/UserProfile/UserProfile";
import User from "./admin/components/dataAdmin/User";
import Favorites from "./admin/components/dataAdmin/Favorites";
import Reviews from "./admin/components/dataAdmin/Reviews";
import Films from "./admin/components/dataAdmin/Films";
import Views from "./admin/components/dataAdmin/Views";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    
    <>
    <AuthModal />
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* mui reset css */}
      <CssBaseline />
      
      {/* app routes */}
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<MainLayout />}>
            
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : 
              (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              )
            ))}
          </Route> 
          <Route element={<AdminLayout/>}>
              <Route path="/admin/*" element={<h1>PAGE NOT FOUND</h1>}/>
              <Route path="/admin" element={<HomePageAdmin/>}/>
              <Route path="/admin/User" element={<User/>}/>
              <Route path="/admin/Favorites" element={<Favorites/>}/>
              <Route path="/admin/Reviews" element={<Reviews/>}/>
              <Route path="/admin/Film" element={<Films/>}/>
              <Route path="/admin/Views" element={<Views/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* app routes */}
    </ThemeProvider>
     </>

  );
};

export default App;



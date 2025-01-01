import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const { Header, Sider, Content } = Layout;

const HomeTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dataString: any = localStorage.getItem("userInfo");
  const data = JSON.parse(dataString);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(pathDefault.signin);
  };
  // useEffect(() => {
  //   if (!data) {
  //     window.location.href = pathDefault.signin;
  //   }
  // }, []);

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <NavLink
                  className={({ isActive }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.createtask}
                >
                  <span>Create project</span>
                </NavLink>
              ),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: (
                <NavLink
                  className={({ isActive }) => {
                    return `px-3 rounded-md inline-block ${
                      isActive ? "item-active" : ""
                    }`;
                  }}
                  to={pathDefault.createproject}
                >
                  <span>Create task</span>
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className=" mr-4">
            {data ? (
              <UserOutlined className="border-2 p-3 rounded-full cursor-pointer hover:shadow-xl" />
            ) : (
              <Button onClick={() => handleLogin()}>Login</Button>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeTemplate;

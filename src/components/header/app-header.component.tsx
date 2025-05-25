import {Layout, Space, Typography } from "antd";
import { Link } from "@refinedev/core";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          background: "#2f54eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          <Link to="/" style={{ color: "#fff" }}>
            VoterSmart
          </Link>
        </Title>
        <div>
          <Space size="large">
            <Link to="/" style={{ color: "#fff", fontSize: "18px" }}>
              Home
            </Link>
            <Link to="/elections" style={{ color: "#fff", fontSize: "18px" }}>
              Elections
            </Link>
            <Link to="/votes" style={{ color: "#fff", fontSize: "18px" }}>
              Results
            </Link>
            <Link to="/login" style={{ color: "#fff", fontSize: "18px" }}>
              Sign In
            </Link>
          </Space>
        </div>
      </Header>
    </>
  );
};

export default AppHeader;

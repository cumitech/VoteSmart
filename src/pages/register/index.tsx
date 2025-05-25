import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Layout,
  Select,
  Typography,
} from "antd";
import { useCreate, useList } from "@refinedev/core";
import AppHeader from "../../components/header/app-header.component";
import AppFooter from "../../components/header/app-footer.component";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const { Content } = Layout;

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { data, isLoading: isLoadingFaculties } = useList({
    resource: "faculties", // Change to your actual resource name
    pagination: { pageSize: 100 }, // Optional: control how many items you want
  });

  const options =
    data?.data.map((item) => ({
      label: item.name, // or item.fullName, etc.
      value: item.id, // usually the unique identifier
    })) || [];
  const { mutate: register, isLoading } = useCreate({
    resource: "users",
    meta: {
      redirect: true,
      notification: {
        type: "success",
        message: "Registration successful",
      },
    },
  });

  const onFinish = async (values: any) => {
    const { matricule, password, faculty_id, name } = values;
    register(
      {
        resource: "users",
        values: { name, faculty_id, matricule, password, role: "voter" },
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  };

  return (
    <>
      <Layout>
        <AppHeader />

        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff",
              padding: "3rem 0",
            }}
          >
            <Card
              title={
                <Title
                  level={3}
                  style={{ textAlign: "center", marginBottom: 0 }}
                >
                  Registration
                </Title>
              }
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              styles={{ header: { borderBottom: "none", padding: 0 } }}
            >
              <Form
                name="login_form"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item
                  label="Faculty"
                  name="faculty_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select your faculty",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    loading={isLoadingFaculties}
                    placeholder="Select a voter"
                    options={options}
                    style={{ width: "100%" }}
                    optionFilterProp="label"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name number",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="e.g., U1234567"
                    size="large"
                    disabled={isLoading}
                  />
                </Form.Item>
                <Form.Item
                  label="Matricule"
                  name="matricule"
                  rules={[
                    {
                      required: true,
                      message: "Please input your matricule number",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="e.g., U1234567"
                    size="large"
                    disabled={isLoading}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                    disabled={isLoading}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={isLoading}
                    disabled={isLoading}
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                  >
                    Register
                  </Button>
                </Form.Item>

                <Divider />
                <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                  Already have an account?{" "}
                  <a href="/login" style={{ color: "#1890ff" }}>
                    Login
                  </a>
                </Text>
              </Form>
            </Card>
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
};

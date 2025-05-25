import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, Layout, Typography } from "antd";
import { useLogin } from "@refinedev/core";
import AppHeader from "../../components/header/app-header.component";
import AppFooter from "../../components/header/app-footer.component";

const { Title, Text } = Typography;
const { Content } = Layout;

export const LoginPage = () => {
  const { mutate: login, isLoading } = useLogin<{
    matricule: string;
    password: string;
  }>();

  const onFinish = async (values: any) => {
    const { matricule, password } = values;
    login({
      matricule,
      password,
    });
  };

  return (
    <>
      <Layout>
        <AppHeader />

        <Content>
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff",
            }}
          >
            <Card
              title={
                <Title
                  level={3}
                  style={{ textAlign: "center", marginBottom: 0 }}
                >
                  Voter Login
                </Title>
              }
              style={{
                width: 360,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              styles={{ header: { borderBottom: "none" } }}
            >
              <Form
                name="login_form"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
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
                    Login
                  </Button>
                  <Divider />
                  <Text type="secondary" style={{ textAlign: "center" }}>
                    Don't have an account? <a href="/register">Register here</a>
                  </Text>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
};

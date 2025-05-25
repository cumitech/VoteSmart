import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  Layout,
  Row,
  Spin,
  Statistic,
  Typography,
} from "antd";
import {
  CheckCircleOutlined,
  LockOutlined,
  UserAddOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import AppHeader from "../../components/header/app-header.component";
import AppFooter from "../../components/header/app-footer.component";
import { useList } from "@refinedev/core";
import CandidateVotesChart from "../../components/charts/CandidateVotesChart";
import VoterTurnoutChart from "../../components/charts/VotesTurnout";
import ElectionStatusChart from "../../components/charts/ElectionStatus";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const {
    data: electionsData,
    isLoading: electionLoading,
    isFetching: electionFetching,
  } = useList({
    resource: "elections",
  });

  const {
    data: usersData,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useList({
    resource: "users",
  });

  const {
    data: candidatesData,
    isLoading: candidateLoading,
    isFetching: candidateFetching,
  } = useList({
    resource: "candidates",
  });

  const {
    data: votesData,
    isLoading: voteLoading,
    isFetching: voteFetching,
  } = useList({
    resource: "votes",
  });

  if (
    electionLoading ||
    electionFetching ||
    userLoading ||
    userFetching ||
    candidateLoading ||
    candidateFetching ||
    voteLoading ||
    voteFetching
  ) {
    return (
      <div style={{ minHeight: "75vh", padding: "2rem" }}>
        <Spin size="large" fullscreen spinning={true} tip="Loading..." />
      </div>
    );
  }

  const electionDataItems: any[] = electionsData?.data || [];
  const userDataItems: any[] = usersData?.data || [];
  const candidateDataItems: any[] = candidatesData?.data || [];
  const voteDataItems: any[] = votesData?.data || [];

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "6rem 3rem", background: "#fff" }}>
        <Row
          gutter={[32, 32]}
          align="middle"
          justify={"center"}
          style={{ paddingBottom: "5rem" }}
        >
          <Col xs={24} md={12} lg={10}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Title>Secure & Transparent Student Elections</Title>
              {/* <Title level={5}>Your Voice Matters</Title> */}
              <Paragraph>
                VoterSmart is the trusted online electoral system for the
                University of Bamenda. Ensure a secure, one-person-one-vote
                election with real-time results.
              </Paragraph>
              <Button
                type="primary"
                href="/votes"
                size="large"
                style={{ marginTop: "1rem" }}
              >
                Vote Now
              </Button>
            </motion.div>
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Card style={{ padding: 0 }} styles={{ body: { padding: 0 } }}>
              <Image
                preview={false}
                src="/istockphoto-1277965612-612x612.jpg"
                alt="Voting Illustration"
                style={{ width: "100%", borderRadius: 5 }}
                loading="lazy"
              />
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: "5rem" }}>
          <Title level={2} style={{ textAlign: "center" }}>
            Why Choose VoterSmart?
          </Title>
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: "2rem" }}>
            <Col xs={24} md={6}>
              <Card variant="borderless" hoverable>
                <CheckCircleOutlined
                  style={{ fontSize: "2rem", color: "#1890ff" }}
                />
                <Title level={4}>One Student, One Vote</Title>
                <Paragraph>
                  Guaranteed unique vote per student using secure matricule
                  verification.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card variant="borderless" hoverable>
                <LockOutlined style={{ fontSize: "2rem", color: "#1890ff" }} />
                <Title level={4}>Confidential & Secure</Title>
                <Paragraph>
                  Votes are kept private and encrypted for full confidentiality.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card variant="borderless" hoverable>
                <BarChartOutlined
                  style={{ fontSize: "2rem", color: "#1890ff" }}
                />
                <Title level={4}>Live Results</Title>
                <Paragraph>
                  Track vote counts in real-time after elections close.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card variant="borderless" hoverable>
                <UserAddOutlined
                  style={{ fontSize: "2rem", color: "#1890ff" }}
                />
                <Title level={4}>Role-Based Access</Title>
                <Paragraph>
                  Admin, voter, and candidate roles are clearly separated and
                  protected.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div
          style={{ padding: "6rem 1rem", maxWidth: "1200px", margin: "0 auto" }}
        >
          <Row gutter={[24, 24]} justify="space-around">
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Active Elections"
                value={electionDataItems.length || 0}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Total Voters"
                value={userDataItems.length || 0}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Candidates"
                value={candidateDataItems.length || 0}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic title="Votes Cast" value={voteDataItems.length || 0} />
            </Col>
          </Row>
        </div>

        {/* Election Charts */}
        <Row align={"middle"} justify={"center"} gutter={[32, 32]}>
          <Col xs={24} md={12} lg={10}>
            <CandidateVotesChart candidates={candidateDataItems} />
          </Col>
          <Col xs={24} md={12} lg={10}>
            <ElectionStatusChart elections={electionDataItems} />
          </Col>
        </Row>
        {/* <VoterTurnoutChart /> */}
        {/* active elections */}
        {/* <ActiveElection /> */}
      </Content>
      <AppFooter />
    </Layout>
  );
}

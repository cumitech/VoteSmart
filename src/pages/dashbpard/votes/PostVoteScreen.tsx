import { Card, Result, Button, Typography, Row, Col, Spin } from "antd";
import { CheckCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { useList, useOne } from "@refinedev/core";
import { useAuthProvider } from "../../../providers/auth-provider/authProvider";

const { Text } = Typography;

const PostVoteScreen = () => {
  const { user } = getData();
  const {
    data: voteData,
    isLoading: voteLoading,
    isFetching: voteFetching,
  } = useOne<any>({
    resource: "votes/user",
    id: user.id,
    queryOptions: {
      retry: false,
    },
  });

  const voteDataItem: any = voteData?.data || null;

  const {
    data: electionsData,
    isLoading: electionLoading,
    isFetching: electionFetching,
  } = useList<any>({
    resource: "elections",
  });

  const electionDataItems: any[] = electionsData?.data || [];

  if (voteLoading || voteFetching || electionLoading || electionFetching) {
    return (
      <div style={{ minHeight: "75vh", padding: "2rem" }}>
        <Spin size="large" fullscreen spinning={true} tip="Loading..." />
      </div>
    );
  }

   // ✅ If user hasn't voted, show CTA
   if (!voteDataItem) {
    return (
      <Row align={"middle"} justify={"center"} style={{ padding: "2rem" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card style={{ marginTop: 40 }}>
            <Result
              icon={<CheckCircleOutlined />}
              status="info"
              title="You haven't voted yet"
              subTitle="Make your voice heard by casting your vote."
              extra={
                <Button type="primary" href="/cast-your-vote">
                  Vote Now
                </Button>
              }
            />
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Text type="secondary">
                Voting is quick, confidential, and important. Don’t miss the opportunity!
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }

  const electionItem = electionDataItems.find(
    (elect: any) => elect.id === voteDataItem.election_id
  );
  const candidateItem = electionItem?.candidates.find(
    (candidate: any) => candidate.id === voteDataItem.candidate_id
  );
  return (
    <Row align={"middle"} justify={"center"} style={{ padding: "2rem" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card style={{ margin: "auto", marginTop: 40 }}>
          <Result
            icon={<SmileOutlined />}
            status="success"
            title="Thank you for voting!"
            subTitle="Your vote has been recorded successfully."
            extra={[
              <Text key="election" strong>
                🗳️ Election: {electionItem?.title}
              </Text>,
              <Text key="candidate" style={{ display: "block", marginTop: 8 }}>
                👤 Candidate: <strong>{candidateItem?.name}</strong>
              </Text>,
            ]}
          />
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Text type="secondary">
              Your vote is confidential and cannot be changed.
            </Text>
            <br />
            <Button type="primary" style={{ marginTop: 16 }} href="/dashboard">
              Back to Home
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

function getData() {
  const { authProvider } = useAuthProvider();
  const user = fetchUserIdentity(authProvider);
  return {
    user,
  };
}
function fetchUserIdentity(authProvider: any) {
  if (authProvider && typeof authProvider.getIdentity === "function") {
    try {
      const userIdentity = authProvider.getIdentity();
      if (userIdentity) {
        return userIdentity;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  } else {
    return null;
  }
}

export default PostVoteScreen;

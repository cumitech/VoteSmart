import {
  Card,
  Typography,
  List,
  Button,
  Divider,
  Spin,
  Image,
  Alert,
} from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  NumberOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useList, useOne } from "@refinedev/core";
import { useAuthProvider } from "../../providers/auth-provider/authProvider";
import { UPLOADS_URL } from "../../constant/api-url";

const { Title, Text } = Typography;

export default function VotingDashboard() {
  const { user } = getData();

  const { data, isLoading, isFetching } = useList({
    resource: "elections",
    pagination: {
      pageSize: 10,
    },
  });
  const {
    data: facultyData,
    isLoading: facultyLoading,
    isFetching: facultyFetching,
  } = useOne<any>({
    resource: "faculties",
    id: user.faculty_id,
  });

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

  if (
    isLoading ||
    isFetching ||
    facultyLoading ||
    facultyFetching ||
    voteLoading ||
    voteFetching
  ) {
    return (
      <div style={{ minHeight: "75vh", padding: "2rem" }}>
        <Spin size="large" fullscreen spinning={true} tip="Loading..." />
      </div>
    );
  }

  const electionsData: any[] = data?.data || [];
  const facultyDataItem: any = facultyData?.data || null;
  const voteDataItem: any = voteData?.data || null;

  const electionItem = electionsData.find(
    (elect: any) => elect.id === voteDataItem?.election_id
  );
  const candidates = electionItem?.candidates;

  const userElectionsData = electionsData.filter(
    (elect) => elect.faculty.id === user.faculty_id
  );

  const userHasVoted = !!voteDataItem;

  return (
    <>
      <div
        style={{
          maxWidth: 900,
          marginTop: 20,
          marginBottom: 10,
          margin: "0 auto",
        }}
      >
        {userHasVoted ? (
          <Alert
            message="You have already voted."
            description={`Election: ${electionItem?.title || "N/A"}`}
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
          />
        ) : (
          <Alert
            message="You haven't voted yet."
            description="Please cast your vote below."
            type="warning"
            showIcon
            icon={<ExclamationCircleOutlined />}
          />
        )}
      </div>
      <Card
        style={{ maxWidth: 900, margin: "40px auto", padding: 0 }}
        title={
          <Title level={3} style={{ marginBottom: 0 }}>
            <TeamOutlined /> Faculty Dashboard
          </Title>
        }
      >
        <Text strong>👨‍🎓 Faculty:</Text> <Text>{facultyDataItem.name}</Text>
        <Divider orientation="left" orientationMargin="0">
          🗳️ Upcoming Elections
        </Divider>
        <List
          itemLayout="horizontal"
          dataSource={userElectionsData}
          renderItem={(election: any) => {
            const alreadyVotedThisElection =
              voteDataItem?.election_id === election.id;
            return (
              <List.Item
                key={`election-${election.id}`}
                actions={[
                  !userHasVoted ? (
                    <Button
                      type="primary"
                      icon={<NumberOutlined />}
                      key={`vote-${election.id}`}
                      href="/cast-your-vote"
                    >
                      Vote Now
                    </Button>
                  ) : alreadyVotedThisElection ? (
                    <Button type="default" disabled>
                      Already Voted
                    </Button>
                  ) : null,
                ]}
              >
                <List.Item.Meta
                  title={election.title}
                  description={`${election.description} - ${election.start_time} to ${election.end_time}`}
                />
              </List.Item>
            );
          }}
        />
        <Divider orientation="left" orientationMargin="0">
          👤 Candidates
        </Divider>
        <List
          itemLayout="horizontal"
          dataSource={candidates}
          renderItem={(candidate: any) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  href={`/dashboard/candidates/show/${candidate.id}`}
                  key={candidate.id}
                >
                  View Profile
                </Button>,
              ]}
              key={`candidate-${candidate.id}`}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    src={`${UPLOADS_URL}/${candidate.avatar}`}
                    style={{
                      borderRadius: 30,
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                    }}
                    preview={false}
                  />
                }
                title={candidate.name}
                description={`${candidate.position} Candidate`}
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}

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

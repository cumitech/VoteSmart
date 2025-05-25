import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Select,
  Button,
  Typography,
  message,
  Spin,
  Avatar,
} from "antd";
import { MdOutlineHowToVote } from "react-icons/md";
import { useGetIdentity, useList } from "@refinedev/core";
import { UPLOADS_URL } from "../../../constant/api-url";
import { voteService } from "../../../services/vote.service";
import { useNavigate } from "react-router";
import { Election } from "../../../model";

const { Title, Text } = Typography;

const VotersPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useList({
    resource: "elections",
    pagination: {
      pageSize: 10,
    },
  });

  const { data: userData } = useGetIdentity<any>({});
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElectionId, setSelectedElectionId] = useState<number | null>(
    null
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  );

  const electionsData: any[] = data?.data || [];

  useEffect(() => {
    if (electionsData.length) {
      setElections([...electionsData]);
    }
  }, [electionsData]);

  const castVote = async () => {
    if (!selectedCandidateId || !selectedElectionId)
      return message.error(
        `Please select ${!selectedCandidateId ? "a candidate" : "an election"}!`
      );

    const response = await voteService.create({
      election_id: selectedElectionId,
      candidate_id: selectedCandidateId,
      voter_id: userData.id,
    });

    if (response.success) {
      message.success("Vote submitted successfully!");
      navigate("/your-vote", {
        state: {
          electionLabel: elections.find(
            (elect) => elect.id === selectedElectionId
          )?.title,
          candidateName: elections
            .find((elect) => elect.id === selectedElectionId)
            ?.candidates.find(
              (candidate) => candidate.id === selectedCandidateId
            )?.name,
        },
      });
    } else {
      message.error("Vote not counted!");
    }
  };

  if (isLoading || isFetching) {
    return (
      <div style={{ minHeight: "75vh", padding: "2rem" }}>
        <Spin size="large" fullscreen spinning={true} tip="Loading..." />
      </div>
    );
  }

  const currentElection = elections.find(
    (elect) => elect.id === selectedElectionId
  );
  return (
    <>
      <Row align={"middle"} justify={"center"} style={{ padding: "2rem" }}>
        <Col xs={24} sm={20}>
          <Card
            title={
              <Title level={2} style={{ marginBottom: 0 }}>
                Cast Your Vote
              </Title>
            }
          >
            <Select
              placeholder="Select an Election"
              style={{ width: "100%", marginBottom: 20 }}
              onChange={(setElectionId) => {
                setSelectedElectionId(setElectionId);
                setSelectedCandidateId(null);
              }}
              value={selectedElectionId}
              size="large"
            >
              {elections.map((election) => (
                <Select.Option key={election.id} value={election.id}>
                  {election.title}
                </Select.Option>
              ))}
            </Select>

            {currentElection && (
              <>
                <Title level={4}>{currentElection.title}</Title>
                <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
                  {currentElection.candidates.map((candidate) => (
                    <Col xs={24} sm={12} md={6} lg={5} key={candidate.id}>
                      <Card
                        hoverable
                        title={"Vote for"}
                        variant="borderless"
                        onClick={() => setSelectedCandidateId(candidate.id)}
                        style={{
                          border:
                            selectedCandidateId === candidate.id
                              ? "2px solid #1890ff"
                              : undefined,
                          textAlign: "center",
                        }}
                        styles={{
                          header: {
                            padding: 0,
                          },
                          body: {
                            padding: "1rem 0",
                          },
                        }}
                      >
                        <Avatar
                          size={100}
                          src={`${UPLOADS_URL}/${candidate.avatar}`}
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <Text
                          strong
                          style={{ display: "block", fontSize: "1rem" }}
                        >
                          {candidate.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                          {candidate.position}
                        </Text>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Button
                  type="primary"
                  icon={<MdOutlineHowToVote />}
                  style={{ marginTop: "2rem" }}
                  disabled={!selectedCandidateId}
                  onClick={castVote}
                  size="large"
                >
                  Submit Vote
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VotersPage;

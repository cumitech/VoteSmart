import React from "react";
import { Divider, Avatar, Typography, Row, Col, Card, Progress, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { UPLOADS_URL } from "../constant/api-url";

const { Title, Text, Paragraph } = Typography;


const ActiveElection = () => {
  const { data, isLoading, isFetching } = useList({
    resource: "elections",
    pagination: {
      pageSize: 10,
    },
  });

  if (isLoading || isFetching) {
    return (
      <div style={{ minHeight: "75vh", padding: "2rem" }}>
        <Spin size="large" fullscreen spinning={true} tip="Loading..." />
      </div>
    );
  }

  
  const electionsData: any[] = data?.data || [];


  return (
    <>
      <div style={{ padding: "2rem" }}>
        {/* <Title level={4} style={{ textAlign: "center" }}>
          Current Active Elections
        </Title> */}

        {electionsData.map((election) => (
          <Row
            key={election.id}
            gutter={[16, 16]}
            style={{ marginTop: "2rem" }}
            align={"middle"}
            justify={"center"}
          >
            <Col span={24}>
              <Title level={3} style={{ textAlign: "center" }}>
                {election.title}
              </Title>
            </Col>
            {election.candidates.map((candidate: any) => {
             const totalVotes = candidate.vote_count;

              return (
                <Col xs={24} sm={12} md={6} lg={4} key={candidate.id}>
                  <Card
                    type="inner"
                    hoverable
                    style={{
                      textAlign: "center",
                      borderRadius: "10px",
                      padding: 0,
                      height: "100%",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    title={"Vote for"}
                  >
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      src={`${UPLOADS_URL}/${candidate.avatar}`}
                      style={{ marginBottom: "0.5rem" }}
                    />
                    <Text strong style={{ display: "block", fontSize: "1rem" }}>
                      {candidate.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                      {candidate.position}
                    </Text>
                    <Divider style={{ margin: "0.75rem 0" }} />
                    <Text>
                      Votes: <Text strong>{totalVotes}</Text>
                    </Text>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
    </>
  );
};

export default ActiveElection;

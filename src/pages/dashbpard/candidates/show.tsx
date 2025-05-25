import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Col, Descriptions, Image, Row, Typography } from "antd";
import { UPLOADS_URL } from "../../../constant/api-url";

export const CandidateShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Row align={"middle"} justify="center">
      <Col xs={24} md={12} lg={18}>
        <Show isLoading={isLoading}>
          <Descriptions
            bordered
            column={2} // one item per row for better readability; adjust as needed
            size="middle"
            title="Candidate Details"
          >
            <Descriptions.Item label="ID">{record?.id}</Descriptions.Item>
            <Descriptions.Item label="Title">{record?.title}</Descriptions.Item>
            <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
            <Descriptions.Item label="Year Enrolled">
              {record?.year_enrolled}
            </Descriptions.Item>
            <Descriptions.Item label="Graduation Year">
              {record?.graduation_year}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Election ID">
          {record?.election_id}
        </Descriptions.Item> */}
            <Descriptions.Item label="Position">
              {record?.position}
            </Descriptions.Item>
            <Descriptions.Item label="Avatar">
              {record?.avatar ? (
                <Image
                  src={`${UPLOADS_URL}/${record.avatar}`}
                  alt="avatar"
                  width={150}
                  height={150}
                  style={{ objectFit: "cover" }}
                  preview={false}
                />
              ) : (
                "No avatar available"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Manifesto">
              {record?.manifesto}
            </Descriptions.Item>
          </Descriptions>
        </Show>
      </Col>
    </Row>
  );
};

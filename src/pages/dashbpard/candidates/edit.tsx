import { Edit, useForm } from "@refinedev/antd";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Election } from "../../../model";
import { useState } from "react";

export const CandidateEdit = () => {
  const { formProps, saveButtonProps } = useForm({});
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElectionId, setSelectedElectionId] = useState<number | null>(
    null
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  );
  return (
    <Row align={"middle"} justify="center">
      <Col xs={24} md={12} lg={18}>
        <Edit saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={"Name"}
                  name={["name"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={"Title"}
                  name={["title"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={"Manifesto"}
              name={["manifesto"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={"Select Candidate"}
                  name={["user_id"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Candidate"
                    style={{ width: "100%", marginBottom: 20 }}
                    onChange={(setCandidateId) => {
                      setSelectedCandidateId(setCandidateId);
                    }}
                    value={selectedCandidateId}
                    size="large"
                  >
                    {elections.map((election) => (
                      <Select.Option key={election.id} value={election.id}>
                        {election.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={"Select Election"}
                  name={["election_id"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select an Election"
                    style={{ width: "100%", marginBottom: 20 }}
                    onChange={(setElectionId) => {
                      setSelectedElectionId(setElectionId);
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
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={"Position"}
                  name={["position"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={"Year Enrolled"}
                  name={["year_enrolled"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={"Graduation Year"}
                  name={["graduation_year"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Edit>
      </Col>
    </Row>
  );
};

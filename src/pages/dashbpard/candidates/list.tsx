import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table } from "antd";
import { UPLOADS_URL } from "../../../constant/api-url";
import { BaseRecord } from "@refinedev/core";

export const CandidateList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="position" title="Position" />
        <Table.Column
          dataIndex="avatar"
          title="Avatar"
          render={(value) =>
            value ? (
              <img
                src={`${UPLOADS_URL}/${value}`}
                alt="avatar"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            ) : (
              "No avatar"
            )
          }
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="year_enrolled"
          title="Year Enrolled"
          render={(value) => new Date(value).getFullYear()}
        />
        <Table.Column
          dataIndex="graduation_year"
          title="Graduation Year"
          render={(value) => new Date(value).getFullYear()}
        />
        {/* <Table.Column dataIndex="user_id" title="User ID" /> */}
        {/* <Table.Column dataIndex="election_id" title="Election ID" /> */}

        {/* <Table.Column dataIndex="manifesto" title="Manifesto" ellipsis={true} /> */}
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

import { Typography } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CandidateVotesChart({
  candidates,
}: {
  candidates: any[];
}) {
  const items = candidates.map((item) => ({
    name: item.name,
    vote_count: item.vote_count,
  }));
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        Total Votes Per Candidate
      </Typography.Title>
      <BarChart width={500} height={300} data={items}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0088FE" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="vote_count" label="Vote Count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

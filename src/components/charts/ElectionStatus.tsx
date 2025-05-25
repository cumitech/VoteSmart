import { Typography } from "antd";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

export default function ElectionStatusChart({
  elections,
}: {
  elections: any[];
}) {
  const isActiveElectionsCount = elections.filter((e) => e.is_active).length;
  const isDisabledElectionsCount = elections.filter((e) => !e.is_active).length;
  const items = elections.map((item) => ({
    status: item.is_active ? "Active" : "Disabled",
    count: item.is_active ? isActiveElectionsCount : isDisabledElectionsCount,
  }));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography.Title level={4} style={{ textAlign: "center" }}>
        Active vs Inactive Elections
      </Typography.Title>
      <PieChart width={400} height={300}>
        <Pie
          data={items}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {items.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
  { faculty: "Engineering", voters: 150 },
  { faculty: "Law", voters: 75 },
  { faculty: "Arts", voters: 100 }
];

export default function VoterTurnoutChart() {
  return (
    <PieChart width={400} height={300}>
      <Pie
        dataKey="voters"
        nameKey="faculty"
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

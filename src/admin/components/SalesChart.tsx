import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const SalesChart = ({ data }: any) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey="day" />

        <Tooltip />

        <Bar
          dataKey="sales"
          radius={8}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
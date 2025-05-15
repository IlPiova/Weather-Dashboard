import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./lineChart.scss";

export default function LineChartComponent({ data }) {
  const filteredData = data ? data.slice(0, 24) : [];
  return (
    <>
      {filteredData && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5" />
              <XAxis
                dataKey="dt"
                minTickGap={20}
                tickFormatter={(tick) =>
                  new Date(tick * 1000).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              />
              <YAxis
                dataKey="temp"
                type="number"
                domain={["dataMin - 2", "dataMax + 2"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                dataKey="temp"
                type="monotone"
                stroke="#ffa31c"
                dot={{ r: 0 }}
                activeDot={{ r: 4 }}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  const formattedDate = new Date(label * 1000).toLocaleString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="tooltip-container">
      <p>{formattedDate}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }}>
          {entry.name}:{" "}
          {parseFloat(entry.value).toLocaleString("it-IT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </p>
      ))}
    </div>
  );
}

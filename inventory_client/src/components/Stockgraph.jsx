import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/Productcontext";
import api from "../api/axios";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const Stockgraph = () => {
  const { fetchProducts } = useContext(ProductContext);
  const [stats, setStats] = useState([]);
  const getStats = async () => {
    const results = await api.get("api/stock/stats");
    setStats(results.data.data);
  };

  useEffect(() => {
    fetchProducts();
    getStats();
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={stats}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            horizontal={false}
            vertical={false}
          />
          <XAxis tickLine={false} axisLine={false} dataKey="category" />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="quantity" radius={[4, 4, 0, 0]} barSize={8}>
            {stats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#064E3B" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

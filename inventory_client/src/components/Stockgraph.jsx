import { useContext, useEffect } from "react";
import { ProductContext } from "../context/Productcontext";
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
  const { products } = useContext(ProductContext);
  const stockStats = Object.values(
    products.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = {
          category: curr.category,
          quantity: curr.quantity,
        };
      } else {
        acc[curr.category].quantity += curr.quantity;
      }
      return acc;
    }, []),
  );

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={stockStats}
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
            {stockStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#064E3B" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

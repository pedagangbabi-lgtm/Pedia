  "use client";

  import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend
  } from "recharts";
  import { formatCurrency } from "@/app/lib/utils";

  // Warna tema BabiPedia
  const COLORS = ["#ec4899", "#f472b6", "#fb7185", "#fbcfe8", "#fecdd3"];

  /* ---------------------------
    WEEKLY SALES BAR CHART
  ----------------------------*/

export function WeeklySalesChart({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: 30, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f3f4f6"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(val: number): string => `${(val / 1000).toFixed(0)}K`}
          />

          <Tooltip
            cursor={{ fill: "#fdf2f8" }}
            formatter={(value: number) => [formatCurrency(value), "Penjualan"]}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />

          <Bar
            dataKey="revenue"
            fill="#ec4899"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


  /* ---------------------------
    TRANSACTION TREND LINE CHART
  ----------------------------*/
 export function TransactionTrendChart({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />

          {/* ⬇️ Y-Axis FIXED HERE */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            allowDecimals={false}
            tickFormatter={(value) => Number.isInteger(value) ? value : ""}
          />

          <Tooltip
            formatter={(value: number) => [value, "Transaksi"]}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />

          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 4, fill: "#ec4899", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function TopPelangganTable({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-pink-600">Performa Top 5 Pelanggan</h3>
        <p className="text-sm text-gray-500">Analisis pelanggan terbaik</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3">Ranking</th>
              <th>Nama Pelanggan</th>
              <th>Frekuensi Transaksi</th>
              <th>Total Belanja</th>
              <th>Rata-rata/Transaksi</th>
              <th>Kontribusi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any, index: number) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-pink-50/40 transition"
              >
                {/* Ranking */}
                <td className="py-4 font-semibold">
                  <span className="w-6 h-6 bg-pink-500 text-white rounded-full text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                </td>

                {/* Nama */}
                <td>{item.name}</td>

                {/* Frekuensi */}
                <td>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                    {item.frequency}x
                  </span>
                </td>

                {/* Total Belanja */}
                <td className="font-medium">{formatCurrency(item.total_spent)}</td>

                {/* Rata-rata */}
                <td>{formatCurrency(item.avg_transaction)}</td>

                {/* Kontribusi */}
                <td>
                  <span className="px-3 py-1 bg-pink-500 text-white text-xs rounded-full">
                    {item.contribution}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

  /* ---------------------------
    🚀 NEW: TOP MENU PIE CHART
  ----------------------------*/
  export function TopMenuPieChart({ data }: { data: { name: string; total: number }[] }) {
    // Hitung total keseluruhan untuk tooltip
    const totalAll = data.reduce((sum, item) => sum + item.total, 0);

    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ name, percent }) => {
                const p = ((percent ?? 0) * 100).toFixed(1);
                return `${name} (${p}%)`;
              }}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, _, item: any) => {
                const p = ((value / totalAll) * 100).toFixed(1);
                return [`${value}x dipesan (${p}%)`, item?.payload?.name];
              }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }



  export function TopPelanggan({ data }: { data: any[] }) {
    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              cursor={{ fill: "#fdf2f8" }}
              formatter={(value: number) => [formatCurrency(value), "Customers"]}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}

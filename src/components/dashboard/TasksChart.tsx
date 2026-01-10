import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { taskStatusData } from '@/data/dashboardData';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-white font-semibold">
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const TasksChart = () => {
  const total = taskStatusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 overflow-hidden"
    >
      {/* Glass shimmer overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Tasks Overview</h3>
        <p className="text-white/40 text-sm">Current task distribution</p>
      </div>

      {/* Chart */}
      <div className="relative z-10 h-[220px]">
        <ResponsiveContainer width="99%" height={220}>
          <PieChart>
            <Pie
              data={taskStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {taskStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{total}</p>
            <p className="text-white/40 text-sm">Total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="relative z-10 grid grid-cols-2 gap-3 mt-4">
        {taskStatusData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-white/60 text-sm">{item.name}</span>
            <span className="text-white font-medium text-sm ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

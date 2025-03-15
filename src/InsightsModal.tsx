import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface InsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* TODO: api call to retrieve this*/
const productivityData = [
  { name: "Focus Time", value: 5, color: "#6D72C3" },
  { name: "Breaks", value: 1, color: "#505168" },
];

const InsightsModal: React.FC<InsightsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold text-center">How Did You Go?</h2>
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          ✕
        </button>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Hours Worked This Week</h3>
          <p className="text-2xl font-bold text-blue-600 text-center">REPLACE THIS WITH USER DATA</p>
        </div>

        <div className="flex items-center justify-center my-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={productivityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {productivityData.map((data) => (
            <div key={data.name} className="p-4 bg-gray-50 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">{data.name}</span>
                <span className="text-sm font-semibold text-gray-600">{data.value} hrs</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(data.value / 8) * 100}%`, backgroundColor: data.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsModal;

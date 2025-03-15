import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface InsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalFocusTime: number;
}

const productivityData = [
  { name: "Focus Time", value: 5, color: "#6D72C3", message: "You spent 5 hours focusing." },
  { name: "Breaks", value: 1, color: "#505168", message: "You took 1 hour of breaks." },
];

const InsightsModal: React.FC<InsightsModalProps> = ({ isOpen, onClose, totalFocusTime }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const clickCount = useState(0);
  const wordsTyped = useState(0);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold text-center">How Did You Go?</h2>
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Productive Time</h3>
          <p className="text-2xl font-bold text-blue-600 text-center">{totalFocusTime}</p>
        </div>

        {/* Pie Chart Section */}
        <div className="flex items-center justify-center my-4 relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={productivityData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
                onMouseLeave={() => setTooltipContent(null)}
              >
                {productivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Tooltip with Words on Hover */}
          {tooltipContent && (
            <div className="absolute bottom-0 bg-gray-800 text-white p-2 rounded-lg text-sm">
              {tooltipContent}
            </div>
          )}
        </div>

        {/* Productivity Breakdown */}
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

        {/* Mouse Click Counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>Total Mouseclicks: {clickCount}</p>
          <p>Total Keystrokes: {wordsTyped}</p>
        </div>

        {/* Close Button */}
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import axios from "axios";

function InsightsList() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/insights/", {
          email: auth.currentUser.email,
        });
        setInsights(res.data);
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const handleRowClick = (insight) => {
    navigate(`/insights/${insight.id}`, { state: insight });
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (insights.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">No insights found.</div>
    );
  }

  return (
    <div className="py-28 px-6 max-w-6xl mx-auto min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🧾 Your Insight Reports
      </h1>
      <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-500">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">Battery Health</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((item, index) => {
              const batteryHealth = parseInt(item.battery_health);
              const status =
                batteryHealth >= 80
                  ? "Good"
                  : batteryHealth >= 60
                  ? "Moderate"
                  : "Poor";

              return (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="cursor-pointer hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.brand}</td>
                  <td className="px-6 py-4">{item.model}</td>
                  <td className="px-6 py-4">{item.battery_health}%</td>
                  <td className="px-6 py-4">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        status === "Good"
                          ? "bg-green-100 text-green-700"
                          : status === "Moderate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsightsList;

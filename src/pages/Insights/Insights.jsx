// src/pages/Insights/Insights.jsx
import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import logo from "../../assets/Predictive_Maintenance.png";
import {
  Download,
  Trash2,
  BatteryCharging,
  Smartphone,
  Wrench,
  Activity,
  Lightbulb,
  CalendarClock,
} from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { motion } from "framer-motion";

const SectionCard = ({ icon, title, children, color = "text-gray-800", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100 hover:shadow-xl transition-all"
  >
    <h2 className={`text-xl font-semibold flex items-center gap-2 ${color}`}>
      <span className="text-2xl">{icon}</span> {title}
    </h2>
    <div className="text-sm text-gray-600 space-y-2">{children}</div>
  </motion.div>
);

const Insights = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("insightData", JSON.stringify(location.state));
      setData(location.state);
    } else {
      const stored = localStorage.getItem("insightData");
      if (stored) setData(JSON.parse(stored));
    }
  }, [location.state]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-28 text-center space-y-6">
        <p className="text-2xl text-gray-600">No insights available. Please enter device data first.</p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/manual-input")}
        >
          Go to Manual Input
        </button>
      </div>
    );
  }

  const downloadPDF = () => {
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${data.brand}-insight-report.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(reportRef.current)
      .save();
  };

  const suggestions = () => {
    const s = [];
    if (data.batteryHealth < 80) s.push("Battery health is below 80%. Consider replacing it soon.");
    if (data.chargesOvernight === "yes") s.push("Avoid overnight charging to improve battery lifespan.");
    if (data.overheating) s.push("Device is overheating. Monitor background apps and heat.");
    if (data.previousRepairs?.length >= 3) s.push("Frequent repairs suggest instability. Consider upgrading.");
    if (data.storageUsage > 85 || data.ramUsage > 85) s.push("Heavy usage. Optimize apps or consider reset.");
    if (["frequent"].includes(data.dropHistory) || data.waterDamage === "yes") s.push("Possible internal damage detected.");
    if (data.sensorIssues || data.batteryBulging || data.buttonsNotWorking) s.push("Hardware irregularities present.");
    return s.length ? s : ["Device is in good shape. Keep performing routine checkups."];
  };

  const failureForecast = () => {
    const risk = [];
    if (data.age >= 24 || data.batteryHealth < 70 || data.batteryBulging) {
      risk.push("⚠️ 1–3 months: Battery or power system may fail.");
    }
    if (data.previousRepairs?.length >= 3 || data.dropHistory === "frequent" || data.waterDamage === "yes") {
      risk.push("⚠️ 3–6 months: Internal component risk (e.g. motherboard).");
    }
    if (data.storageUsage > 90 || data.ramUsage > 90) {
      risk.push("⚠️ 6–9 months: Performance drop likely due to high resource usage.");
    }
    return risk.length ? risk : ["✅ No critical failures expected in the next 6–12 months."];
  };

  const getDeviceStatus = () => {
    const critical = [
      data.batteryHealth < 50,
      data.storageUsage > 90,
      data.ramUsage > 90,
      data.overheating,
      data.dropHistory === "frequent",
      data.waterDamage === "yes",
      data.sensorIssues,
      data.batteryBulging,
      data.screenCracked,
      data.buttonsNotWorking,
    ];
    const attention = [data.batteryHealth < 70, data.storageUsage > 80, data.ramUsage > 80];
    return critical.some(Boolean) ? "Critical" : attention.some(Boolean) ? "Needs Attention" : "Good";
  };

  const status = getDeviceStatus();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12 pt-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          📊 Device Health Insights
        </h1>
        <div className="flex flex-wrap gap-4">
          <StatusBadge status={status} />
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => {
              localStorage.removeItem("insightData");
              navigate("/manual-input");
            }}
          >
            <Trash2 size={18} /> Clear Data
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={reportRef} className="space-y-10">
        <div className="flex justify-between items-center border-b pb-4">
          <img src={logo} alt="Logo" className="h-12" />
          <p className="text-sm text-gray-400">Generated by Predictive Maintenance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SectionCard icon={<Smartphone />} title="Device Information" delay={0}>
            <div className="grid grid-cols-2 gap-y-2">
              <p><strong>Brand:</strong> {data.brand}</p>
              <p><strong>Model:</strong> {data.model}</p>
              <p><strong>OS:</strong> {data.os}</p>
              <p><strong>Age:</strong> {data.deviceAge} months</p>
              <p><strong>RAM:</strong> {data.ramCapacity} GB</p>
              <p><strong>Storage:</strong> {data.storageCapacity} GB</p>
              <p><strong>Screen Time:</strong> {data.screenTime} hrs</p>
              <p><strong>Charging:</strong> {data.chargeFrequency}</p>
              <p><strong>Software:</strong> {data.updatedSoftware}</p>
            </div>
          </SectionCard>

          <SectionCard icon={<BatteryCharging />} title="Battery Health" delay={0.1}>
            <p><strong>Cycle Count:</strong> {data.batteryCycleCount}</p>
            <p><strong>Health:</strong> {data.batteryHealth}%</p>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full ${
                  data.batteryHealth >= 80 ? "bg-green-500" : data.batteryHealth >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${data.batteryHealth}%` }}
              />
            </div>
            <p><strong>Fast Charging:</strong> {data.fastCharging}</p>
            <p><strong>Overnight Charging:</strong> {data.chargesOvernight}</p>
          </SectionCard>

          <SectionCard icon={<Wrench />} title="Repair History" delay={0.2}>
            {data.previousRepairs?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {data.previousRepairs.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            ) : (
              <p>No major repairs reported.</p>
            )}
          </SectionCard>

          <SectionCard icon={<Activity />} title="Performance & Hardware Condition" delay={0.3}>
            <div className="space-y-3">
              <div>
                <p><strong>Storage Usage:</strong> {data.storageUsage}%</p>
                <div className="h-3 bg-gray-200 rounded-full mt-1">
                  <div
                    className={`h-full ${
                      data.storageUsage <= 70 ? "bg-green-500" : data.storageUsage <= 90 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${data.storageUsage}%` }}
                  />
                </div>
              </div>
              <div>
                <p><strong>RAM Usage:</strong> {data.ramUsage}%</p>
                <div className="h-3 bg-gray-200 rounded-full mt-1">
                  <div
                    className={`h-full ${
                      data.ramUsage <= 70 ? "bg-green-500" : data.ramUsage <= 90 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${data.ramUsage}%` }}
                  />
                </div>
              </div>
              <p><strong>Overheating:</strong> {data.overheating ? "Yes" : "No"}</p>
              <p><strong>Drop History:</strong> {data.dropHistory}</p>
              <p><strong>Water Damage:</strong> {data.waterDamage}</p>
              <p><strong>Sensor Issues:</strong> {data.sensorIssues ? "Yes" : "No"}</p>
            </div>
          </SectionCard>

          <SectionCard icon={<Lightbulb />} title="Maintenance Suggestions" color="text-green-700" delay={0.4}>
            <ul className="list-disc pl-5 space-y-1">
              {suggestions().map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </SectionCard>

          <SectionCard icon={<CalendarClock />} title="Predicted Failure Timeline" color="text-red-700" delay={0.5}>
            <ul className="list-disc pl-5 text-red-600 space-y-1">
              {failureForecast().map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </SectionCard>
        </div>

        <footer className="pt-6 mt-10 border-t text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Predictive Maintenance App. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Insights;

import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import logo from "../../assets/Predictive_Maintenance.png";
import StatusBadge from "../../components/StatusBadge";

ChartJS.register(ArcElement, Tooltip, Legend);

const Section = ({ icon, title, children }) => (
<motion.section
className="bg-white rounded-xl shadow-md p-6 border"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
viewport={{ once: true }}

>

    <h2 className="text-xl font-bold flex items-center gap-2 mb-3 text-blue-800">
      <span className="text-2xl">{icon}</span> {title}
    </h2>
    <div>{children}</div>

</motion.section>
);

const MiniChart = ({ label, value }) => {
const data = {
labels: [label, "Remaining"],
datasets: [
{
data: [value, 100 - value],
backgroundColor: [value >= 80 ? "#22c55e" : value >= 50 ? "#facc15" : "#ef4444", "#e5e7eb"],
borderWidth: 1,
},
],
};

return (
<div className="flex flex-col items-center">
<div className="w-24 h-24">
<Doughnut data={data} options={{ cutout: "70%" }} />
</div>
<p className="text-sm mt-2 text-gray-600">{label}: {value}%</p>
</div>
);
};

const Insights = () => {
const location = useLocation();
const navigate = useNavigate();
const reportRef = useRef();
const [data, setData] = useState(null);

useEffect(() => {
const fromState = location.state;
if (fromState) {
localStorage.setItem("insightData", JSON.stringify(fromState));
setData(fromState);
} else {
const stored = localStorage.getItem("insightData");
if (stored) setData(JSON.parse(stored));
}
}, [location.state]);

if (!data) {
return (
<div className="flex flex-col items-center justify-center text-center min-h-screen pt-28 px-4">
<p className="text-2xl text-gray-600">No data found. Please input device details first.</p>
<button
className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
onClick={() => navigate("/manual-input")} >
Go to Manual Input
</button>
</div>
);
}

const downloadPDF = () => {
html2pdf().set({
margin: 0.5,
filename: `${data.brand}-insight-report.pdf`,
image: { type: "jpeg", quality: 0.98 },
html2canvas: { scale: 2 },
jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
}).from(reportRef.current).save();
};

const getSuggestions = () => {
const s = [];
if (+data.batteryHealth < 80) s.push("Battery below 80%. Consider replacement.");
if (data.chargesOvernight === "yes") s.push("Avoid overnight charging.");
if (data.overheating) s.push("Overheating detected. Close background apps.");
if ((data.previousRepairs || []).length >= 3) s.push("Frequent repairs suggest wear. Consider upgrade.");
if (+data.storageUsage > 85 || +data.ramUsage > 85) s.push("High usage. Optimize apps or reset.");
if (data.dropHistory === "frequent" || data.waterDamage === "yes") s.push("Potential physical damage risks.");
if (data.sensorIssues || data.batteryBulging || data.buttonsNotWorking) s.push("Hardware issues detected.");
return s.length ? s : ["Your device is healthy. Keep monitoring periodically."];
};

const getDeviceStatus = () => {
const battery = +data.batteryHealth;
const ram = +data.ramUsage;
const storage = +data.storageUsage;
const { overheating, dropHistory, waterDamage, sensorIssues, batteryBulging, screenCracked, buttonsNotWorking } = data;

    const critical = [
      battery < 50, storage > 90, ram > 90,
      overheating, dropHistory === "frequent", waterDamage === "yes",
      sensorIssues, batteryBulging, screenCracked, buttonsNotWorking,
    ];

    const attention = [battery < 70, storage > 80, ram > 80];

    if (critical.some(Boolean)) return "Critical";
    if (attention.some(Boolean)) return "Needs Attention";
    return "Good";

};

return (
<div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-10">
<motion.div
className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }} >
<h1 className="text-4xl font-extrabold text-blue-900">📊 Device Health Insights</h1>
<div className="flex flex-wrap gap-3 items-center">
<StatusBadge status={getDeviceStatus()} />
<button onClick={() => { localStorage.removeItem("insightData"); navigate("/manual-input"); }}
className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition">
<Trash2 size={18} /> Clear Data
</button>
<button onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
<Download size={18} /> Download PDF
</button>
</div>
</motion.div>

      <div ref={reportRef} className="space-y-8">
        <motion.div className="flex justify-between items-center border-b pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src={logo} alt="Logo" className="h-10" />
          <p className="text-sm text-gray-400">Generated by Predictive Maintenance</p>
        </motion.div>

        {/* Device Info */}
        <Section icon="📱" title="Device Info">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
            <p><b>Brand:</b> {data.brand}</p>
            <p><b>Model:</b> {data.model}</p>
            <p><b>OS:</b> {data.os}</p>
            <p><b>Age:</b> {data.age} months</p>
            <p><b>RAM:</b> {data.totalRam} GB</p>
            <p><b>Storage:</b> {data.totalStorage} GB</p>
            <p><b>Screen Time/Day:</b> {data.screenTimeDaily} hrs</p>
            <p><b>Charging Frequency:</b> {data.chargingFrequency}</p>
            <p><b>Software Status:</b> {data.softwareStatus}</p>
          </div>
        </Section>

        {/* Charts Section */}
        <Section icon="📈" title="Usage Overview">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <MiniChart label="Battery" value={+data.batteryHealth} />
            <MiniChart label="RAM" value={+data.ramUsage} />
            <MiniChart label="Storage" value={+data.storageUsage} />
          </div>
        </Section>

        {/* Repair History */}
        <Section icon="🛠️" title="Repair History">
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {(data.previousRepairs || []).length > 0
              ? data.previousRepairs.map((item, i) => <li key={i}>{item}</li>)
              : <li>No previous repairs reported.</li>}
          </ul>
        </Section>

        {/* Suggestions */}
        <Section icon="💡" title="Maintenance Suggestions">
          <ul className="list-disc pl-5 text-sm text-green-800">
            {getSuggestions().map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </Section>

        {/* Footer */}
        <footer className="text-center pt-6 mt-6 text-sm text-gray-400 border-t">
          © {new Date().getFullYear()} Predictive Maintenance App
        </footer>
      </div>
    </div>

);
};

export default Insights;

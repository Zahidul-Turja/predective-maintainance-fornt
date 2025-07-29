import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const statusStyles = {
  Good: {
    bg: "bg-green-100",
    text: "text-green-800",
    emoji: "✅",
    tooltip: "Your device is in good condition.",
  },
  "Needs Attention": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    emoji: "⚠️",
    tooltip: "Some parameters need attention like battery or storage.",
  },
  Critical: {
    bg: "bg-red-100",
    text: "text-red-800",
    emoji: "❌",
    tooltip: "Your device has critical issues. Maintenance is recommended.",
  },
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || statusStyles["Good"];
  const tooltipId = `status-tooltip-${status.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <>
      <span
        className={`inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full ${style.bg} ${style.text}`}
        data-tooltip-id={tooltipId}
        data-tooltip-content={style.tooltip}
      >
        {style.emoji} Overall Status: {status}
      </span>
      <Tooltip id={tooltipId} place="top" effect="solid" />
    </>
  );
};

export default StatusBadge;

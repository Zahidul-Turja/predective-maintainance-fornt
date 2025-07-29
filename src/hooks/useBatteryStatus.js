import { useEffect, useState } from "react";

const useBatteryStatus = () => {
  const [batteryInfo, setBatteryInfo] = useState({
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    let battery;

    const updateBatteryInfo = () => {
      setBatteryInfo({
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    navigator.getBattery().then((bat) => {
      battery = bat;
      updateBatteryInfo();

      battery.addEventListener("chargingchange", updateBatteryInfo);
      battery.addEventListener("levelchange", updateBatteryInfo);
      battery.addEventListener("chargingtimechange", updateBatteryInfo);
      battery.addEventListener("dischargingtimechange", updateBatteryInfo);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("chargingchange", updateBatteryInfo);
        battery.removeEventListener("levelchange", updateBatteryInfo);
        battery.removeEventListener("chargingtimechange", updateBatteryInfo);
        battery.removeEventListener("dischargingtimechange", updateBatteryInfo);
      }
    };
  }, []);

  return batteryInfo;
};

export default useBatteryStatus;

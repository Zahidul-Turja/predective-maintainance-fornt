import React, { useState } from "react";
import { auth, firebaseApp } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToggleSwitch } from "../../components/ui/ToggleSwitch";

import {
  FaBatteryFull,
  FaWrench,
  FaMobileAlt,
  FaClock,
  FaChargingStation,
} from "react-icons/fa";

const ManualInput = () => {
  const [user] = useState(auth.currentUser);
  const repairOptions = [
    "Screen Replacement",
    "Battery Replacement",
    "Charging Port Repair",
    "Camera Repair",
    "Speaker/Mic Issue",
    "Software Issue",
    "Motherboard Repair",
    "Water Damage",
  ];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    os: "",
    device_age: "",
    battery_cycle_count: "",
    battery_health: "",
    fast_charging: "",
    charges_overnight: "",
    previous_repairs: [],
    last_repair_date: "",
    authorized_service: "",
    warranty_status: "",
    storage_capacity: "",
    ram_capacity: "",
    storage_usage: "",
    ram_usage: "",
    //
    overheating: false,
    drop_history: false,
    water_damage: false,
    sensor_issues: false,
    battery_bulging: false,
    screen_cracked: false,
    buttons_not_working: false,
    //
    screen_time: "",
    primary_use: [],
    charge_frequency: "",
    charge_time: "",
    environment: "",
    region_temp: "",
    updated_software: "",
    rooted: "",
    majorConcern: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, multiple } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (multiple) {
      const selected = Array.from(e.target.selectedOptions, (o) => o.value);
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Form Data:", JSON.stringify(formData));
    formData.user_email = user.email;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const data = await response.json();

      // Navigate to /insights with backend response or original formData
      navigate("/insights", { state: data });
    } catch (error) {
      console.error("Error submitting form:", error);
      // handle error (show message to user, etc)
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        className="text-3xl font-bold mb-4 text-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Please input your device information manually
      </motion.h2>

      {/* Circular Progress Indicator */}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Section: Device Information */}
        <div className="p-6 border shadow border-l-4 border-blue-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaMobileAlt /> Device Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="brand"
              placeholder="Brand (e.g., Samsung)"
              value={formData.brand}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="model"
              placeholder="Model (e.g., Galaxy S22)"
              value={formData.model}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="os"
              placeholder="OS Version (e.g., Android 13)"
              value={formData.os}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              name="device_age"
              type="number"
              min={0}
              max={60}
              placeholder="Device Age (Months)"
              value={formData.device_age}
              onChange={handleChange}
              className="input"
              title="Enter device age between 0 and 120 months"
            />
            <input
              name="storage_capacity"
              placeholder="Storage Capacity (e.g., 128 GB)"
              value={formData.storage_capacity}
              onChange={handleChange}
              className="input"
            />
            <input
              name="ram_capacity"
              placeholder="RAM Capacity (e.g., 6 GB)"
              value={formData.ram_capacity}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Section: Battery & Performance */}
        <div className="p-6 border shadow border-l-4 border-green-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaBatteryFull /> Battery & Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="battery_cycle_count"
              type="number"
              min={0}
              placeholder="Battery Cycle Count"
              value={formData.battery_cycle_count}
              onChange={handleChange}
              className="input"
              title="Enter a non-negative number (e.g., 0, 100, 200)"
            />

            <input
              name="battery_health"
              type="number"
              min={0}
              max={100}
              placeholder="Battery Health (%)"
              value={formData.battery_health}
              onChange={handleChange}
              className="input"
              title="Enter battery health between 0% and 100%"
            />

            <input
              name="storage_usage"
              type="number"
              min={0}
              max={100}
              placeholder="Storage Used (%)"
              value={formData.storage_usage}
              onChange={handleChange}
              className="input"
              title="Enter storage usage between 0% and 100%"
            />

            <input
              name="ram_usage"
              type="number"
              min={0}
              max={100}
              placeholder="RAM Usage (%)"
              value={formData.ram_usage}
              onChange={handleChange}
              className="input"
              title="Enter RAM usage between 0% and 100%"
            />
            <select
              name="fast_charging"
              value={formData.fast_charging}
              onChange={handleChange}
              className="input"
            >
              <option value="">Fast Charging?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <select
              name="charges_overnight"
              value={formData.charges_overnight}
              onChange={handleChange}
              className="input"
            >
              <option value="">Charges Overnight?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Section: Repair History */}
        <div className="p-6 border shadow border-l-4 border-yellow-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaWrench className="text-yellow-500" />
            Repair History
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Checkboxes */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Select Past Repairs (if any)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {repairOptions.map((repair) => (
                  <label
                    key={repair}
                    className="flex items-center space-x-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="previous_repairs"
                      value={repair}
                      checked={formData.previous_repairs.includes(repair)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setFormData((prev) => {
                          const updatedRepairs = checked
                            ? [...prev.previous_repairs, value]
                            : prev.previous_repairs.filter(
                                (item) => item !== value
                              );
                          return { ...prev, previous_repairs: updatedRepairs };
                        });
                      }}
                      className="accent-yellow-500"
                    />
                    <span>{repair}</span>
                  </label>
                ))}
              </div>
            </div>

            <select
              name="authorized_service"
              value={formData.authorized_service}
              onChange={handleChange}
              className="input px-4 py-2 rounded border border-gray-300 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Was it an authorized center?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {/* Warranty Status */}
            <select
              name="warranty_status"
              value={formData.warranty_status}
              onChange={handleChange}
              className="input px-4 py-2 rounded border border-gray-300 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="">Warranty Status</option>
              <option value="in">In Warranty</option>
              <option value="out">Out of Warranty</option>
            </select>
          </div>
        </div>
        {/* {Device Hardware Condition} */}

        {/* <div className="p-6 border shadow border-l-4 border-purple-500 rounded-md"></div> */}
        <div className="p-6 border shadow border-l-4 border-gray-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaChargingStation className="text-gray-500" />
            Hardware Condition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-30">
            <ToggleSwitch
              label="Overheating"
              checked={formData.overheating}
              onChange={(val) => setFormData({ ...formData, overheating: val })}
              tooltip="Does the device heat up unusually during use?"
            />
            <ToggleSwitch
              label="Drop History"
              checked={formData.drop_history}
              onChange={(val) =>
                setFormData({ ...formData, drop_history: val })
              }
              tooltip="Has the device been dropped or had impact damage?"
            />
            <ToggleSwitch
              label="Water Damage"
              checked={formData.water_damage}
              onChange={(val) =>
                setFormData({ ...formData, water_damage: val })
              }
              tooltip="Has the device been exposed to water or moisture?"
            />
            <ToggleSwitch
              label="Sensor Issues"
              checked={formData.sensor_issues}
              onChange={(val) =>
                setFormData({ ...formData, sensor_issues: val })
              }
              tooltip="Are there problems with proximity, gyroscope, or other sensors?"
            />
            <ToggleSwitch
              label="Battery Bulging"
              checked={formData.battery_bulging}
              onChange={(val) =>
                setFormData({ ...formData, battery_bulging: val })
              }
              tooltip="Are there any swelling with battery?"
            />
            <ToggleSwitch
              label="Screen Cracked"
              checked={formData.screen_cracked}
              onChange={(val) =>
                setFormData({ ...formData, screen_cracked: val })
              }
              tooltip="Can you see visual problems or cracks on the screen?"
            />
            <ToggleSwitch
              label="Buttons Not Working"
              checked={formData.buttons_not_working}
              onChange={(val) =>
                setFormData({ ...formData, buttons_not_working: val })
              }
              tooltip="Are you facing any problems with the volume or power button?"
            />
          </div>
        </div>

        {/* Section: Usage Behavior */}
        <div className="p-6 border shadow border-l-4 border-purple-500 rounded-md">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <FaClock /> Usage Behavior
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="screen_time"
              value={formData.screen_time}
              onChange={handleChange}
              className="input"
            >
              <option value="">Avg. Screen Time/Day</option>
              <option value="<2h">Less than 2 hrs</option>
              <option value="2-4h">2–4 hrs</option>
              <option value="4-6h">4–6 hrs</option>
              <option value=">6h">6+ hrs</option>
            </select>

            <select
              name="charge_frequency"
              value={formData.charge_frequency}
              onChange={handleChange}
              className="input"
            >
              <option value="">Charging Frequency</option>
              <option value="1/day">Once per day</option>
              <option value="2/day">Twice per day</option>
              <option value=">2/day">More than twice</option>
              <option value="rare">Rarely</option>
            </select>

            <select
              name="charge_time"
              value={formData.charge_time}
              onChange={handleChange}
              className="input"
            >
              <option value="">Usual Charging Duration</option>
              <option value="<1h">Less than 1 hour</option>
              <option value="1-2h">1–2 hours</option>
              <option value=">2h">More than 2 hours</option>
            </select>

            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="input"
            >
              <option value="">Usage Environment</option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="outdoors">Outdoors</option>
              <option value="mixed">Mixed</option>
            </select>

            <input
              name="region_temp"
              placeholder="Region Temp (°C, e.g. 25)"
              value={formData.region_temp}
              onChange={handleChange}
              type="number"
              className="input"
            />

            <select
              name="updated_software"
              value={formData.updated_software}
              onChange={handleChange}
              className="input"
            >
              <option value="">Software Updated?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              name="rooted"
              value={formData.rooted}
              onChange={handleChange}
              className="input"
            >
              <option value="">Device Rooted/Jailbroken?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unknown">Not Sure</option>
            </select>

            <textarea
              name="major_concern"
              placeholder="Describe your primary concern or issue..."
              value={formData.major_concern}
              onChange={handleChange}
              rows={4}
              className="input col-span-1 md:col-span-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition font-semibold"
          >
            Submit and View Insights
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ManualInput;

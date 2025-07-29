import React from 'react';

const ToggleSwitch = ({ label, checked, onChange, tooltip }) => {
  return (
    <div className="flex items-center justify-between pr-10 py-2">
      <label className="text-sm font-medium flex items-center gap-2 ">
        {label}
        {tooltip && (
          <span
            className="text-xs text-gray-400"
            title={tooltip}
          >
            ⓘ
          </span>
        )}
      </label>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          checked ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export { ToggleSwitch };

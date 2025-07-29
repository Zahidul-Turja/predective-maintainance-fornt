import React from "react";

const ProfileCard = ({ user, mfaFactors, removeMFA }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Account Info</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Display Name:</strong> {user.displayName || "N/A"}</p>

      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">MFA Factors</h4>
        {mfaFactors.length > 0 ? (
          <ul className="list-disc list-inside">
            {mfaFactors.map((factor, idx) => (
              <li key={idx} className="flex justify-between items-center">
                {factor.factorId} 
                <button
                  onClick={() => removeMFA(factor.factorId)}
                  className="bg-red-600 text-white px-2 py-1 rounded ml-4 hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No MFA factors enrolled.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

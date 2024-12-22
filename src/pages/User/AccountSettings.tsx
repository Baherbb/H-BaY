import React, { useState } from "react";

const AccountSettings: React.FC = () => {
  const [email, setEmail] = useState("john.doe@example.com");
  const [phoneNumber, setPhoneNumber] = useState("+1234567890");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const handleEmailUpdate = () => {
    setMessage("Email updated successfully!");
    setMessageType("success");
  };

  const handlePhoneNumberUpdate = () => {
    setMessage("Phone number updated successfully!");
    setMessageType("success");
  };

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill out all password fields.");
      setMessageType("error");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New Password and Confirm Password do not match.");
      setMessageType("error");
      return;
    }
    setMessage("Password updated successfully!");
    setMessageType("success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex-1 bg-white">
      <div className="bg-orange-500 text-white -mt-20 px-3 py-3 shadow-md">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-sm opacity-90">Manage your account preferences and security</p>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        <div className="space-y-6">
          {/* Notifications */}
          {message && (
            <div
              className={`p-2 rounded-lg text-center font-semibold ${
                messageType === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Update Email */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Update Email</h2>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-l focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={handleEmailUpdate}
                className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600 transition duration-300"
              >
                Update
              </button>
            </div>
          </div>

          {/* Update Phone Number */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Update Phone Number</h2>
            <div className="flex">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded-l focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={handlePhoneNumberUpdate}
                className="bg-orange-500 text-white px-4 rounded-r hover:bg-orange-600 transition duration-300"
              >
                Update
              </button>
            </div>
          </div>

          {/* Update Password */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Update Password</h2>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded focus:ring-orange-500 focus:border-orange-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded focus:ring-orange-500 focus:border-orange-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                onClick={handlePasswordUpdate}
                className="bg-orange-500 text-white w-full px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

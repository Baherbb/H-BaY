import React, { useState } from "react";
interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;  
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "Hossam Amir",
    email: "hossam@example.com",
    phone: "01032426035",
    address: "Giza",
    profilePicture: "https://any.com/100", 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setEditedUser({ ...editedUser, profilePicture: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-white -mt-20">
      <div className="bg-orange-500 text-white p-3 w-full">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-sm">Manage your personal information and settings</p>
      </div>
      <div className="p-8 w-full">
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <img
              src={editedUser.profilePicture}
              alt="Profile"
              className="h-20 w-20 rounded-full border-4 border-orange-400"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p data-testid="user-email" className="text-gray-600">{user.email}</p>
              {isEditing && (
                <div className="mt-2">
                  <label
                    htmlFor="file-upload"
                    aria-label="Upload Profile Picture"
                    className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
                  >
                    Choose File
                  </label>
                  <input
                    data-testid="file-upload"
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            {[
              { label: "Name", value: user.name, name: "name" },
              { label: "Email", value: user.email, name: "email" },
              { label: "Phone", value: user.phone, name: "phone" },
              { label: "Address", value: user.address, name: "address" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-600" htmlFor={`input-${field.name}`}>{field.label}</label>
                {isEditing ? (
                  <input
                  data-testid={`input-${field.name}`}
                    
                    type="text"
                    name={field.name}
                    value={editedUser[field.name as keyof User]}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:ring-orange-500"
                    aria-label={`Edit ${field.label}`} 

                  />
                ) : (
                  <p className="text-gray-800">{field.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

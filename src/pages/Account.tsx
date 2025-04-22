
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/login");
      alert("Access denied. Please log in to view your account.");
    }
  }, [navigate]);

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset to original data
    setUserData({
      firstName: "Md",
      lastName: "Rimel",
      email: "rimel1111@gmail.com",
      address: "Kingston, 5236, United State",
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    // Here would be an API call to update user data
    alert("Your profile information has been updated successfully");
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Error: New passwords don't match");
      return;
    }

    if (passwords.currentPassword !== "123456") {
      alert("Error: Current password is incorrect");
      return;
    }

    // Here would be an API call to update password
    alert("Your password has been updated successfully");

    // Clear password fields
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <h3 className="font-medium mb-6">Manage My Account</h3>
            <div className="space-y-4">
              <p className="text-[#e74c3c]">My Profile</p>
              <p>Address Book</p>
              <p>My Payment Options</p>
            </div>

            <h3 className="font-medium mt-8 mb-4">My Orders</h3>
            <div className="space-y-4">
              <p>My Returns</p>
              <p>My Cancellations</p>
            </div>

            <h3 className="font-medium mt-8 mb-4">My WishList</h3>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium">Edit Your Profile</h2>
              <p>Welcome! Md Rimel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full bg-gray-50 border rounded-md px-4 py-2 ${isEditing ? 'bg-white' : ''}`}
                />
              </div>
              <div>
                <label className="block mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full bg-gray-50 border rounded-md px-4 py-2 ${isEditing ? 'bg-white' : ''}`}
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full bg-gray-50 border rounded-md px-4 py-2 ${isEditing ? 'bg-white' : ''}`}
                />
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full bg-gray-50 border rounded-md px-4 py-2 ${isEditing ? 'bg-white' : ''}`}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-[#e74c3c] text-white rounded-md hover:bg-[#c0392b] transition-colors"
                >
                  Edit
                </button>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#e74c3c] text-white rounded-md hover:bg-[#c0392b] transition-colors"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="mt-10">
              <h3 className="font-medium mb-4">Password Changes</h3>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-50 border rounded-md px-4 py-2"
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-50 border rounded-md px-4 py-2"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-50 border rounded-md px-4 py-2"
                  required
                />

                <div className="flex justify-end gap-4 mt-6">
                  <button type="submit" className="px-6 py-2 bg-[#e74c3c] text-white rounded-md hover:bg-[#c0392b] transition-colors">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;

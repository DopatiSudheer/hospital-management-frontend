import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import patientService from "../services/patientService";

function CompleteProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    age: "",
    bloodGroup: "",
    contactNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const patientData = {
    patientName: formData.patientName.trim(),
    gender: formData.gender,
    age: parseInt(formData.age),
    bloodGroup: formData.bloodGroup.trim(),
    contactNumber: formData.contactNumber.trim(),
    address: formData.address.trim(),
    userId: user.id,
    active: true,
  };

  try {
    const response = await patientService.addPatient(patientData, user.email);

    if (response.success) {
      navigate("/dashboard");
    } else {
      alert(response.message || "Profile save failed");
    }

  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Something went wrong");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center bg-light py-5">
      <div
        className="card shadow"
        style={{ width: "100%", maxWidth: "520px", borderRadius: "12px" }}
      >
        <div className="card-body p-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ fontWeight: 600 }}>
              Complete Your Profile
            </h5>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <p className="text-muted mb-3">
            Please provide your personal details to continue.
          </p>

          <hr />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="patientName"
                className="form-control"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="150"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                className="form-control"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                className="form-control"


value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Save Profile
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;

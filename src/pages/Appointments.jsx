import React, { useState, useEffect } from 'react';
import appointmentService from '../services/appointmentService';
import patientService from '../services/patientService';
import doctorService from '../services/doctorService';
import { getUserRole } from '../utils/roleUtils';
import { useRevalidator } from 'react-router-dom';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const role = getUserRole();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchLoggedPatient();
    fetchAppointments();
    fetchDoctors();
  }, []);

  const resetForm = () => {
    setFormData({
      doctorId: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
    });
    setAvailableSlots([]);
    setEditingAppointmentId(null);
  };

  const fetchLoggedPatient = async () => {
    if (role !== "PATIENT") return;
    try {
      const response = await patientService.getAllPatients();
      if (response.success) {
        const patient = response.data.find(
          (p) => Number(p.userId) === Number(user.id)
        );
        if (patient) setPatientId(patient.id);
      }
    } catch {}
  };

  const handleComplete = async (id) => {
  if (!window.confirm("Mark this appointment as completed?")) return;

  try {
    const response = await appointmentService.completeAppointment(id);

    if (response.success) {
      showAlert("Appointment completed", "success");
      fetchAppointments();
    } else {
      showAlert("Failed to complete", "danger");
    }

  } catch {
    showAlert("Failed to complete", "danger");
  }
};

  const fetchAppointments = async () => {
  setLoading(true);

  try {
    let idToSend = null;

    if (role === "DOCTOR") {
      const doctorResponse = await doctorService.getAllDoctors();
      if (doctorResponse.success) {
        const doctor = doctorResponse.data.find(
          (d) => d.email === user.email
        );
        if (doctor) {
          idToSend = doctor.id;
        }
      }
    }

    if (role === "PATIENT") {
      const patientResponse = await patientService.getAllPatients();
      if (patientResponse.success) {
        const patient = patientResponse.data.find(
          (p) => p.userId === user.id
        );
        if (patient) {
          idToSend = patient.id;
        }
      }
    }

    let response;

    if (role === "ADMIN") {
      response = await appointmentService.getAllAppointments();
    } else {
      response = await appointmentService.getAppointmentsForUser(
        role,
        idToSend
      );
    }

    if (response.success) {
      let data = response.data || [];

      data.sort((a, b) => {
        if (a.status !== b.status) {
          if (a.status === "SCHEDULED") return -1;
          if (b.status === "SCHEDULED") return 1;
          if (a.status === "COMPLETED") return -1;
          if (b.status === "COMPLETED") return 1;
        }

        const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`);
        const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`);
        return dateB - dateA;
      });

      setAppointments(data);
    }

  } catch (error) {
    showAlert("Failed to fetch appointments", "danger");
  } finally {
    setLoading(false);
  }
};

  const fetchDoctors = async () => {
    try {
      const response = await doctorService.getAllDoctors();
      if (response.success) setDoctors(response.data || []);
    } catch {}
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;
    try {
      const response = await appointmentService.getAvailableSlots(doctorId, date);
      if (response.success) {
        setAvailableSlots(response.data || []);
      }
    } catch {
      showAlert("Failed to load available slots", "danger");
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  const isFutureAppointment = (date) => {
    const today = new Date();
    const apptDate = new Date(date);
    today.setHours(0,0,0,0);
    apptDate.setHours(0,0,0,0);
    return apptDate >= today;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (name === "doctorId" || name === "appointmentDate") {
      fetchAvailableSlots(
        name === "doctorId" ? value : updatedForm.doctorId,
        name === "appointmentDate" ? value : updatedForm.appointmentDate
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.doctorId || !formData.appointmentDate || !formData.appointmentTime || !formData.reason.trim()) {
      showAlert("Please fill all fields", "danger");
      return;
    }

    if (role === "PATIENT" && !patientId) {
      showAlert("Patient profile not found", "danger");
      return;
    }

    try {
      const appointmentData = {
        patientId: patientId,
        doctorId: Number(formData.doctorId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason.trim(),
        status: "SCHEDULED",
      };

      let response;

      if (editingAppointmentId) {
        response = await appointmentService.updateAppointment(
          editingAppointmentId,
          appointmentData
        );
      } else {
        response = await appointmentService.addAppointment(appointmentData);
      }

      if (!response.success) {
        showAlert("Operation failed", "danger");
        return;
      }

      showAlert(
        editingAppointmentId
          ? "Appointment rescheduled successfully"
          : "Appointment booked successfully",
        "success"
      );

      resetForm();
      setShowModal(false);
      fetchAppointments();

    } catch {
      showAlert("Operation failed", "danger");
    }
  };

  const handleReschedule = (appointment) => {
    setEditingAppointmentId(appointment.id);

    setFormData({
      doctorId: appointment.doctor?.id,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: '',
      reason: appointment.reason,
    });

    fetchAvailableSlots(
      appointment.doctor?.id,
      appointment.appointmentDate
    );

    setShowModal(true);
  };

  const handleCancel = async (appointment) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      const response = await appointmentService.cancelAppointment(appointment.id);
      if (!response.success) {
        showAlert("Cancel failed", "danger");
        return;
      }

      showAlert("Appointment cancelled", "success");
      fetchAppointments();
    } catch {
      showAlert("Cancel failed", "danger");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Appointments</h2>
        {role === "PATIENT" && (
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            Book Appointment
          </button>
        )}
      </div>

      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appt => (
                  <tr key={appt.id}>
                    <td>{appt.doctor?.doctorName}</td>
                    <td>{appt.appointmentDate}</td>
                    <td>{appt.appointmentTime}</td>
                    <td>{appt.reason}</td>
                    <td>
                      <span className={`badge ${
                        appt.status === "SCHEDULED" ? "bg-primary" :
                        appt.status === "COMPLETED" ? "bg-success" :
                        "bg-danger"
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td>
                      {appt.status === "SCHEDULED" && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancel(appt)}
                          >
                            Cancel
                          </button>

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleReschedule(appt)}
                          >
                            Reschedule
                          </button>

                          {role === "DOCTOR" && appt.status === "SCHEDULED" && (
                          <button
                            className="btn btn-sm btn-outline-success me-2"
                            onClick={() => handleComplete(appt.id)}
                          >
                            Complete
                          </button>
                        )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>
                  {editingAppointmentId ? "Reschedule Appointment" : "Book Appointment"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">

                  <div className="mb-3">
                    <label>Doctor</label>
                    <select
                      className="form-select"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          {doc.doctorName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="appointmentDate"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Time Slot</label>
                    <select
                      className="form-select"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Time Slot</option>
                      {availableSlots.map(slot => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Reason</label>
                    <textarea
                      className="form-control"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      resetForm();
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary">
                    {editingAppointmentId ? "Update" : "Book"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Appointments;
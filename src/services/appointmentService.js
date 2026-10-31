import api from './api';

const appointmentService = {

  getAllAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  addAppointment: async (appointment) => {
    const response = await api.post('/appointments', appointment);
    return response.data;
  },

  updateAppointment: async (id, appointment) => {
    const response = await api.put(`/appointments/${id}`, appointment);
    return response.data;
  },

  completeAppointment: async (id) => {
  const response = await api.put(`/appointments/${id}/complete`);
  return response.data;
},

  getAppointmentsForUser: async (role, id) => {
  const response = await api.get(
    `/appointments/user?role=${role}&userId=${id}`
  );
  return response.data;
},

  cancelAppointment: async (id) => {
    const response = await api.put(`/appointments/${id}/cancel`);
    return response.data;
  },

  getAvailableSlots: async (doctorId, date) => {
    const response = await api.get(`/appointments/available-slots`, {
      params: { doctorId, date }
    });
    return response.data;
  }

};

export default appointmentService;
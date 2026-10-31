import api from './api';

const patientService = {

  getAllPatients: async () => {
    const response = await api.get('/patients');
    return response.data;
  },

  addPatient: async (patient, email) => {
    const response = await api.post(`/patients?email=${email}`, patient);
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  updatePatient: async (id, patient) => {
    const response = await api.put(`/patients/${id}`, patient);
    return response.data;
  },

  deletePatient: async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  },
};

export default patientService;
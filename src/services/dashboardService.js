import api from './api';

const getDashboardSummary = async (role, userId) => {
  const response = await api.get(
    `/dashboard/summary?role=${role}&userId=${userId}`
  );
  return response.data;
};

export default {
  getDashboardSummary,
};
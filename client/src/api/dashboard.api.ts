import api from "./axios";

export const dashboardStats = async () => {
  const stats = await api.get("dashboard/stats/");
  return stats.data;
};

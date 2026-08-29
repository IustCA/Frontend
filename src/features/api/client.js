import api from "./axios";

export const authApi = {
  register: (payload) => api.post("/api/accounts/auth/register/", payload),
  login: (username, password) =>
    api.post("/api/accounts/auth/login/", { username, password }),
  refreshToken: (refresh) => api.post("/api/accounts/auth/refresh/", { refresh }),
  getMe: () => api.get("/api/accounts/auth/me/"),
};

export const profileApi = {
  getProfile: () => api.get("/api/accounts/profile/"),
  getPublicProfile: (studentId) =>
    api.get(`/api/accounts/profile/${studentId}/`),
  updateProfile: (data) => api.patch("/api/accounts/profile/", data),
};

export const itemsApi = {
  getProjects: (params) => api.get("/api/accounts/projects/", { params }),
  createProject: (data) => api.post("/api/accounts/projects/", data),
  updateProject: (id, data) => api.patch(`/api/accounts/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/api/accounts/projects/${id}/`),

  getExperiences: (params) => api.get("/api/accounts/experiences/", { params }),
  createExperience: (data) => api.post("/api/accounts/experiences/", data),
  updateExperience: (id, data) =>
    api.patch(`/api/accounts/experiences/${id}/`, data),
  deleteExperience: (id) => api.delete(`/api/accounts/experiences/${id}/`),

  getEducations: (params) => api.get("/api/accounts/educations/", { params }),
  createEducation: (data) => api.post("/api/accounts/educations/", data),
  updateEducation: (id, data) =>
    api.patch(`/api/accounts/educations/${id}/`, data),
  deleteEducation: (id) => api.delete(`/api/accounts/educations/${id}/`),

  getSkills: (params) => api.get("/api/accounts/skills/", { params }),
  createSkill: (data) => api.post("/api/accounts/skills/", data),
  deleteSkill: (id) => api.delete(`/api/accounts/skills/${id}/`),

  getLanguages: (params) => api.get("/api/accounts/languages/", { params }),
  createLanguage: (data) => api.post("/api/accounts/languages/", data),
  deleteLanguage: (id) => api.delete(`/api/accounts/languages/${id}/`),

  getCertificates: (params) => api.get("/api/accounts/certificates/", { params }),
  createCertificate: (data) => api.post("/api/accounts/certificates/", data),
  updateCertificate: (id, data) =>
    api.patch(`/api/accounts/certificates/${id}/`, data),
  deleteCertificate: (id) => api.delete(`/api/accounts/certificates/${id}/`),

  getActivities: (params) => api.get("/api/accounts/activities/", { params }),
  createActivity: (data) => api.post("/api/accounts/activities/", data),
  updateActivity: (id, data) =>
    api.patch(`/api/accounts/activities/${id}/`, data),
  deleteActivity: (id) => api.delete(`/api/accounts/activities/${id}/`),

  getAchievements: (params) => api.get("/api/accounts/achievements/", { params }),
  createAchievement: (data) => api.post("/api/accounts/achievements/", data),
  updateAchievement: (id, data) =>
    api.patch(`/api/accounts/achievements/${id}/`, data),
  deleteAchievement: (id) => api.delete(`/api/accounts/achievements/${id}/`),

  getInterests: (params) => api.get("/api/accounts/interests/", { params }),
  createInterest: (data) => api.post("/api/accounts/interests/", data),
  deleteInterest: (id) => api.delete(`/api/accounts/interests/${id}/`),

  sendContactMessage: (data) => api.post("/api/accounts/contact/", data),
};

export default api;

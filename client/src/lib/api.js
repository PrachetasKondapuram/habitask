import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // eg http://localhost:4000/api
  headers: { "Content-Type": "application/json" },
});

// Habits
export const Habits = {
    list: () => api.get("/habits").then(r => r.data),
    create: (payload) => api.post("/habits", payload).then(r => r.data),
    complete: (id, date) => api.patch(`/habits/${id}/complete`, date ? { date } : {}).then(r => r.data),
    remove: (id) => api.delete(`/habits/${id}`).then(r => r.data),
};

export default api;
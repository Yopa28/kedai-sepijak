import api, { handleApiResponse, handleApiError } from './api';

export const submitFeedback = async (payload) => {
  try {
    // Kirim data lengkap dengan struktur baru
    const body = {
      customer_name: payload.employee_name,
      role: payload.role,
      employee_name: payload.employee_name,
      contact: payload.contact,
      date_of_visit: payload.date_of_visit,
      time_of_visit: payload.time_of_visit,
      rating: payload.ratings.kebersihan, // Overall rating
      ratings: payload.ratings, // Detailed ratings as JSON
      message: payload.message || 'Feedback submitted via form',
      voluntary_consent: payload.voluntary_consent,
      category: 'pelayanan' // Default category
    };
    
    // console.log('Sending payload:', body); // Debug
    
    const res = await api.post('/feedback', body);
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

// supaya AdminFeedback.vue ga error import
export const getFeedback = async (params = {}) => {
  try {
    const res = await api.get('/feedback', { params }); // pastikan route GET ada, kalau belum pakai mock dulu
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

export default { submitFeedback, getFeedback };

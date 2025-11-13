// pollingAPI.js
import api, { handleApiResponse, handleApiError } from './api';

//
// ---------- Helpers ----------
//
const get = async (url, config) => {
  try {
    const res = await api.get(url, config);
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

const post = async (url, payload) => {
  try {
    const res = await api.post(url, payload);
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

const put = async (url, payload) => {
  try {
    const res = await api.put(url, payload);
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

const del = async (url) => {
  try {
    const res = await api.delete(url);
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

const patch = async (url, payload) => {
  try {
    const res = await api.patch(url, payload);
    return handleApiResponse(res);
  } catch (err) {
    return handleApiError(err);
  }
};

//
// ---------- Admin endpoints (dipakai AdminPolls.vue) ----------
//

// Ambil semua polling (beserta options & total_votes)
// GET /api/polling  (opsional: ?active=1 untuk hanya yang aktif)
// Di pollingAPI.js
export const listPolls = async (params = {}) => {
  try {
    const res = await api.get('/polling', { params });
    const processed = handleApiResponse(res);
    // Kalo sukses, return array nya
    if (processed.success && Array.isArray(processed.data)) {
      return processed.data; // <-- Ini return array [ ... ]
    }
    // Kalo gak sukses, lempar error biar masuk ke catch di AdminPolls.vue
    throw new Error(processed.message || 'Respon API tidak valid');
  } catch (err) {
    // Handle error
    return handleApiError(err); // <-- Ini return object error
  }
};

// ... sisanya biarkan sama ...
// Buat fungsi-fungsi lainnya (createPoll, togglePoll, dll) bisa kamu ubah juga
// biar return data yang bener (misalnya buat createPoll return data polling yang dibuat)
// supaya AdminPolls.vue bisa handle responnya dengan benar.

export const createPoll = async ({ question, options, is_active = true }) => {
  try {
    const res = await api.post('/polling', { question, options, is_active });
    const processed = handleApiResponse(res);
    if (processed.success && processed.data) {
      return processed.data; // Return data polling yang dibuat
    }
    throw new Error(processed.message || 'Gagal membuat polling');
  } catch (err) {
    return handleApiError(err);
  }
};

export const togglePoll = async (id) => {
  try {
    const res = await api.patch(`/polling/${id}/toggle`);
    const processed = handleApiResponse(res);
    if (processed.success && processed.data) {
      return processed.data; // Return data polling yang diupdate
    }
    throw new Error(processed.message || 'Gagal mengubah status polling');
  } catch (err) {
    return handleApiError(err);
  }
};

export const removePoll = async (id) => {
  try {
    const res = await api.delete(`/polling/${id}`);
    const processed = handleApiResponse(res);
    if (processed.success) {
      return processed; // Bisa return pesan sukses
    }
    throw new Error(processed.message || 'Gagal menghapus polling');
  } catch (err) {
    return handleApiError(err);
  }
};

export const getPoll = async (id) => {
  try {
    const res = await api.get(`/polling/${id}`);
    const processed = handleApiResponse(res);
    if (processed.success && processed.data) {
      return processed.data; // Return data polling detail
    }
    throw new Error(processed.message || 'Gagal mengambil polling');
  } catch (err) {
    return handleApiError(err);
  }
};

// ... sisanya ...
export const getPollStatistics = async () => {
  return get('/polling/statistics');
};

//
// ---------- Public / Voting (dipakai PollingCard.vue) ----------
//
// ... biarkan ini sama ...
export const listActiveOptions = async () => {
  return get('/polling');
};

export const checkVote = async (phone) => {
  return get('/polling/check-vote', { params: { phone } });
};

export const submitVote = async ({ name, phone, email, option_id }) => {
  return post('/polling/vote', {
    customer_name: name?.trim(),
    customer_phone: phone?.trim(),
    customer_email: email?.trim() || undefined,
    option_id
  });
};

//
// ---------- Backward-compat aliases (biar import lama gak crash) ----------
//
// ... biarkan ini sama ...
export const getAllPollOptions = async () => {
  return listActiveOptions();
};

export const getPollOptionById = async (id) => {
  return getPoll(id);
};

export const submitVoteLegacy = async (voteData) => {
  const mapped = {
    option_id: voteData?.poll_option_id,
    name: voteData?.customer_name,
    phone: voteData?.customer_phone,
    email: voteData?.customer_email
  };
  return submitVote(mapped);
};

export const checkVoteStatus = async (phone) => {
  return checkVote(phone);
};

export const createPollOption = async (pollData) => {
  const question = pollData?.question || 'Polling';
  const name = pollData?.name ? String(pollData.name) : 'Opsi 1';
  const is_active = pollData?.is_active ?? true;
  return createPoll({ question, options: [name], is_active });
};

export const updatePollOption = async (id, pollData) => {
  return put(`/polling/${id}`, pollData);
};

export const deletePollOption = async (id) => {
  return removePoll(id);
};

export default {
  listPolls,
  createPoll,
  togglePoll,
  removePoll,
  getPoll,
  getPollStatistics,
  listActiveOptions,
  checkVote,
  submitVote,
  getAllPollOptions,
  getPollOptionById,
  submitVoteLegacy,
  checkVoteStatus,
  createPollOption,
  updatePollOption,
  deletePollOption
};
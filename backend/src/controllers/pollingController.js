// ============================================
// Polling Controller – Kedai Sepijak Backend
// ============================================

const db = require('../config/database');

/**
 * Helper: ambil 1 poll aktif lengkap dengan options & total votes
 */
async function fetchActivePoll() {
  const polls = await db.query(`
    SELECT id, question, is_active, created_at
    FROM polls
    WHERE is_active = 1
    ORDER BY created_at DESC
    LIMIT 1
  `);

  if (!polls.length) return null;

  const poll = polls[0];

  const options = await db.query(
    `SELECT id, option_text, votes
     FROM poll_options
     WHERE poll_id = ? ORDER BY id ASC`,
    [poll.id]
  );

  const totalVotesRow = await db.query(
    `SELECT COUNT(*) AS total_votes FROM poll_votes WHERE poll_id = ?`,
    [poll.id]
  );
  const total_votes = totalVotesRow[0]?.total_votes || 0;

  return {
    id: poll.id,
    question: poll.question,
    is_active: !!poll.is_active,
    created_at: poll.created_at,
    options: options.map(o => ({
      id: o.id,
      option_text: o.option_text,
      votes: Number(o.votes || 0)
    })),
    total_votes
  };
}

/**
 * GET /api/polling/active
 * Ambil 1 polling aktif (dipakai PollingCard.vue)
 */
exports.getActivePoll = async (req, res) => {
  try {
    const data = await fetchActivePoll();
    return res.json({ success: true, data });
  } catch (err) {
    console.error('getActivePoll error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil polling aktif' });
  }
};

/**
 * POST /api/polling/:pollId/vote
 * Body: { name, phone, email?, option_id }
 */
// Di pollingController.js
exports.submitVote = async (req, res) => {
  try {
    const pollId = parseInt(req.params.pollId, 10);
    const { name, phone, email, option_id } = req.body;

    if (!pollId || !name || !phone || !option_id) {
      return res.status(400).json({ success: false, message: 'name, phone, dan option_id wajib diisi' });
    }

    // validasi poll aktif
    const poll = await db.query(`SELECT id, is_active FROM polls WHERE id = ?`, [pollId]);
    if (!poll.length || !poll[0].is_active) {
      return res.status(400).json({ success: false, message: 'Polling tidak aktif atau tidak ditemukan' });
    }

    // validasi option milik poll
    const option = await db.query(
      `SELECT id, poll_id FROM poll_options WHERE id = ? AND poll_id = ?`,
      [option_id, pollId]
    );
    if (!option.length) {
      return res.status(400).json({ success: false, message: 'Opsi tidak valid untuk polling ini' });
    }

    // cek apakah nomor sudah vote di poll ini
    const existed = await db.query(
      `SELECT id FROM poll_votes WHERE poll_id = ? AND phone = ?`,
      [pollId, phone]
    );
    if (existed.length) {
      return res.status(409).json({ success: false, message: 'Nomor ini sudah melakukan vote pada polling ini' });
    }

    // insert vote & update counter
    // Karena kolom di database sekarang 'customer_name', query ini udah bener
    await db.query(
      `INSERT INTO poll_votes (poll_id, option_id, customer_name, phone, email)
       VALUES (?, ?, ?, ?, ?)`,
      [pollId, option_id, name, phone, email || null]
    );

    await db.query(
      `UPDATE poll_options SET votes = COALESCE(votes,0) + 1 WHERE id = ?`,
      [option_id]
    );

    const updated = await fetchActivePoll();
    return res.status(201).json({ success: true, message: 'Vote terekam', data: updated });
  } catch (err) {
    console.error('submitVote error:', err);
    return res.status(500).json({ success: false, message: 'Gagal submit vote' });
  }
};
/**
 * GET /api/polling
 * List semua poll (buat AdminPolls.vue)
 */
exports.listPolls = async (req, res) => {
  try {
    const polls = await db.query(`
      SELECT id, question, is_active, created_at
      FROM polls
      ORDER BY created_at DESC
    `);

    // ambil options + total_votes per poll
    const result = [];
    for (const p of polls) {
      const options = await db.query(
        `SELECT id, option_text, votes FROM poll_options WHERE poll_id = ? ORDER BY id ASC`,
        [p.id]
      );
      const totalRow = await db.query(
        `SELECT COUNT(*) AS total_votes FROM poll_votes WHERE poll_id = ?`,
        [p.id]
      );
      result.push({
        id: p.id,
        question: p.question,
        is_active: !!p.is_active,
        created_at: p.created_at,
        options: options.map(o => ({
          id: o.id,
          option_text: o.option_text,
          votes: Number(o.votes || 0)
        })),
        total_votes: totalRow[0]?.total_votes || 0
      });
    }

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('listPolls error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data polling' });
  }
};

/**
 * POST /api/polling
 * Body: { question, options: [string, string, ...], is_active: boolean }
 */
exports.createPoll = async (req, res) => {
  try {
    const { question, options, is_active } = req.body;

    if (!question || !Array.isArray(options) || options.filter(o => o && o.trim()).length < 2) {
      return res.status(400).json({ success: false, message: 'Pertanyaan & minimal 2 opsi diperlukan' });
    }

    // nonaktifkan poll lain jika mau aktifkan yang baru
    if (is_active) {
      await db.query(`UPDATE polls SET is_active = 0 WHERE is_active = 1`);
    }

    const insertPoll = await db.query(
      `INSERT INTO polls (question, is_active) VALUES (?, ?)`,
      [question, is_active ? 1 : 0]
    );

    const pollId = insertPoll.insertId;

    // insert options
    const cleanOptions = options
      .map(o => (o || '').trim())
      .filter(o => o.length > 0);

    for (const text of cleanOptions) {
      await db.query(
        `INSERT INTO poll_options (poll_id, option_text, votes) VALUES (?, ?, 0)`,
        [pollId, text]
      );
    }

    // response detail
    const detail = await exports.getPollByIdDirect(pollId);
    return res.status(201).json({ success: true, message: 'Polling dibuat', data: detail });
  } catch (err) {
    console.error('createPoll error:', err);
    return res.status(500).json({ success: false, message: 'Gagal membuat polling' });
  }
};

/**
 * PATCH /api/polling/:pollId/toggle
 * Toggle aktif/nonaktif
 */
exports.togglePollStatus = async (req, res) => {
  try {
    const pollId = parseInt(req.params.pollId, 10);
    if (!pollId) return res.status(400).json({ success: false, message: 'pollId invalid' });

    const rows = await db.query(`SELECT id, is_active FROM polls WHERE id = ?`, [pollId]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Polling tidak ditemukan' });

    const targetActive = rows[0].is_active ? 0 : 1;

    if (targetActive === 1) {
      await db.query(`UPDATE polls SET is_active = 0 WHERE is_active = 1 AND id <> ?`, [pollId]);
    }

    await db.query(`UPDATE polls SET is_active = ? WHERE id = ?`, [targetActive, pollId]);

    const detail = await exports.getPollByIdDirect(pollId);
    return res.json({ success: true, message: 'Status diubah', data: detail });
  } catch (err) {
    console.error('togglePollStatus error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengubah status polling' });
  }
};

/**
 * DELETE /api/polling/:pollId
 * Hapus poll + options + votes
 */
exports.deletePoll = async (req, res) => {
  try {
    const pollId = parseInt(req.params.pollId, 10);
    if (!pollId) return res.status(400).json({ success: false, message: 'pollId invalid' });

    const exist = await db.query(`SELECT id FROM polls WHERE id = ?`, [pollId]);
    if (!exist.length) return res.status(404).json({ success: false, message: 'Polling tidak ditemukan' });

    await db.query(`DELETE FROM poll_votes WHERE poll_id = ?`, [pollId]);
    await db.query(`DELETE FROM poll_options WHERE poll_id = ?`, [pollId]);
    await db.query(`DELETE FROM polls WHERE id = ?`, [pollId]);

    return res.json({ success: true, message: 'Polling dihapus' });
  } catch (err) {
    console.error('deletePoll error:', err);
    return res.status(500).json({ success: false, message: 'Gagal menghapus polling' });
  }
};

/**
 * GET /api/polling/:pollId
 * Detail satu polling (admin modal results)
 */
exports.getPollById = async (req, res) => {
  try {
    const pollId = parseInt(req.params.pollId, 10);
    if (!pollId) return res.status(400).json({ success: false, message: 'pollId invalid' });

    const detail = await exports.getPollByIdDirect(pollId);
    if (!detail) return res.status(404).json({ success: false, message: 'Polling tidak ditemukan' });

    return res.json({ success: true, data: detail });
  } catch (err) {
    console.error('getPollById error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil detail polling' });
  }
};

/** Utility untuk ambil detail poll by id (dipakai beberapa handler) */
exports.getPollByIdDirect = async (pollId) => {
  const polls = await db.query(
    `SELECT id, question, is_active, created_at FROM polls WHERE id = ?`,
    [pollId]
  );
  if (!polls.length) return null;

  const options = await db.query(
    `SELECT id, option_text, votes FROM poll_options WHERE poll_id = ? ORDER BY id ASC`,
    [pollId]
  );
  const totalRow = await db.query(
    `SELECT COUNT(*) AS total_votes FROM poll_votes WHERE poll_id = ?`,
    [pollId]
  );

  return {
    id: polls[0].id,
    question: polls[0].question,
    is_active: !!polls[0].is_active,
    created_at: polls[0].created_at,
    options: options.map(o => ({
      id: o.id,
      option_text: o.option_text,
      votes: Number(o.votes || 0)
    })),
    total_votes: totalRow[0]?.total_votes || 0
  };
};

/**
 * GET /api/polling/:pollId/votes
 * Get detailed voter data for a poll
 */
exports.getPollVotes = async (req, res) => {
  try {
    const pollId = parseInt(req.params.pollId, 10);
    if (!pollId) return res.status(400).json({ success: false, message: 'pollId invalid' });

    // Check if poll exists
    const poll = await db.query(`SELECT id, question FROM polls WHERE id = ?`, [pollId]);
    if (!poll.length) return res.status(404).json({ success: false, message: 'Polling tidak ditemukan' });

    // Get detailed vote data with voter information
    const votes = await db.query(`
      SELECT 
        pv.customer_name as voter_name,
        pv.phone as voter_phone,
        pv.email as voter_email,
        po.option_text as option_name,
        pv.created_at
      FROM poll_votes pv
      JOIN poll_options po ON pv.option_id = po.id
      WHERE pv.poll_id = ?
      ORDER BY pv.created_at DESC
    `, [pollId]);

    return res.json({ 
      success: true, 
      data: {
        id: poll[0].id,
        question: poll[0].question,
        votes: votes.map(v => ({
          voter_name: v.voter_name || 'Anonymous',
          voter_phone: v.voter_phone || '-',
          voter_email: v.voter_email || '-',
          option_name: v.option_name,
          created_at: v.created_at
        }))
      }
    });
  } catch (err) {
    console.error('getPollVotes error:', err);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data voter' });
  }
};

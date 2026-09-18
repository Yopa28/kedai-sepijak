package polling

import (
	"database/sql"
	"fmt"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		db: db,
	}
}

// =========================
// POLL
// =========================

func (r *Repository) FindAllPolls() ([]Poll, error) {
	rows, err := r.db.Query(`
		SELECT
			id,
			question,
			description,
			is_active
		FROM polls
		ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, fmt.Errorf("find all polls: %w", err)
	}
	defer rows.Close()

	polls := make([]Poll, 0)

	for rows.Next() {
		var poll Poll

		if err := rows.Scan(
			&poll.ID,
			&poll.Question,
			&poll.Description,
			&poll.IsActive,
		); err != nil {
			return nil, fmt.Errorf("scan poll: %w", err)
		}

		options, err := r.FindOptionsByPollID(poll.ID)
		if err != nil {
			return nil, err
		}

		poll.Options = options

		polls = append(polls, poll)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate polls: %w", err)
	}

	return polls, nil
}

func (r *Repository) FindActivePolls() ([]Poll, error) {
	rows, err := r.db.Query(`
		SELECT
			id,
			question,
			description,
			is_active
		FROM polls
		WHERE is_active = 1
		ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, fmt.Errorf("find active polls: %w", err)
	}
	defer rows.Close()

	polls := make([]Poll, 0)

	for rows.Next() {
		var poll Poll

		if err := rows.Scan(
			&poll.ID,
			&poll.Question,
			&poll.Description,
			&poll.IsActive,
		); err != nil {
			return nil, fmt.Errorf("scan active poll: %w", err)
		}

		options, err := r.FindOptionsByPollID(poll.ID)
		if err != nil {
			return nil, err
		}

		poll.Options = options

		polls = append(polls, poll)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate active polls: %w", err)
	}

	return polls, nil
}

func (r *Repository) FindPollByID(id uint64) (Poll, error) {
	var poll Poll

	err := r.db.QueryRow(`
		SELECT
			id,
			question,
			description,
			is_active
		FROM polls
		WHERE id = ?
	`, id).Scan(
		&poll.ID,
		&poll.Question,
		&poll.Description,
		&poll.IsActive,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return poll, fmt.Errorf("poll tidak ditemukan")
		}

		return poll, fmt.Errorf("find poll: %w", err)
	}

	options, err := r.FindOptionsByPollID(poll.ID)
	if err != nil {
		return poll, err
	}

	poll.Options = options

	return poll, nil
}

// =========================
// OPTIONS
// =========================

func (r *Repository) FindOptionsByPollID(pollID uint64) ([]PollOption, error) {
	rows, err := r.db.Query(`
		SELECT
			id,
			poll_id,
			option_text
		FROM poll_options
		WHERE poll_id = ?
		ORDER BY id ASC
	`, pollID)

	if err != nil {
		return nil, fmt.Errorf("find poll options: %w", err)
	}
	defer rows.Close()

	options := make([]PollOption, 0)

	for rows.Next() {
		var option PollOption

		if err := rows.Scan(
			&option.ID,
			&option.PollID,
			&option.OptionText,
		); err != nil {
			return nil, fmt.Errorf("scan poll option: %w", err)
		}

		options = append(options, option)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate poll options: %w", err)
	}

	return options, nil
}

func (r *Repository) FindOptionByID(optionID uint64) (PollOption, error) {
	var option PollOption

	err := r.db.QueryRow(`
		SELECT
			id,
			poll_id,
			option_text
		FROM poll_options
		WHERE id = ?
	`, optionID).Scan(
		&option.ID,
		&option.PollID,
		&option.OptionText,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return option, fmt.Errorf("option tidak ditemukan")
		}

		return option, fmt.Errorf("find option: %w", err)
	}

	return option, nil
}

// =========================
// CREATE POLL
// =========================

func (r *Repository) CreatePoll(poll *Poll, options []string) error {
	tx, err := r.db.Begin()
	if err != nil {
		return fmt.Errorf("begin transaction: %w", err)
	}

	defer tx.Rollback()

	result, err := tx.Exec(`
		INSERT INTO polls (
			question,
			description,
			is_active
		)
		VALUES (?, ?, ?)
	`,
		poll.Question,
		poll.Description,
		poll.IsActive,
	)

	if err != nil {
		return fmt.Errorf("insert poll: %w", err)
	}

	pollID, err := result.LastInsertId()
	if err != nil {
		return fmt.Errorf("get poll id: %w", err)
	}

	poll.ID = uint64(pollID)

	for _, optionText := range options {
		_, err := tx.Exec(`
			INSERT INTO poll_options (
				poll_id,
				option_text
			)
			VALUES (?, ?)
		`, poll.ID, optionText)

		if err != nil {
			return fmt.Errorf("insert poll option: %w", err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit create poll: %w", err)
	}

	return nil
}

// =========================
// UPDATE POLL
// =========================

func (r *Repository) UpdatePoll(
	pollID uint64,
	poll *Poll,
	options []string,
) error {
	tx, err := r.db.Begin()
	if err != nil {
		return fmt.Errorf("begin transaction: %w", err)
	}

	defer tx.Rollback()

	_, err = tx.Exec(`
		UPDATE polls
		SET
			question = ?,
			description = ?,
			is_active = ?
		WHERE id = ?
	`,
		poll.Question,
		poll.Description,
		poll.IsActive,
		pollID,
	)

	if err != nil {
		return fmt.Errorf("update poll: %w", err)
	}

	_, err = tx.Exec(`
		DELETE FROM poll_options
		WHERE poll_id = ?
	`, pollID)

	if err != nil {
		return fmt.Errorf("delete old poll options: %w", err)
	}

	for _, optionText := range options {
		_, err := tx.Exec(`
			INSERT INTO poll_options (
				poll_id,
				option_text
			)
			VALUES (?, ?)
		`, pollID, optionText)

		if err != nil {
			return fmt.Errorf("insert new poll option: %w", err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit update poll: %w", err)
	}

	return nil
}

// =========================
// DELETE POLL
// =========================

func (r *Repository) DeletePoll(pollID uint64) error {
	tx, err := r.db.Begin()
	if err != nil {
		return fmt.Errorf("begin transaction: %w", err)
	}

	defer tx.Rollback()

	_, err = tx.Exec(`
		DELETE FROM poll_votes
		WHERE poll_id = ?
	`, pollID)

	if err != nil {
		return fmt.Errorf("delete poll votes: %w", err)
	}

	_, err = tx.Exec(`
		DELETE FROM poll_options
		WHERE poll_id = ?
	`, pollID)

	if err != nil {
		return fmt.Errorf("delete poll options: %w", err)
	}

	result, err := tx.Exec(`
		DELETE FROM polls
		WHERE id = ?
	`, pollID)

	if err != nil {
		return fmt.Errorf("delete poll: %w", err)
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("get affected rows: %w", err)
	}

	if affected == 0 {
		return fmt.Errorf("poll tidak ditemukan")
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit delete poll: %w", err)
	}

	return nil
}

// =========================
// TOGGLE
// =========================

func (r *Repository) TogglePoll(pollID uint64) (bool, error) {
	var currentStatus bool

	err := r.db.QueryRow(`
		SELECT is_active
		FROM polls
		WHERE id = ?
	`, pollID).Scan(&currentStatus)

	if err != nil {
		if err == sql.ErrNoRows {
			return false, fmt.Errorf("poll tidak ditemukan")
		}

		return false, fmt.Errorf("get poll status: %w", err)
	}

	newStatus := !currentStatus

	_, err = r.db.Exec(`
		UPDATE polls
		SET is_active = ?
		WHERE id = ?
	`, newStatus, pollID)

	if err != nil {
		return false, fmt.Errorf("toggle poll: %w", err)
	}

	return newStatus, nil
}

// =========================
// VOTE
// =========================

func (r *Repository) HasVoted(
	pollID uint64,
	phone string,
) (bool, error) {
	var count int

	err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM poll_votes
		WHERE poll_id = ?
		AND customer_phone = ?
	`, pollID, phone).Scan(&count)

	if err != nil {
		return false, fmt.Errorf("check vote: %w", err)
	}

	return count > 0, nil
}

func (r *Repository) CreateVote(vote *PollVote) error {
	_, err := r.db.Exec(`
		INSERT INTO poll_votes (
			poll_id,
			option_id,
			customer_name,
			customer_phone,
			customer_email
		)
		VALUES (?, ?, ?, ?, ?)
	`,
		vote.PollID,
		vote.OptionID,
		vote.CustomerName,
		vote.CustomerPhone,
		vote.CustomerEmail,
	)

	if err != nil {
		return fmt.Errorf("create vote: %w", err)
	}

	return nil
}

func (r *Repository) FindVoteByID(id uint64) (PollVote, error) {
	var vote PollVote

	err := r.db.QueryRow(`
		SELECT
			id,
			poll_id,
			option_id,
			customer_name,
			customer_phone,
			customer_email
		FROM poll_votes
		WHERE id = ?
	`, id).Scan(
		&vote.ID,
		&vote.PollID,
		&vote.OptionID,
		&vote.CustomerName,
		&vote.CustomerPhone,
		&vote.CustomerEmail,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return vote, fmt.Errorf("vote tidak ditemukan")
		}

		return vote, fmt.Errorf("find vote: %w", err)
	}

	return vote, nil
}

// =========================
// RESULTS
// =========================

type PollResult struct {
	OptionID   uint64  `json:"option_id"`
	OptionText string  `json:"option_text"`
	VoteCount  int     `json:"votes"`
	Percentage float64 `json:"percentage"`
}

func (r *Repository) GetPollResults(pollID uint64) ([]PollResult, error) {
	rows, err := r.db.Query(`
		SELECT
			o.id,
			o.option_text,
			COUNT(v.id) AS vote_count
		FROM poll_options o
		LEFT JOIN poll_votes v
			ON v.option_id = o.id
		WHERE o.poll_id = ?
		GROUP BY
			o.id,
			o.option_text
		ORDER BY o.id ASC
	`, pollID)

	if err != nil {
		return nil, fmt.Errorf("get poll results: %w", err)
	}
	defer rows.Close()

	results := make([]PollResult, 0)

	var totalVotes int

	for rows.Next() {
		var result PollResult

		if err := rows.Scan(
			&result.OptionID,
			&result.OptionText,
			&result.VoteCount,
		); err != nil {
			return nil, fmt.Errorf("scan poll result: %w", err)
		}

		totalVotes += result.VoteCount

		results = append(results, result)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate poll results: %w", err)
	}

	if totalVotes > 0 {
		for i := range results {
			results[i].Percentage =
				(float64(results[i].VoteCount) / float64(totalVotes)) * 100
		}
	}

	return results, nil
}

// =========================
// VOTES
// =========================

func (r *Repository) FindVotesByPollID(pollID uint64) ([]PollVote, error) {
	rows, err := r.db.Query(`
		SELECT
			id,
			poll_id,
			option_id,
			customer_name,
			customer_phone,
			customer_email
		FROM poll_votes
		WHERE poll_id = ?
		ORDER BY created_at DESC
	`, pollID)

	if err != nil {
		return nil, fmt.Errorf("find poll votes: %w", err)
	}
	defer rows.Close()

	votes := make([]PollVote, 0)

	for rows.Next() {
		var vote PollVote

		if err := rows.Scan(
			&vote.ID,
			&vote.PollID,
			&vote.OptionID,
			&vote.CustomerName,
			&vote.CustomerPhone,
			&vote.CustomerEmail,
		); err != nil {
			return nil, fmt.Errorf("scan poll vote: %w", err)
		}

		votes = append(votes, vote)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate poll votes: %w", err)
	}

	return votes, nil
}

func (r *Repository) CountVotesByPollID(pollID uint64) (int, error) {
	var count int

	err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM poll_votes
		WHERE poll_id = ?
	`, pollID).Scan(&count)

	if err != nil {
		return 0, fmt.Errorf("count poll votes: %w", err)
	}

	return count, nil
}

// =========================
// STATISTICS
// =========================

type PollStatistics struct {
	TotalPolls  int `json:"total_polls"`
	ActivePolls int `json:"active_polls"`
	TotalVotes  int `json:"total_votes"`
	TodayVotes  int `json:"today_votes"`
}

func (r *Repository) GetStatistics() (PollStatistics, error) {
	var stats PollStatistics

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM polls
	`).Scan(&stats.TotalPolls); err != nil {
		return stats, fmt.Errorf("count total polls: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM polls
		WHERE is_active = 1
	`).Scan(&stats.ActivePolls); err != nil {
		return stats, fmt.Errorf("count active polls: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM poll_votes
	`).Scan(&stats.TotalVotes); err != nil {
		return stats, fmt.Errorf("count total votes: %w", err)
	}

	if err := r.db.QueryRow(`
		SELECT COUNT(*)
		FROM poll_votes
		WHERE DATE(created_at) = CURDATE()
	`).Scan(&stats.TodayVotes); err != nil {
		return stats, fmt.Errorf("count today votes: %w", err)
	}

	return stats, nil
}

func (r *Repository) attachResults(poll *Poll) error {
	results, err := r.GetPollResults(poll.ID)
	if err != nil {
		return err
	}

	poll.TotalVotes = 0
	poll.Options = make([]PollOption, 0, len(results))

	for _, result := range results {
		poll.TotalVotes += result.VoteCount

		poll.Options = append(poll.Options, PollOption{
			ID:         result.OptionID,
			PollID:     poll.ID,
			OptionText: result.OptionText,
			Votes:      result.VoteCount,
			Percentage: result.Percentage,
		})
	}

	return nil
}

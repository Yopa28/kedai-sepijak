package waiter

type Waiter struct {
	ID     uint64 `json:"id"`
	Name   string `json:"name"`
	Phone  string `json:"phone"`
	Status string `json:"status"`
}

type CreateWaiterRequest struct {
	Name   string `json:"name" binding:"required"`
	Phone  string `json:"phone"`
	Status string `json:"status"`
}

type UpdateWaiterRequest struct {
	Name   string `json:"name" binding:"required"`
	Phone  string `json:"phone"`
	Status string `json:"status"`
}

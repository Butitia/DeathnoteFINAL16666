package api

// KillRequestDto es lo que el cliente envía para crear o actualizar un kill
type KillRequestDto struct {
	PersonID    uint   `json:"person_id"`
	Description string `json:"description"`
}

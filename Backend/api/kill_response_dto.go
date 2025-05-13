package api

import "time"

// KillResponseDto es lo que la API devuelve al cliente
type KillResponseDto struct {
	ID          uint      `json:"id"`
	PersonID    uint      `json:"person_id"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

package api

import "time"

// PersonRequestDto representa los datos esperados al crear una persona
type PersonRequestDto struct {
	Name     string `json:"name" binding:"required"`
	Age      int    `json:"age"`
	PhotoURL string `json:"photo_url" binding:"required,url"`
}

// PersonResponseDto es la forma en que devolvemos una persona al cliente
type PersonResponseDto struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Age       int       `json:"age"`
	PhotoURL  string    `json:"photo_url"`
	CreatedAt time.Time `json:"created_at"`
}

// HealthResponse se usa en GET /api/health
type HealthResponse struct {
	Status string `json:"status"`
}

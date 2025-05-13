// models/kill.go
package models

import (
	"backend-avanzada/api"

	"gorm.io/gorm"
)

// Kill representa un registro de causa de muerte
type Kill struct {
	gorm.Model
	PersonID    uint   `gorm:"not null"`
	Description string `gorm:"not null"`
}

// ToKillResponseDto convierte Kill a su DTO JSON, incluyendo CreatedAt
func (k *Kill) ToKillResponseDto() *api.KillResponseDto {
	return &api.KillResponseDto{
		ID:          k.ID,
		PersonID:    k.PersonID,
		Description: k.Description,
		CreatedAt:   k.CreatedAt,
	}
}

package models

import (
	"backend-avanzada/api"

	"gorm.io/gorm"
)

// Person representa a una persona en la base de datos
type Person struct {
	gorm.Model
	Name     string `gorm:"not null"`
	Age      int
	PhotoURL string `gorm:"not null"`
}

// ToPersonResponseDto convierte Person a su DTO JSON
func (p *Person) ToPersonResponseDto() *api.PersonResponseDto {
	return &api.PersonResponseDto{
		ID:       p.ID,
		Name:     p.Name,
		Age:      p.Age,
		PhotoURL: p.PhotoURL,
	}
}

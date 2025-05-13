package repository

import (
	"backend-avanzada/models"

	"gorm.io/gorm"
)

// PersonRepository define las operaciones CRUD sobre personas
type PersonRepository interface {
	FindAll() ([]models.Person, error)
	FindByID(id uint) (*models.Person, error) // ← nuevo método
	Create(*models.Person) error
	Update(*models.Person) error
	Delete(id uint) error
}

type personRepo struct {
	db *gorm.DB
}

func NewPersonRepository(db *gorm.DB) PersonRepository {
	return &personRepo{db}
}

func (r *personRepo) FindAll() ([]models.Person, error) {
	var people []models.Person
	err := r.db.Find(&people).Error
	return people, err
}

func (r *personRepo) FindByID(id uint) (*models.Person, error) {
	var p models.Person
	err := r.db.First(&p, id).Error
	return &p, err
}

func (r *personRepo) Create(p *models.Person) error {
	return r.db.Create(p).Error
}

func (r *personRepo) Update(p *models.Person) error {
	return r.db.Save(p).Error
}

func (r *personRepo) Delete(id uint) error {
	return r.db.Delete(&models.Person{}, id).Error
}

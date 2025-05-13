package repository

import (
	"backend-avanzada/models"

	"gorm.io/gorm"
)

// KillRepository define las operaciones CRUD sobre kills
type KillRepository interface {
	FindAll() ([]models.Kill, error)
	FindByID(id uint) (*models.Kill, error) // ← nuevo método
	Create(*models.Kill) error
	Update(*models.Kill) error
	Delete(id uint) error
}

type killRepo struct {
	db *gorm.DB
}

func NewKillRepository(db *gorm.DB) KillRepository {
	return &killRepo{db}
}

func (r *killRepo) FindAll() ([]models.Kill, error) {
	var kills []models.Kill
	err := r.db.Find(&kills).Error
	return kills, err
}

func (r *killRepo) FindByID(id uint) (*models.Kill, error) {
	var k models.Kill
	err := r.db.First(&k, id).Error
	return &k, err
}

func (r *killRepo) Create(k *models.Kill) error {
	return r.db.Create(k).Error
}

func (r *killRepo) Update(k *models.Kill) error {
	return r.db.Save(k).Error
}

func (r *killRepo) Delete(id uint) error {
	return r.db.Delete(&models.Kill{}, id).Error
}

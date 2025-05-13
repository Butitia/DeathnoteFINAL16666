// repository/database.go
package repository

import (
	"backend-avanzada/config"
	"backend-avanzada/logger"
	"backend-avanzada/models"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// NewDatabase abre la conexión, comprueba el ping y auto-migra tus modelos.
func NewDatabase(cfg *config.Config) (*gorm.DB, error) {
	// 1) Construir y loggear el DSN
	dsn := cfg.DSN()
	logger.Info.Printf("🔌 Connecting to DB with DSN: %s", dsn)

	// 2) Abrir la conexión GORM
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("open db: %w", err)
	}

	// 3) Extraer la conexión SQL y hacer ping
	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("get sql.DB: %w", err)
	}
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("ping db: %w", err)
	}
	logger.Info.Println("✅ Database ping successful")

	// 4) Auto-migrate de tus tablas
	if err := db.AutoMigrate(&models.Person{}, &models.Kill{}); err != nil {
		logger.Error.Printf("AutoMigrate warning: %v", err)
	} else {
		logger.Info.Println("✅ AutoMigrate completed")
	}

	return db, nil
}

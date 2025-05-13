// server/server.go
package server

import (
	"backend-avanzada/config"
	"backend-avanzada/logger"
	"backend-avanzada/repository"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Run inicializa config, BD, router y arranca el servidor
func Run() {
	// 1) Carga configuración
	cfg, err := config.Load()
	if err != nil {
		logger.Error.Fatalf("load config: %v", err)
	}
	logger.Info.Printf("Config cargada: %+v", cfg)

	// 2) Conecta a la BD
	db, err := repository.NewDatabase(cfg)
	if err != nil {
		logger.Error.Fatalf("connect db: %v", err)
	}
	logger.Info.Println("Conectado a la base de datos")

	// 3) Crea router Gin y aplica CORS
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	// 4) Registra rutas y arranca
	RegisterRoutes(r, db)
	logger.Info.Printf("Escuchando en puerto %s", cfg.ServerPort)
	r.Run(":" + cfg.ServerPort)
}

package server

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend-avanzada/api"
	"backend-avanzada/repository"
)

// RegisterRoutes define todas las rutas y asocia cada handler con sus repositorios
func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	personRepo := repository.NewPersonRepository(db)
	killRepo := repository.NewKillRepository(db)

	apiGroup := r.Group("/api")
	{
		// Health-check
		apiGroup.GET("/health", func(c *gin.Context) {
			c.JSON(200, api.HealthResponse{Status: "ok"})
		})

		// PERSON routes
		apiGroup.GET("/people", getAllPeopleHandler(personRepo))
		apiGroup.POST("/people", createPersonHandler(personRepo, killRepo))
		apiGroup.PUT("/people/:id", updatePersonHandler(personRepo))
		apiGroup.DELETE("/people/:id", deletePersonHandler(personRepo))

		// KILL routes
		apiGroup.GET("/kills", getAllKillsHandler(killRepo))
		apiGroup.POST("/kills", createKillHandler(killRepo, personRepo))
		apiGroup.PUT("/kills/:id", updateKillHandler(killRepo))
		apiGroup.DELETE("/kills/:id", deleteKillHandler(killRepo))
	}
}

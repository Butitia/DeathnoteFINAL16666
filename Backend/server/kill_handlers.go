// server/kill_handlers.go
package server

import (
	"net/http"
	"strconv"

	"backend-avanzada/api"
	"backend-avanzada/models"
	"backend-avanzada/repository"

	"github.com/gin-gonic/gin"
)

// getAllKillsHandler retorna todos los registros de kills en JSON
func getAllKillsHandler(repo repository.KillRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		kills, err := repo.FindAll()
		if err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}
		var dtos []api.KillResponseDto
		for _, k := range kills {
			dtos = append(dtos, *k.ToKillResponseDto())
		}
		c.JSON(http.StatusOK, dtos)
	}
}

// createKillHandler crea un nuevo registro de kill y elimina la persona asociada
func createKillHandler(
	killRepo repository.KillRepository,
	personRepo repository.PersonRepository,
) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req api.KillRequestDto
		if err := c.ShouldBindJSON(&req); err != nil {
			ErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		// 1) Crear el registro de kill
		kill := &models.Kill{
			PersonID:    req.PersonID,
			Description: req.Description,
		}
		if err := killRepo.Create(kill); err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		// 2) Eliminar la persona de la tabla people
		if err := personRepo.Delete(req.PersonID); err != nil {
			// Kill ya creado, pero fallo al eliminar persona
			ErrorResponse(c, http.StatusInternalServerError, "Kill creado, pero no se pudo eliminar persona")
			return
		}

		// 3) Devolver la respuesta del kill creado
		c.JSON(http.StatusCreated, kill.ToKillResponseDto())
	}
}

// updateKillHandler edita un kill existente según su ID
func updateKillHandler(repo repository.KillRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("id")
		idUint, err := strconv.ParseUint(idParam, 10, 32)
		if err != nil {
			ErrorResponse(c, http.StatusBadRequest, "Invalid ID")
			return
		}

		var req api.KillRequestDto
		if err := c.ShouldBindJSON(&req); err != nil {
			ErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		existing, err := repo.FindByID(uint(idUint))
		if err != nil {
			ErrorResponse(c, http.StatusNotFound, "Kill not found")
			return
		}

		existing.PersonID = req.PersonID
		existing.Description = req.Description
		if err := repo.Update(existing); err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, existing.ToKillResponseDto())
	}
}

// deleteKillHandler elimina un kill por su ID
func deleteKillHandler(repo repository.KillRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("id")
		idUint, err := strconv.ParseUint(idParam, 10, 32)
		if err != nil {
			ErrorResponse(c, http.StatusBadRequest, "Invalid ID")
			return
		}

		if err := repo.Delete(uint(idUint)); err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		c.Status(http.StatusNoContent)
	}
}

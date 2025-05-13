// server/people_handlers.go
package server

import (
	"net/http"
	"strconv"
	"time"

	"backend-avanzada/api"
	"backend-avanzada/logger"
	"backend-avanzada/models"
	"backend-avanzada/repository"

	"github.com/gin-gonic/gin"
)

// getAllPeopleHandler retorna todas las personas en JSON
func getAllPeopleHandler(repo repository.PersonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		people, err := repo.FindAll()
		if err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}
		var dtos []api.PersonResponseDto
		for _, p := range people {
			dtos = append(dtos, *p.ToPersonResponseDto())
		}
		c.JSON(http.StatusOK, dtos)
	}
}

// createPersonHandler crea una nueva persona y programa la muerte por defecto en 40s
func createPersonHandler(
	personRepo repository.PersonRepository,
	killRepo repository.KillRepository,
) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req api.PersonRequestDto
		if err := c.ShouldBindJSON(&req); err != nil {
			ErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		person := &models.Person{
			Name:     req.Name,
			Age:      req.Age,
			PhotoURL: req.PhotoURL,
		}
		if err := personRepo.Create(person); err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}

		// Respondemos al cliente inmediatamente
		c.JSON(http.StatusCreated, person.ToPersonResponseDto())

		// Dispara en background la muerte por defecto
		go func(pid uint) {
			time.Sleep(40 * time.Second)

			// Si ya existe una causa manual, cancelamos
			kills, err := killRepo.FindAll()
			if err != nil {
				logger.Error.Printf("error listing kills: %v", err)
				return
			}
			for _, k := range kills {
				if k.PersonID == pid {
					return
				}
			}

			// Crear kill por defecto
			defaultKill := &models.Kill{
				PersonID:    pid,
				Description: "attack to the heart",
			}
			if err := killRepo.Create(defaultKill); err != nil {
				logger.Error.Printf("default kill failed for person %d: %v", pid, err)
			}
		}(person.ID)
	}
}

// updatePersonHandler edita una persona existente según su ID
func updatePersonHandler(repo repository.PersonRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("id")
		idUint, err := strconv.ParseUint(idParam, 10, 32)
		if err != nil {
			ErrorResponse(c, http.StatusBadRequest, "Invalid ID")
			return
		}

		var req api.PersonRequestDto
		if err := c.ShouldBindJSON(&req); err != nil {
			ErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		existing, err := repo.FindByID(uint(idUint))
		if err != nil {
			ErrorResponse(c, http.StatusNotFound, "Person not found")
			return
		}

		existing.Name = req.Name
		existing.Age = req.Age
		existing.PhotoURL = req.PhotoURL

		if err := repo.Update(existing); err != nil {
			ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, existing.ToPersonResponseDto())
	}
}

// deletePersonHandler elimina una persona por su ID
func deletePersonHandler(repo repository.PersonRepository) gin.HandlerFunc {
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

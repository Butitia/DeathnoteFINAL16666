package server

import "github.com/gin-gonic/gin"

// ErrorResponse unifica la forma de enviar errores JSON
func ErrorResponse(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"error": message})
}

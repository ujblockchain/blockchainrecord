package server

import (
	"log"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"golang.org/x/net/http2"
)

// Custom HTTP configuration
func RunServer(app *echo.Echo) {

	s := &http2.Server{
		MaxConcurrentStreams: 250,
		MaxReadFrameSize:     1048576,
		IdleTimeout:          10 * time.Second,
	}
	if err := app.StartH2CServer(":8080", s); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

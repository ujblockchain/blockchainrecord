package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/ujblockchain/blockchainrecord/server"
)

func main() {
	//init echo
	router := echo.New()

	router.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	// listen and serve on 0.0.0.0:8080
	server.RunServer(router)
}

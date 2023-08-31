package main

import (
	"github.com/labstack/echo/v4"
	asset "github.com/ujblockchain/blockchainrecord/constants"
	"github.com/ujblockchain/blockchainrecord/router"
	"github.com/ujblockchain/blockchainrecord/server"
)

func main() {
	//init echo
	app := echo.New()

	//render template path
	app.Renderer = asset.LoadTemplates()

	// load static asset
	asset.LoadAssets(app)

	//load router
	router.LoadRouters(app)

	// listen and serve on 0.0.0.0:8080
	server.RunServer(app)
}

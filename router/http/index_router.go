package http

import (
	"github.com/labstack/echo/v4"
	context "github.com/ujblockchain/blockchainrecord/controllers/context/pages"
)

func IndexRouter(app *echo.Echo) {

	//path to index page
	app.GET("/", context.IndexContext)
}

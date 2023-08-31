package router

import (
	"github.com/labstack/echo/v4"
	path "github.com/ujblockchain/blockchainrecord/router/http"
)

func LoadRouters(app *echo.Echo) {

	//path to index page
	path.IndexRouter(app)

}

package constants

import (
	"github.com/labstack/echo/v4"
)

//Handle asset loading
//including static files and templates

func LoadAssets(app *echo.Echo) {
	//Load asset
	app.Static("/asset", "./repository/assets")
	// optional load favicon
	//app.File("/favicon.ico", "images/favicon.ico")
}

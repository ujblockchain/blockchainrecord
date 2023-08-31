package context

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// context for index page
func IndexContext(c echo.Context) error {
	return c.Render(http.StatusOK, "index.html", map[string]interface{}{})
}

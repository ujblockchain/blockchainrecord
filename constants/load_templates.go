package constants

import "html/template"

// load templates from template paths using
// template render struct
//load templates function has access to TemplateRenderer since they belong to the same package

func LoadTemplates() *Template {

	// init render to locate template
	renderer := &Template{
		templates: template.Must(template.ParseGlob("repository/templates/*.html")),
	}

	return renderer
}

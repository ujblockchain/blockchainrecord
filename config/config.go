package config

import (
	"fmt"

	"github.com/spf13/viper"
)

// initialize viper
var config *viper.Viper

// Init is an exported method that takes the environment, starts the viper
//  lookup setup and returns the configuration struct.

func Init(env string) {
	var err error
	config = viper.New()

	// set config file format
	//required if file does not have an extension in its name
	config.SetConfigType("yaml")

	//set config name
	config.SetConfigName(env)

	//set part to find config
	config.AddConfigPath("../config/")
	config.AddConfigPath("config/")

	//check for error by trying to read file
	err = config.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
}

// set which environment type to read: development or production
func GetConfig(env string) *viper.Viper {

	//set environment
	Init(env)

	//return the config
	return config
}

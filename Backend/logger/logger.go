package logger

import (
	"log"
	"os"
)

var (
	Info  = log.New(os.Stdout, "INFO:  ", log.LstdFlags)
	Error = log.New(os.Stderr, "ERROR: ", log.LstdFlags|log.Lshortfile)
)

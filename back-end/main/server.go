package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Serve static files from the frontend/dist directory.
	fs := http.FileServer(http.Dir("C:/Users/iyanu/Desktop/Accu-Cite/TKO-Studios-Accu-Cite/front-end/dist"))
	http.Handle("/", fs)

	// Start the server.
	fmt.Println("Server listening on port 3000")
	log.Panic(
		http.ListenAndServe(":3000", nil),
	)
}

func homePageHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "hello world")
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		log.Panic(err)
	}
}

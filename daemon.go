package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gen2brain/beeep"
)

type Data struct {
	Search string `json:"search"`
	Found  string `json:"found"`
}

func main() {
	log.Printf("Starting daemon...")
	err := beeep.Notify("Intern", "Starting daemon...", "./icons/icon256.png")
	if err != nil {
		panic(err)
	}

	// Create a new HTTP server that listens on port 3000
	http.HandleFunc("/api/toast", func(w http.ResponseWriter, r *http.Request) {
		// Read the request body and print it to the console
		buf := make([]byte, r.ContentLength)
		r.Body.Read(buf)
		log.Printf(string(buf))

		jsonString := string(buf)
		var data Data
		err := json.Unmarshal([]byte(jsonString), &data)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}

		fmt.Println(data.Search)
		fmt.Println(data.Found)

		notify := data.Found
		if notify == "" {
			notify = "No results found"
		}

		err = beeep.Notify("Intern", notify, "./icons/icon256.png")

		if err != nil {
			fmt.Println("Error sending notification:", err)
		}
	})
	// Create a new HTTP server that listens on port 3000
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		// Read the request body and print it to the console
		buf := make([]byte, r.ContentLength)
		r.Body.Read(buf)
		log.Printf(string(buf))
	})

	log.Fatal(http.ListenAndServe(":3000", nil))
}

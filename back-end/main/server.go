package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Entry struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	// Connect to MySQL database
	db, err := sql.Open("mysql", "username:password@tcp(127.0.0.1:3306)/dbname")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Define handler to fetch entries
	http.HandleFunc("/entries", func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, name, email FROM entries")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		entries := []Entry{}
		for rows.Next() {
			var entry Entry
			if err := rows.Scan(&entry.ID, &entry.Name, &entry.Email); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			entries = append(entries, entry)
		}

		// Convert entries to JSON and send response
		json.NewEncoder(w).Encode(entries)
	})

	// Start the server
	fmt.Println("Server listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

package main

import (
    "fmt"
    "net/http"
    "database/sql"
    "github.com/go-sql-driver/mysql"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello Go Application!")
    })

    http.HandleFunc("/greet/", func(w http.ResponseWriter, r *http.Request) {
        name:= r.URL.Path[len("/greet/"):]
            fmt.Fprintf(w, "Hello %s\n", name)
    })

    http.ListenAndServe(":9990", nil)
    
    db, err := sql.Open("mysql", "tko:g0Valp0!@tcp(dimsum@valpo.edu:9990)/full_stack
    
    if err != nil {
    	panic(err.Error())
    }
    
    defer db.Close()
}

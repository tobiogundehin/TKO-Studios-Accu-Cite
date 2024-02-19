package main

import (
    "fmt"
    "net/http"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
   // "log" 
    //"context"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello Go Application")
    })

    http.HandleFunc("/greet/", func(w http.ResponseWriter, r *http.Request) {
        name:= r.URL.Path[len("/greet/"):]
            fmt.Fprintf(w, "Hello %s\n", name)
    })

    
    db, err := sql.Open("mysql", "tko:g0Valp0!@tcp(dimsum.valpo.edu:3306)/full_stack")
    
    if err != nil {
    	panic(err.Error())
    }
    
    
    /*query := "INSERT INTO 'user' ('name', 'permissions') VALUES (TEST, TEST)"
    insertResult, err := db.ExecContext(context.Background(),query, "John", "Doe")
if err != nil {
    log.Fatalf("impossible insert user: %s", err)
}
id, err := insertResult.LastInsertId()
if err != nil {
    log.Fatalf("impossible to retrieve last inserted id: %s", err)
}
log.Printf("inserted id: %d", id) */

   /* insert, err:= db.Query("INSERT INTO 'user'('name', 'permissions') VALUES ('TEST', 'TEST')")
    
    if err != nil{
    	panic(err.Error())
    	}
    	
    defer insert.Close() */
    // addAlbum adds the specified album to the database,
// returning the album ID of the new entry

/*func addData(err Album) (int64, error) {
    result, err := db.Exec("INSERT INTO user (name, permissions) VALUES (?, ?)", user.name, user.permissions)
    if err != nil {
        return 0, fmt.Errorf("addData: %v", err)
    }
    id, err := result.LastInsertId()
    if err != nil {
        return 0, fmt.Errorf("addData: %v", err)
    }
    return id, nil
} */

    defer db.Close()
    
    http.ListenAndServe(":9990", nil)
}

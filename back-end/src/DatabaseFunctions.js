//const EntryAPI = require('./EntryAPI');

/*class DatabaseFunctions {

    constructor(){
        this.EntryAPI = new EntryAPI();
    }

    async connect(){
        this.connection = await mysql.createConnection({
            host: "localhost",
            port: 8080,
            user: "root",
            password: "g0Valp0!",
            database: "full_stack",
        });
        return this.connection;
    }

    async disconnect(){
        return this.connection.end();
    }

    async getEntries(){
        return this.connection.query("SELECT * FROM entries");
    } /*

   /* async driver() {
        console.info("Connection to MySQL");
        console.time("redis-connect");
        const connection = this.connect();
        if (connection) {
            console.info("Successfully connected to MySQL");
        } else {
            throw new Error("Connecting to MySQL failed");
        }
        console.timeEnd("MySQL-connect");

        console.info("Inserting into MySQL");
        console.time("MySQL-insert");
        const insertResult = await this.insert();
        console.timeEnd("MySQL-insert");

        console.info('Inserted ${insertResult[0].affectedRows} documents into MySQL');

        console.info("Querying MySQL");
        console.time("mysql-find");
        const result = await this.getEntries();
        const row = result[0][0];
        console.timeEnd("mysql-find");

        console.info("Disconnecting from MySQL");
        console.time("mysql-disconnect");
        await this.disconnect();
        console.timeEnd("mysql-disconnect");
        return row;
        } */
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: "localhost",
            port: 8080,
            user: "root",
            password: "g0Valp0!",
            database: "full_stack",
          });
        
        
          con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM entries", function (err, result, fields) {
              if (err) throw err;
              return console.log(result);
            });
          });

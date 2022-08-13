const express = require("express");
const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_mysql",
});

// connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected.");
});

const app = express();

// create db
app.get("/create-db", (req, res) => {
  let sql = "CREATE DATABASE node_mysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created.");
  });
});

// create table
app.get("/create-posts-table", (req, res) => {
  let sql =
    "CREATE TABLE posts (id INT AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created.");
  });
});

// insert post 1
app.get("/add-post1", (req, res) => {
    let post = {title: "Post One", body: "This is my first post."}
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post one added.");
    })
})

// insert post 2
app.get("/add-post2", (req, res) => {
    let post = {title: "Post Two", body: "This is my second post."}
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post two added.");
    })
})

// select posts
app.get("/get-posts", (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send("Posts fetched.");
    })
})

// select single post
app.get("/get-post/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post fetched.");
    })
})

// update post
app.get("/update-post/:id", (req, res) => {
    let newTitle = 'Updated Title'
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post updated.");
    })
})

// delete post
app.get("/delete-post/:id", (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Post deleted.");
    })
})

app.listen("5000", () => {
  console.log("Server started at port 5000.");
});

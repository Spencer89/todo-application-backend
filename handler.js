const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");


const app = express();

app.use(cors());
app.use(bodyParser.json());
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todolist"
})


//GET - COMPLETE
app.get("/tasks", function (req, res) {


  const query = "SELECT * FROM postits;"
  connection.query(query, function (error, data) {
    if (error) {
      console.log("Error fetching tasks", error);
      res.status(500).json({
        error: error
      })
    } else {
      res.status(200).json({
        tasks: data
      })
    }
  });

});


//DELETE
//app.delete("/tasks/:taskId", function (request, response) {

//const taskId = request.params.taskId

const query = "DELETE FROM postits (postitText, userId, completed) VALUES (?, ?, ?);";
connection.query(query, function (error, data) {
  if (error) {
    console.log("Error deleting tasks", error);
    response.status(500).json({
      error: error
    })
  } else {
    response.status(201).json({
      tasks: data
    })
  }
});


  



  //const someResponse = { message: `You have issued a delete request for takd Id ${taskId}` }
 // response.json(someResponse);

//});



//POST
app.post("/tasks", function (req, res) {
  const query = "INSERT INTO postits (postitText, userId, completed) VALUES (?, ?, ?);";
  const querySelect = "SELECT * FROM postits WHERE postitId = ?"

  connection.query(query,
    [req.body.postitText, req.body.userId, req.body.completed], function (error, data) {
      if (error) {
        console.log("Error creating task", error)
        res.status(500).json({ error: error })
      }
      else {
        connection.query(querySelect, [data.insertId], function (error, data) {
          if (error) {
            console.log("Error creating task", error)
            res.status(500).json({ error: error })
          }
          else (
            res.status(201).json({ task: data })
          )
        })
      }
    })

});

//PUT
app.put("/tasks/:taskId", function (request, response) {


  const taskIdToBeUpdated = request.params.taskId
  const someResponse = { message: `You have issued a put request for task ${taskIdToBeUpdated}` }

  response.json(someResponse);

});



module.exports.tasks = serverless(app);

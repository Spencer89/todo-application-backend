const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todolist"
})

const app = express();

app.use(cors());
app.use(bodyParser.json());


//GET - COMPLETE
app.get("/tasks", function (req, res) {

  //const hardCodedTasks = [
  // { text: "water plants", completed: true, date: "2020-04-04", id: 1 },
  // { text: "do dishes", completed: true, date: "2020-04-04", id: 2 },
  //{ text: "buy oats", completed: true, date: "2020-04-04", id: 3 }]

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

  //res.status(200).send(hardCodedTasks);
});


//DELETE
app.delete("/tasks/:taskId", function (request, response) {

  const taskId = request.params.taskId
  const someResponse = { message: `You have issued a delete request for takd Id ${taskId}` }

  response.json(someResponse);

});



//const body = {postitText:"Go to Tesco",
// userId: 1,
//completed: false};

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
       connection.query(querySelect, [data.insertId], function(error,data){
         if(error){console.log("Error creating task", error)
         res.status(500).json({ error: error })}
         else(
           res.status(201).json({task:data})
         )
       })    
       }
    })

  //const taskToAdd = req.body;
  //res.json({ message: "You have added a task", task: taskToAdd, taskText: taskToAdd.text });

});

//PUT
app.put("/tasks/:taskId", function (request, response) {


  const taskIdToBeUpdated = request.params.taskId
  const someResponse = { message: `You have issued a put request for task ${taskIdToBeUpdated}` }

  response.json(someResponse);

});



module.exports.tasks = serverless(app);

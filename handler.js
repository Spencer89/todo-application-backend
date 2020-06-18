const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(cors());
app.use(bodyParser.json());


//GET - COMPLETED
app.get("/tasks", function (req, res) {
  const hardCodedTasks = [{ text: "water plants", completed: true, date: "2020-04-04", id: 1 },
  { text: "do dishes", completed: true, date: "2020-04-04", id: 2 },
  { text: "buy oats", completed: true, date: "2020-04-04", id: 3 }]

  res.status(200).send(hardCodedTasks);
});


//DELETE
app.delete("/tasks/:taskId", function (request, response) {

  const taskId = request.params.taskId
  const someResponse = { message: `You have issued a delete request for takd Id ${taskId}` }

  response.json(someResponse);

});

//POST
app.post("/tasks", function (req, res) {
  const taskToAdd = req.body;
  res.json({ message: "You have added a task", task: taskToAdd, taskText: taskToAdd.text });

});

//PUT
app.put("/tasks/:taskId", function (request, response) {

  const taskIdToBeUpdated = request.params.taskId
  const someResponse = { message: `You have issued a put request for task ${taskIdToBeUpdated}`}

  response.json(someResponse);

});



module.exports.tasks = serverless(app);

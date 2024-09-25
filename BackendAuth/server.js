const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const cors=require("cors")
const errorHandler = require("./middlewares/errorHandler");
const app = express();

mongoose
  .connect("mongodb+srv://miniproject1729:miniproject1729@cluster0.ylskpxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));

  app.use(cors({
    origin: 'https://improved-system-wrgvwv79r4p62v6j-8081.app.github.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json()); 
app.use("/", router);
app.use(errorHandler);
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
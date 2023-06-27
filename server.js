const express = require("express");
const connectDB = require("./backend/config/db");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;
const STATUS = "development";

console.log(process.env.test);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Router
app.use("/api/user", require("./backend/routes/userRoutes"));

app.listen(PORT, () => console.log(`Server started succesfully on ${PORT}`));

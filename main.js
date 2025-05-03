const express = require("express");
const connectToDb = require("./db/db");
const filmRouter = require("./routes/film.router");
const directorrouter = require("./routes/director.router");
const authRouter = require("../lec5/auth/auth.route");

const app = express();

connectToDb();

app.use(express.json());

app.use("/films", filmRouter)
app.use("/directors", directorrouter)
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.send("hello");
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

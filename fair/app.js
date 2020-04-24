const express = require("express");
const app = express();

app.use(express.json());
const planRouter = require("./router/planRouter");
const userRouter = require("./router/userRouter");
const viewRouter = require("./Router/viewRouter");

app.use(express.static("public"));  // this enables to send all the static files like js, images, css etc 
// templating engine 
app.set("view engine", "pug");
// templating address 
app.set("views","views");

app.use("/", viewRouter);
app.use("/api/plans", planRouter)
app.use("/api/users", userRouter)
// wildcard
app.use("*", function (req, res) {
  return res.status(404).json({
    status: "Resource not found",
  });
});

app.listen(3000, function () {
  console.log("Server is listening at port 3000");
});
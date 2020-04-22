const express = require("express");
const app = express();

app.use(express.json());
const planRouter = require("./router/planRouter");
const userRouter = require("./router/userRouter");

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
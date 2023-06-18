const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

//Database Connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database Connected Successfully`);
});

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");



//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());


//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

app.get('/', (req, res) => {
  res.send('Welcome to Doctors Appointment system');
})  

// static files
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
// });

// static file
// app.get('/', (req, res) => {
//   app.use(express.static(path.join(__dirname, 'frontend', 'build')))
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});

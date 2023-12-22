const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRouter = require('./app/routes/userRoute')
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/// db connection
mongoose
    .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to database.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });



// simple route
app.get("/", (req, res) => {
    //   res.json({ message: "Welcome to bezkoder application." });
    res.send("Welcome to our application.");
});

app.use('/api',userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
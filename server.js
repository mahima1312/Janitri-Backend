const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
const{DB_USER,DB_PASSWORD}=process.env

const MONGO_URI=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mahima.onx09.mongodb.net/?retryWrites=true&w=majority&appName=mahima`
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

connectDB()


// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/heartrate", require("./routes/heartRateRoutes"));



const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send("Internal Server Error");
});




// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
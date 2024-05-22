const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const userDataRoutes = require('./routes/UserData.route');
const userRoutes =require("./routes/User.routes")


dotenv.config(); 

const PORT = process.env.PORT || 4000;
database.connect();
 
app.use(express.json());
app.use(cookieParser()); 

app.use(
  cors({
    origin: "https://garud-class-frontend--theta.vercel.app/",
    credentials: true,
    maxAge: 14400,
  })
); 


app.use("/api/v1/auth", userRoutes);
app.use('/api/v1/userdata', userDataRoutes);



app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  }); 
}); 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});
 
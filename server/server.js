require("dotenv").config();
const express  = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth_router");
const contactRoute = require("./router/contact_router");
const serviceRoute = require("./router/service_router");
const connectDb = require('./utils/db');
const errorMiddleware = require("./middleware/error_middelware");


//LETS TACKLE CORS
const  corsOptions = {
    origin: "http://localhost:5173", 
    method : "GET, POST, PUT, DELETE, PATCH, HEAD", 
    credentials: true,
}
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);

app.use("/api/data", serviceRoute);

app.use(errorMiddleware);

const PORT = 5000;
 
connectDb().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is runnning on port: ${PORT}`);
    });
})
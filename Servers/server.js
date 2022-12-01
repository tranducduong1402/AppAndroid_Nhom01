import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import cors from "cors"
dotenv.config(); // khoi tao bien moi truong
connectDatabase(); // ham ket noi den database

const app = express();// khoi famre work epress
app.use(express.json());// su dung  json trong node
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// cau hinh swagger
const option ={
  definition:{
    openapi:"3.0.0",
    info: {
      title:"Library API",
      version:"1.0.0",
      description:"A simple Express Library API"
    },
    server:[
      {
        url:"http://localhost:5000"
      }
    ],
  },
  apis:["./Routes/*.js"]
}
const specs = swaggerJsDoc(option)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// API
// khoi tao url
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

// process.env.
const PORT = process.env.PORT || 1000;

// Server chay tren port
app.listen(PORT, console.log(`server run in port ${PORT}`));

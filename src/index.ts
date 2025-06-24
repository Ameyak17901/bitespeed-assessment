import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/contact.route";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/contact", contactRoutes);

app.listen(8080, () => {
  console.log("Server is running on localhost:8080");
});

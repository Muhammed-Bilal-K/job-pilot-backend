import { app } from "./frameworks/config/app";
import connectDb from "./frameworks/config/db";
import http from "http";
require("dotenv").config();
import { startListening } from "./frameworks/rabbitmq/middleware";
import SocketIORepository from "../src/repositories/socketRepository";

const server = http.createServer(app);
new SocketIORepository(server);
setTimeout(() => {
  startListening();
}, 20000);

connectDb();

// create server
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`Server running ${PORT} | Chat`);
  console.log(`Chat started....`);
});

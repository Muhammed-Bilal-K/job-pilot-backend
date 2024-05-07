require("dotenv").config();
import { app } from "./frameworks/config/app";
import connectDb from "./frameworks/config/db";
import { startListening } from "./frameworks/rabbitmq/middleware";

setTimeout(()=>{
  startListening();
},20000)
connectDb();

// create server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('..starting..job..');
  console.log(`Server running ${PORT} | Job`);
});

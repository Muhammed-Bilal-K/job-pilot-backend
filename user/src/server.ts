import { app } from "./frameworks/config/app";
import connectDb from "./frameworks/config/db";
require("dotenv").config();
import { startListening } from "./frameworks/rabbitmq/middleware";

setTimeout(()=>{
  startListening();
},20000)

connectDb();

// create server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log('user updated.');
  console.log(`Server running ${PORT} | User`);
});

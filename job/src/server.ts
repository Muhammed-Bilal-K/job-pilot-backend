import { app } from "./frameworks/config/app";
import connectDb from "./frameworks/config/db";
require("dotenv").config();

connectDb();

// create server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running ${PORT} | Job`);
});

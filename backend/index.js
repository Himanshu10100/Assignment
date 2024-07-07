const app = require("./app");
const connectDB = require("./config/connect");
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`server running on ${PORT} PORT`);
});

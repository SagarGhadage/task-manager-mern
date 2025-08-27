require("dotenv").config();
const app = require("./app");
const config = require("./config/config");
const {sequelize} = require("./config/database");
const PORT=config.port || 3000;

// Sync database and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true }); // Sync models with the database
    console.log("Models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(PORT,()=>{
  console.log("Server Listening at", PORT);
})

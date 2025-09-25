const mongoose = require("mongoose");

 mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected Successfully.");
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

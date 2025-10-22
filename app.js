const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Server running smoothly ",
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Portfolio running at http://localhost:${PORT}`);
  });
}

module.exports = app;

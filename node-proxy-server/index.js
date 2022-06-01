const express = require("express");
var cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = 3080;

const options = {
  target: "http://localhost:3000/",
  pathRewrite: {
    "^/example": "",
  },
};
const exampleProxy = createProxyMiddleware(options);
const app = express();
app.use(cors());

app.use(["/example", "/_next", "/static"], exampleProxy);

app.get("/api/pets", (req, res) => {
  res.json(["cat", "dog", "bird"]);
});

app.get("/api/birds", (req, res) => {
  res.json(["finch", "robin", "magpie"]);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use("/img", express.static("img"));
app.use("/css", express.static(path.join(__dirname, "css/out")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

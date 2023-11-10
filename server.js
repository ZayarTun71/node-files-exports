const app = require("./app");

const port = 9002;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});

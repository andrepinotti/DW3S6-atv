const express = require("express");
const app = express();
const salasRoute = require("./routes/salasRoute.js");

app.use(express.json());
app.use(salasRoute);

app.listen(3000, () => {
    console.log("Listening at port 3000");
});



//module.exports = router
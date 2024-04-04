const express = require("express");
const app = express();
const path =require('path')


require("dotenv/config");
const bodyparser = require("body-parser");
require("./db/database").connect();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Controll-Allow-Headers", 'Content-Type');
    res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})
app.use(bodyparser.json());
const subjectController = require("./controllers/subjectController")


const admin=require("./routes/admin")
const  userController=require("./routes/userController")

app.use("/admin",admin)
app.use("/",userController)


app.use(express.static(path.resolve + './uploads'));
app.use("/uploads", express.static(path.resolve("./uploads")));


app.get(
    "/getSubject",
    subjectController.getSubject
);
app.post(
    "/addSubject",
    subjectController.addSubject
);
app.put(
    "/updateSubject/:id",
    subjectController.updateSubject
)
app.delete(
    "/deleteSubject/:id",
    subjectController.deleteSubject
)



app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})

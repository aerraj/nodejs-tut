//jshint esversion:6

const express = require("express");
const {connectMongoDb}=require("./connection")
const userRouter=require("./routes/user")
const {logReqRes}=require("./middlewares")

const app = express();
const PORT=8000



//connection with mongoose

connectMongoDb("mongodb+srv://rishabh:rraj0046@employee-cluster.bsio1ij.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("Mongodb Connected"))
//middleware
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("Hello from Middle ware")
    next();
})
app.use(logReqRes("log.txt"));

app.use("/api/user",userRouter);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});

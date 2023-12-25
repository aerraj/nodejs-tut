//jshint esversion:6

const express = require("express");
const fs=require("fs")
const users=require("./MOCK_DATA.json")
const app = express();
const PORT=8000


app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log("Hello from Middle ware")
    next();
})
app.use((req, res, next) => {
    fs.appendFile("log.txt",`Request time :${Date.now()}:${req.method}:${req.path} \n`,(err,data)=>{
        next();
    })
})


app.get("/users", (req, res) => {
    const html = `<ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html)
})

app.get("/", (req, res)=>{
  res.send("Hello");
});
app.get("/api/users",(req,res)=>{
    return res.json(users);
})

app.post("/api/users",(req,res)=>{
    //create a new user
    const body=req.body
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title)
   { return  res.status(400).json({status:"field missing"})
}
    users.push({...body,id:users.length+1})
    // console.log('Body',body)
    fs.writeFile("MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
        return res.status(201).json({ status: "success",id:users.length})
    })
    
})
app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    if(!user)
    return res.status(404).json({error:"user id invalid or does not exist"})
    return res.json(user)
})
.patch((req,res)=>{
    //edit an existing user
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id)
    const updatedUser = { ...user, ...body };
    updatedUser.id=id;
    users[id-1]=updatedUser

    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", updatedUser })})

})
.delete((req,res)=>{
    //delete user with an existing id
    const id = Number(req.params.id)  
   const usersDel = users.filter(user => user.id !== id);
    fs.writeFile('MOCK_DATA.json', JSON.stringify(userDel), (err, data) => {
        return res.json({ status: "Success" })
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});





const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.send("Hello from Home page "+ req.query.name+"you are "+req.query.age)
})
app.get('/about',(req,res)=>{
    res.send("This is Rishabh's server.")
})
app.listen(8000, () => console.log("Server listening on port 8000"))

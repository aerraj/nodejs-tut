//jshint esversion:6

const express = require("express");
const mongoose=require("mongoose");
const app = express();
const PORT=8000



//connection with mongoose
mongoose.connect("mongodb+srv://rishabh:rraj0046@employee-cluster.bsio1ij.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("MongoDB Connected")).catch((err)=>console.log("Error detected",err))


//define the schema
const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    job_title:
    {
        type:String,
    },
    gender:{
        type:String,
    }
},
{
    timestamps:true
})


//making a model
const User=mongoose.model("user",userSchema)

//middleware
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


app.get("/users", async (req, res) => {
    const allDbUsers=await User.find({});
    const html = `<ul>
      ${allDbUsers.map((user) => `<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>`
    res.send(html)
})

app.get("/", (req, res)=>{
  res.send("Hello");
});
app.get("/api/users", async (req,res)=>{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
    
})

app.post("/api/users", async (req,res)=>{
    //create a new user
    const body=req.body
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title)
   { return  res.status(400).json({status:"field missing"})
}
   const result=await User.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    gender:body.gender,
    job_title:body.job_title

   })
   console.log("result",result)
   return res.status(201).json({msg:"success"})
    
})
app
.route("/api/users/:id")
.get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user)
    return res.status(404).json({error:"user id invalid or does not exist"})
    return res.json(user)
})
.patch(async(req,res)=>{
    //edit an existing user
    const id = req.params.id;
    const body = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }

        // Check for changed properties and update only those that exist in the request body
        Object.keys(body).forEach((key) => {
            if (user[key] !== undefined) {
                user[key] = body[key];
            }
        });

        await user.save();

        return res.json({ status: 'Success', updatedUser: user });
    } catch (err) {
        return res.status(500).json({ status: 'Error', message: 'Internal server error' })}

})
.delete(async(req,res)=>{
    //delete user with an existing id

  await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success"})
        
 
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});




/* const updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }

        // Check for changed properties and update only those that exist in the request body
        Object.keys(body).forEach((key) => {
            if (user[key] !== undefined) {
                user[key] = body[key];
            }
        });

        await user.save();

        return res.json({ status: 'Success', updatedUser: user });
    } catch (err) {
        return res.status(500).json({ status: 'Error', message: 'Internal server error' }); */

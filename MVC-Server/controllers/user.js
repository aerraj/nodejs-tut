const User=require("../models/user")



async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}


async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(404).json({ error: "user id invalid or does not exist" })
    return res.json(user)
}


async function handleUpdateUserById(req,res){
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
        return res.status(500).json({ status: 'Error', message: 'Internal server error' })
    }

}



async function handleCreateNewUser(req,res){
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ status: "field missing" })
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title

    })
    console.log("result", result)
    return res.status(201).json({ msg: "success",id:result._id })
}


async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" })

}



module.exports = { handleGetAllUsers, handleGetUserById, handleUpdateUserById,handleDeleteUserById,handleCreateNewUser}
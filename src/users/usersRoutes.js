const router = require("express").Router()
const usersModel = require("./usersModel")

router.post('/api/user', async (req, res) => {
    try {
        const newUser = new usersModel({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            date: Date.now()
        })
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } catch (err) {
        res.json(err)
    }
})

router.get('/api/users', async (req, res) => {
    try {
        const allUsers = await usersModel.find({})
        res.status(200).json(allUsers)
    } catch (e) {   
        res.json(err)
    }
})

router.put('/api/user/:id', async (req, res) => {
    try {
        const updateUser = await usersModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        res.status(200).json(updateUser)
    } catch (e) {
        res.json(e)
    }
})

router.delete('/api/user/:id', async (req, res) => {
    try {
        const deleteUser = await usersModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted")
    } catch (e) {
        res.json(e)
    }
})

module.exports = router
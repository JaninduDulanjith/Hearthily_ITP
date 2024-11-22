const router = require('express').Router();
const Employee = require('../models/EemployeeRegister');

router.get('/', async (req, res) => {
    try {
        const users = await Employee.find({});
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

router.get('/getUser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Employee.findById(id);
        res.json(user);
    } catch (err) {
        res.json(err);
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Employee.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

router.post('/createUser', async (req, res) => {
    try {
        // Check if the empNumber already exists
        const existingEmployee = await Employee.findOne({ empNumber: req.body.empNumber });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Duplicate empNumber. Please choose a unique empNumber.' });
        }
        
        // Create the user if empNumber is unique
        const newUser = await Employee.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateUser/:id', async (req, res) => {
    const id = req.params.id;
    const updatedUserData = req.body;
    try {
        const updatedUser = await Employee.findByIdAndUpdate(id, updatedUserData, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;

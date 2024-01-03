// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3303;
const SECRET_KEY = 'JEEVAN'; // Replace with a secure secret key for JWT

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Hashed password
  phone: String,
});

const createUserSchema=new mongoose.Schema({
  name:String,
  email:String,
  phone:Number,
  gender:String,
  aboutCompany:String,
  city:String,
  state:String
})

const addedUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const User = mongoose.model('user', userSchema);

const CreateUser=mongoose.model('newUser',createUserSchema)

const AddedUser = mongoose.model('addedUser', addedUserSchema);

app.use(bodyParser.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Token is missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token', message: err.message });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { name, email,phone,gender,aboutCompany,city,state,password } = req.body;
    const existingUser = await CreateUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new CreateUser({  name, email,phone,gender,aboutCompany,city,state,password });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

app.get('/get-users',async(req,res)=>{
  try {
    const users = await AddedUser.find();
    res.json(users);
  } catch (error) {
    res.send(error.message)
    res.status(500).json({ error: 'Error fetching users' });
  }
})

app.get('/',(req,res)=>{
    res.send('server running')
})

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'No User Found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
      console.log("passwrong")
    }
    const jwt_token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ jwt_token });
    console.log("login successful")
  
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Create a new user
app.post('/add-users', verifyToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const existingUser = await AddedUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const newAddedUser = new AddedUser({ name, email, phone });
    const savedUser = await newAddedUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error creating user' });
  }
});


// Read all users
app.get('/users',async (req, res) => {
  try {
    const users = await AddedUser.find();
    res.json(users);
  } catch (error) {
    res.send(error.message)
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Read a user by ID
app.get('/users/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Update a user by ID
app.put('/users/:userId', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by ID
app.delete('/users/:userId', verifyToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Import necessary modules
const express = require("express");  // Express framework for building the app
const mongoose = require("mongoose");  // Mongoose for MongoDB interactions
const cors = require("cors");  // CORS middleware to enable cross-origin requests
const bcrypt = require("bcrypt");  // Bcrypt for hashing passwords
const jwt = require("jsonwebtoken");  // JWT for token-based authentication
const mytokenchecker=require("./middlewares/MyTokenChecker")
// Import models and validation middleware
// const signupValidation = require ('./middlewares/MyValidator')  // (commented out) path to the validation middleware for signup
const UserModel = require("./models/User");  // User model for interacting with the user collection
const AccountModel = require("./models/Accounts");  // Account model for interacting with account collection
const { signinValidation, signupValidation } = require("./middlewares/myvalidator");  // Validation middleware for signin and signup
// Create an Express app instance
const app = express();
// Use middlewares to handle JSON parsing and CORS
app.use(express.json());  // Automatically parse JSON in request bodies
app.use(cors());  // Enable Cross-Origin Resource Sharing for all routes
//////////////////////////////start of send SMS /////////////////////////////////////////
const twilio = require('twilio');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
//https://console.twilio.com/us1/develop/onboarding-v2/
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
// server.js

// POST endpoint to send SMS
app.post('/send-sms', (req, res) => {
  const { cphone, msg } = req.body;

  // Check if both fields are provided
  /*
  if (!cphone || !msg) {
    return res.status(400).json({ message: 'Phone number and message are required' });
  }
  */
  client.messages
    .create({
      body: msg,        // The message content
      from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
      to: cphone,               // Recipient's phone number
    })
    .then((message) => {
      console.log('Message sent:', message.sid);
      res.status(200).json({ message: 'SMS sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ message: 'Error sending SMS', error: error.message });
    });
});
//////////////////////////////end of send SMS /////////////////////////////////////////


//////////////////////// start of send email/////////////////////////////////////
const nodemailer = require('nodemailer');
// Create a Nodemailer transporter (using Gmail in this example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
app.post('/send-email', (req, res) => {
  const { name, email, msg } = req.body;

    const mailOptions = {
    from: process.env.EMAIL_USER,  // Use the email from the environment
    to: email,  // Send email to the recipient
    subject: `Message from ${name} (${email})`,
    text: msg,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);  // Log the error to the server
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }

    console.log('Email sent:', info);  // Log success information to the server
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

////////////////////////end of send email/////////////////////////////////////

// Connect to MongoDB database using Mongoose
// Connection string: localhost, database named "mydb"
mongoose.connect("mongodb://127.0.0.1:27017/mydb");
app.post("/", (req, res) => {
  res.send("Welcome to the LGU Bank"); 
});
// Route to handle user registration
app.post("/register", signupValidation, (req, res) => {
  // Extract name, email, and password from request body
  const { name, email, password } = req.body;
  
  // Hash the password with bcrypt (10 rounds of salting)
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      // Create new user with hashed password
      UserModel.create({ name, email, hashedPassword })
        .then(users => res.json(users))  // Return created users as JSON
        .catch(err => res.json(err));  // Return error if user creation fails
    })
    .catch(err => res.json(err));  // Return error if password hashing fails
});
app.post("/login",signinValidation, (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      //console.log("usssser" + user)
      //if user exist
      if (user) {
        const isPasswordEqual= bcrypt.compare(password, user.password)
        console.log ("sattar" + isPasswordEqual)
        if (isPasswordEqual) {       
        //mongo password===frm password
       // if (user.password === password) {
            
            const jwtToken = jwt.sign(
              { email: user.email, _id: user._id },  // Payload with user details
              process.env.JWT_SECRET_KEY,  // Secret key for signing the token
              { expiresIn: "24h" }  // Token expires in 24 hours
            );
            
            res.status(200).json({
              message: "success",
              jwtToken,
              email,
              name: user.name
            });
          
          res.json("success")
        }
        else {
          res.json("Password is incorrect")
        }
      }
      else {
        res.json("User does not exist")
      }
    })
    .catch(err => res.json(err))
})
// Route to handle the home endpoint (for testing)
app.get("/home",mytokenchecker,(req, res) => {
  console.log("welcome");  // Log a message to the console
  res.send("Welcome to the Home Page");  // Send a simple response to the client
});

// Route to handle withdrawal transactions
app.post("/withdrawal", async (req, res) => {
  const { account, amount } = req.body;
  
  // Parse the amount as a floating-point number
  const parsedAmount = parseFloat(amount);
  
  // Perform the withdrawal operation by decrementing the account balance
  const result = await AccountModel.updateOne(
    { account: account },  // Find the account with the provided account ID
    { $inc: { balance: -parsedAmount } }  // Decrease the balance by the withdrawal amount
  );
  
  // Send an appropriate response (you can add more error handling here if needed)
  res.status(200).json({ message: "Withdrawal successful" });
});

// Route to handle deposit transactions
app.post("/deposit", async (req, res) => {
  const { account, amount } = req.body;
  
  try {
    // Validate inputs: ensure account and amount are provided, and the amount is a valid number
    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input' });  // Return an error response if validation fails
    }

    // Parse the deposit amount as a number
    const parsedAmount = parseFloat(amount);
    
    // Update the account balance by increasing it with the deposit amount
    const result = await AccountModel.updateOne(
      { account: account },  // Find the account with the given ID
      { $inc: { balance: parsedAmount } }  // Increase the balance by the deposit amount
    );

    // If no account was modified, return an error (account not found)
    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // If deposit is successful, send a success message
    res.status(200).json({ message: 'Deposit successful' });

  } catch (error) {
    // Catch any server errors and log them
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start the Express server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`LGU Server running on http://localhost:${process.env.PORT} 27-dec`);
});

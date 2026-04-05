const express=require('express');
const app=express();
const cors=require('cors');
const session = require('express-session');
const authRoutes = require('./src/routes/authRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'AuraText_Secret_123', // Use a random string
  resave: false,                // Don't save session if unmodified
  saveUninitialized: false,     // Don't create session until something is stored
  cookie: { 
    maxAge: 1000 * 60 * 60,     // 1 hour expiry
    secure: false               // Set to true only if using HTTPS
  }
}));
app.use("/api/auth",authRoutes);
app.use('/api/ai', aiRoutes);

app.get("/",(req,res)=>{
	res.send("Called BackEnd");
})

module.exports = app;
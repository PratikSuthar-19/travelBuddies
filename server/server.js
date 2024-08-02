import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from'nodemailer';
import  bodyParser from 'body-parser';

import connectDB from './config/db.js';

//Routes
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';

const app = express();

// Config
connectDB();
dotenv.config();

// Middleware
app.use(cors());
app.use(json());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

////for email

const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service provider
    auth: {
      user: 'enter your email', // your email address
      pass: 'enter password' // your email password or app-specific password
    }
  });


  app.post('/send-email', (req, res) => {
    const { to  } = req.body;
  
    // const mailOptions = {
    //   from: 'psuthar1903@gmail.com',
    //   to,
    //   subject,
    //   text
    // };

    const mailOptions = {
        from: 'psuthar1903@gmail.com',
        to : to,
        subject :"🌍 You're Invited: Join Us for an Exciting Group Trip with TravelBuddy! 🌟",
        html : ` <p> Dear ${to.split('@')[0]}  <br><br> I hope this message finds you well!  <br><br> I’m thrilled to extend an invitation to you for an exciting group trip that we’re organizing through TravelBuddy. It’s going to be an incredible adventure, and I’d love for you to join us! </p> <br> <br> <b> Why Join Us? <b/> <br><br> Fun and Fellowship: Meet new people and make lasting friendships while exploring a fantastic destination.<br> Organized Itinerary: Enjoy a well-planned itinerary with guided tours, activities, and free time. <br> Hassle-Free Experience: Let TravelBuddy handle all the details so you can focus on having a great time. <br>  <br><br> I hope you can make it! It’s going to be a memorable experience, and I look forward to sharing it with you. <br><br> Best regards, <br> <br> P.S. Don’t forget to check out the TravelBuddy website for more details and updates about the trip!`
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).json({ message: 'Email sent successfully!', info });
    });
  });

  /////

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

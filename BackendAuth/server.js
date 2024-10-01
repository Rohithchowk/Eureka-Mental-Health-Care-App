const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const cors=require("cors")
const errorHandler = require("./middlewares/errorHandler");
const app = express();

mongoose
  .connect("mongodb+srv://miniproject1729:miniproject1729@cluster0.ylskpxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));

  app.use(cors({
    origin: 'https://improved-system-wrgvwv79r4p62v6j-8081.app.github.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  const moodSchema = new mongoose.Schema({
    emoji: String,
    sleepTime: Number,
    moodMessage: String,
    date: { type: Date, default: Date.now }
  });
  
  const Mood = mongoose.model('Mood', moodSchema);
  
  const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    gender: { type: String, required: true },
    doctorName: { type: String, required: true }, // Changed from doctorId to doctorName
    date: { type: Date, required: true },
    slot: { type: String, required: true },
  });

  const Appointment = mongoose.model('Appointment', appointmentSchema);

  app.post('/book-appointment', async (req, res) => {
    const { patientName, gender, doctorName, date, slot } = req.body;
  
    try {
      const appointment = new Appointment({
        patientName,
        gender,
        doctorName,
        date: new Date(date), // Ensure date is parsed correctly
        slot,
      });
  
      await appointment.save();
      res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error booking appointment.' });
    }
  });
  
  app.get('/appointments', async (req, res) => {
    try {
      const appointments = await Appointment.find(); 
      res.status(200).json(appointments); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving appointments.' });
    }
  });

  app.post('/api/mood', async (req, res) => {
    const { emoji, sleepTime, moodMessage } = req.body;
    try {
      const newMood = new Mood({ emoji, sleepTime, moodMessage });
      await newMood.save();
      res.status(201).json({ message: 'Mood data saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving mood data', error });
    }
  });
  
app.use(express.json()); 
app.use("/", router);
app.use(errorHandler);
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
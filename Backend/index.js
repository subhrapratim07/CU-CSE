const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Models
const FormDataModel = require('./models/FormData');
const PersonalDetailsModel = require('./models/PersonalDetails');
const FileUploadModel = require('./models/upload');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Allow large JSON payloads (e.g., base64 images)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://msubhra364:Subhra07@cluster0.0oq0nx4.mongodb.net/cse')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

/* ===========================
   AUTHENTICATION
=========================== */

// Register
app.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await FormDataModel.findOne({ email });
    if (user) return res.json("Already registered");
    const newUser = await FormDataModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FormDataModel.findOne({ email });
    if (!user) return res.json("No records found!");
    if (user.password === password) return res.json("Success");
    res.json("Wrong password");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   PERSONAL DETAILS
=========================== */

// Save or update personal details
app.post('/save-personal-details', async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await PersonalDetailsModel.findOne({ email });
    if (existing) {
      await PersonalDetailsModel.updateOne({ email }, req.body);
      return res.json({ message: 'Details updated' });
    }
    await PersonalDetailsModel.create(req.body);
    res.json({ message: 'Details saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch personal details
app.get('/personal-details/:email', async (req, res) => {
  try {
    const user = await PersonalDetailsModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Personal details not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   FILE UPLOAD (photo, signature, results)
=========================== */

app.post('/upload-files', async (req, res) => {
  try {
    const { email, photo, signature, results } = req.body;

    const existing = await FileUploadModel.findOne({ email });
    if (existing) {
      existing.photo = photo;
      existing.signature = signature;
      existing.results = [...existing.results, ...results];
      await existing.save();
      return res.json({ message: "Files updated" });
    }

    await FileUploadModel.create({ email, photo, signature, results });
    res.json({ message: "Files saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch photo & signature
// Add this to your backend (index.js)
app.get('/upload-files/:email', async (req, res) => {
  try {
    const fileData = await FileUploadModel.findOne({ email: req.params.email });
    if (!fileData) return res.status(404).json({ message: 'File data not found' });
    res.json({
      photo: fileData.photo,
      signature: fileData.signature
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ===========================
   BASIC USER INFO (for Dashboard)
=========================== */

app.get('/user-info/:email', async (req, res) => {
  try {
    const user = await FormDataModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name, email: user.email, phone: user.phonenumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   SERVER START
=========================== */

const PORT = 40001;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

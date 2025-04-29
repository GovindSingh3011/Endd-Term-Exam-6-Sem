import express from 'express';
import jwt from 'jsonwebtoken';
import connectDB from './db.js';
import User from './models/User.js';
import Event from './models/Event.js';

const app = express();
app.use(express.json());

connectDB();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/events', auth, async (req, res) => {
  try {
    const event = new Event({ ...req.body, createdBy: req.user.id });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/events/:eventId/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) throw new Error('Event not found');
    if (event.registeredUsers.includes(req.user.id)) {
      throw new Error('Already registered');
    }
    event.registeredUsers.push(req.user.id);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/events/:eventId/cancel/:userId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) throw new Error('Event not found');
    event.registeredUsers = event.registeredUsers.filter(id => id.toString() !== req.params.userId);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/users/:userId/events', auth, async (req, res) => {
  try {
    const events = await Event.find({
      $or: [
        { createdBy: req.params.userId },
        { registeredUsers: req.params.userId }
      ]
    });
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
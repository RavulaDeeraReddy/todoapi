import express from 'express';
import router from './routes.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/todo', router);

app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

import express from 'express';
import router from './routes.js';

const app = express();
app.use(express.json());
app.use('/todo', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
    }
);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));



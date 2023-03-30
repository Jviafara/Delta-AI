require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/connectDB');
const postRoutes = require('./routes/postRoutes');
const deltaRoutes = require('./routes/deltaRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/delta', deltaRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from Delta-AI');
});

const startServer = async (req, res) => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>
            console.log('Server running on port: http://localhost:8080')
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();

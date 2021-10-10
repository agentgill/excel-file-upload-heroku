const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const cors = require('cors');
app.use(cors());
app.get('/hello', (req, res) => {
    console.log('Hello Express!');
    res.status(200).json({ message: 'Hello World' });
});
app.listen(PORT, () =>
    console.log(`✅ API Server started: http://${HOST}:${PORT}`)
);

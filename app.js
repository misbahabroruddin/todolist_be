const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);
app.use(errorHandler);

app.get('/ping', (req, res) => {
  res.send({ message: 'OK' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

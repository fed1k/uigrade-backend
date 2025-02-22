const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
const sequelize = require('./config/db');
const dotenv = require("dotenv")

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api', questionRoutes);
app.use('/api', resultRoutes);

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

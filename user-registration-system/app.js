const express = require('express');
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');
const jobRoutes = require('./src/routes/jobRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

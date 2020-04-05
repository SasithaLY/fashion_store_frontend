const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true} );

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established Successfully!');
});

const productRouter = require('./Routes/ProductsRouter');

app.use('/productsRouter', productRouter);

app.listen(PORT, function () {
    console.log('Server is running on port : ', PORT);
});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
const port = 3080

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const url = 'mongodb+srv://angel:angel@trainingapp.k4pbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB is working")
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const teamsRouter = require('./routes/api/teams');
const userRouter = require('./routes/login');

app.use('/auth', userRouter);
app.use('/api/teams/',teamsRouter);

require('dns').lookup(require('os').hostname(), function(err,add,fam) {
    console.log('addr: ' + add);
})

app.listen(port, () => {
    console.log(`Server running in port: ${port}`)
})
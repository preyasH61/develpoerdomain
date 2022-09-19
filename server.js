require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
// method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());
// enables the express server to respond to preflight requests
// A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
app.use(cors());
// parses Cookie header and populates req.cookies with an object keyed by the cookie names
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

// Routes - Prefixes
app.use('/user', require('./routes/userRouter'));
app.use('/projects', require('./routes/projectRouter'));
app.use('/api', require('./routes/upload'));
app.use('/profile', require('./routes/profileRouter'));
app.use('/joinproject', require('./routes/requestRouter'));
app.use('/contact', require('./routes/contactRouter'));
app.use('/admin', require('./routes/adminRouter'));

// DB connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (!err) {
        console.log("Connected to mongodb");
    } else {
        console.log("Error in connecting DB", err);
        throw err;
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { authentication, checkUser } = require('./middleware/authMiddleware');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL);

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const aboutRouter = require('./routes/about');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const supportRouter = require('./routes/support');
const submitRouter = require('./routes/submit');

app.use('/', checkUser, indexRouter);
app.use('/about', checkUser, aboutRouter);
app.use('/login', checkUser, loginRouter);
app.use('/logout', checkUser, logoutRouter);
app.use('/register', checkUser, registerRouter);
app.use('/support', authentication, checkUser, supportRouter);
app.use('/submit', checkUser, submitRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

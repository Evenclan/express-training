const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.use('/user', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/views/forbidden.html'));
  });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/hello/:name', (req, res) => {
    res.render('Hello', { name: req.params.name });
  });

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact', { layout: 'dark'});
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,'/public/error.jpg'));
  })

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
var multer  = require('multer')

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

const upload = multer();

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
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());


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
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info', { layout: 'dark'});
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {

    const { author, sender, title, message } = req.body;
  
    if(author && sender && title && message && req.file.originalname) {
        res.render('contact', { isSent: true, name: req.file.originalname});
        console.log(req.file)
      }
      else {
        res.render('contact', { isError: true });
      }
  
  });

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,'/public/error.jpg'));
  })

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
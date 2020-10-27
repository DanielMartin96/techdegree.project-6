const express = require('express');
const data = require("./projects.json");
const app = express();

// setting view engine to pug
app.set('view engine', 'pug');

// serving express files
app.use('/static', express.static('public'));
app.use('/static', express.static('images'));

// setting index route
app.get('/', (req, res) => {
    res.render('index', { data });
});

// setting about route 
app.get('/about', (req, res) => {
    res.render('about');
});

// dynamic project route 
app.get('/project/:id', function(req, res){
    res.render('project', { 
      project: data.project[req.params.id]
  }); // needs to be customised - adding locals as an object
});

// error handlers
// 404 Error handler
app.use((req, res, next) => {
    const err = new Error('ERROR: 404 - The page you\'ve requested could not be found');
    err.status = 404;
    next(err);
  });

// global error Handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
      // render error page and then pass the error to it
      res.status(404).render('error', { err })
  } else {
      // set error message to 500 server error
      err.message = err.message || `Oops! It looks like something went wrong on the server`;
      // if error is different to 404, set status to 500 and display to error page
      res.status(err.status || 500).render('error', { err });
  }
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
})


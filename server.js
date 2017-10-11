var express    = require('express')
    path       = require('path');
    ejs        = require('ejs');
    mongoose   = require('mongoose')
    bodyParser = require('body-parser')
    nodemon    = require('nodemon')

var {ReserveCategory} = require('./models/ReserveCategory');
var { ObjectID} = require('mongodb');


    MONGODB_URI = 'mongodb://fitnesscenter:fitnesscenter@ds159024.mlab.com:59024/heroku_xg1r2cj8';
    // mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/FitnessApp');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/FitnessApp');
    var db = mongoose.connection;

    PORT      = process.env.PORT || 5000;
    app = express();

app.set('port', PORT);
app.use(express.static(path.join(__dirname, 'assests')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', __dirname );
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
  res.header('Access-Control-Allow-Headers',"Content-Type");
  next();
});

require('./routes.js')(app);


// ======reserveCategory routes start=====

// post request to reserveCategory
app.post('/reserveCategory', (req, res) => {
  var category = new ReserveCategory({
    category: req.body.category,
    resource: req.body.resource,
    reservedAt: req.body.reservedAt,
    start: req.body.start,
    end: req.body.end
  });

  category.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});


// get request to reserved categories
app.get('/reserveCategory', (req, res) => {
  ReserveCategory.find().then((categories)=> {
    res.send({categories});
  })
}, (e) => {
  res.status(400).send(e);
})


// get request by id to reserved categories
app.get('/reserveCategory/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  ReserveCategory.findById(id).then((reserveCategory) => {
    if(!reserveCategory){
      res.status(404).send();
    }
      return res.send({reserveCategory});
  }, (e) => {
    res.status(404).send();
  })
})

// delete request to reserved categories

app.delete('/reserveCategory/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  ReserveCategory.findByIdAndRemove(id).then((category) => {
    if(!category){
      res.status(404).send();
    }
    res.status(200).send(category);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(app.get('port'), function() {
  console.log('Up and running in a port:', PORT);
});

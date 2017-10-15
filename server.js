var express    = require('express');
var path       = require('path');
var ejs        = require('ejs');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');


const _ = require('lodash');

var {ReserveCategory} = require('./models/reserveCategory');
var {CategoryModel} = require('./models/Category')
var { ObjectID} = require('mongodb');


    var MONGODB_URI = 'mongodb://fitnesscenter:fitnesscenter@ds159024.mlab.com:59024/heroku_xg1r2cj8';
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/FitnessApp');
    //  mongoose.connect('mongodb://localhost:27017/FitnessApp');
    // var db = mongoose.connection;
    var port = process.env.PORT || 5000;

    var app = express();

// app.use(express.static(path.join(__dirname, 'assests')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.set('views', __dirname );
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
  res.header('Access-Control-Allow-Headers',"Content-Type");
  next();
});

// require('./routes.js')(app);


// category routes

app.post('/', (req, res) => {
  var category = new CategoryModel({
    title: req.body.title
  });

  category.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});


app.get('/', (req, res) => {
  CategoryModel.find().then((categories) => {
    res.send(categories);
  }, (e) => {
    res.status(400).send(e);
  })
})


// ======reserveCategory routes start=====

// post request to reserveCategory
app.post('/reserveCategory', (req, res) => {
  var reservedetail = new ReserveCategory({
    category: req.body.category,
    useremail: req.body.useremail,
    reservedate: req.body.reservedate,
    status: req.body.status,
    time: req.body.time
  });

  reservedetail.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/reserveCategory/:date', (req, res) => {
  ReserveCategory.find({reservedate:req.params.date}).then((categories)=> {
    res.send({categories});
  })
}, (e) => {
  res.status(400).send(e);
})


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
    res.status(200).send({category});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.put('/reserveCategory/:id',(req,res)=>{
  var id = req.params.id;
  var reserve = { status:1, useremail: req.body.useremail };
  ReserveCategory.update({_id:id},reserve).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.patch('/reserveCategory/:id', (req, res) => {
  var id = req.params.id;
  // using lodash to let user to update only resource, start and end properties
  var body = _.pick(req.body, ['status', 'username']);

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  ReserveCategory.findByIdAndUpdate(id, {$set: body}, {new: true}).then((category)=> {
    if(!category){
      return res.status(404).send();
    }
    res.send({category})
  }).catch((e) => {
    res.status(400).send();
  })
})

app.listen(port, function() {
    console.log("App is running on port " + port);
});

module.exports = {app};

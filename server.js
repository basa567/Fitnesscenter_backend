var express    = require('express')
    path       = require('path');
    ejs        = require('ejs'); 
    mongoose   = require('mongoose')
    bodyParser = require('body-parser')
    nodemon    = require('nodemon')
   
   
   
    MONGODB_URI = 'mongodb://fitnesscenter:fitnesscenter@ds159024.mlab.com:59024/heroku_xg1r2cj8';
    mongoose.connect(MONGODB_URI);    
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
app.listen(app.get('port'), function() {
  console.log('Up and running in a port:', PORT);
});

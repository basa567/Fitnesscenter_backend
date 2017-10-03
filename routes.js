'use strict'
var  CategoryCtrl  = require("./controllers/CategoryCtrl.js");

module.exports = function(app){
    app.get('/getcategory',CategoryCtrl.getCategory);
}

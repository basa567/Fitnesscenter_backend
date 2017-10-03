'use strict';

var model = require("../models/Category.js");

exports.getCategory= function(req,res,next){      
    var status = model.getCategory(function(response){            	  	   
      if(response){        
        res.json(response);
      }else{
        res.json({message:"not found"});
      }
  });
}

exports.addCategory= function(req,res,next){   
  var bname =req.body.category.title; 
  var status = model.addCategory(bname, function(response){            	  	   
    if(response){            
      res.send({message:"added"});
    }else{
      res.json({message:"couldn't add"})
    }
  });
}

var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var categorySchema = new Schema({
    title: {type:String}
});

var CategoryModel = mongoose.model('categories',categorySchema);

module.exports = {
  CategoryModel
};

//
// exports.getCategory = function(callback){
//     categoryModel.find({}, function(err, docs){
//           if(err) return callback(false);
//           else    return callback(docs);
//       });
//   }
//
//   exports.addCategory = function(bname){
//       new categoryModel({
//             title: bname
//         }).save(function(err, doc){
//             if(err) return callback(false);
//             else    return callback(doc);
//         });
//     }

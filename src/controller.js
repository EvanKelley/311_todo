
let db = require("./db");

let listEntries = function(req, res){
  // should return summary of all entries in database
  
  let sql = "SELECT id, title, done FROM entries;"

  db.query(sql, function(err, results){
    if(err){
      console.log("failed to query database", err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};

let getEntry = function(req, res){

  // 1 We want to get the ID from the requests path param
  // 2 We want to execute the sql statement to get the info for an entry from the database, but only from that ID

  let id = req.params.id;

  let sql = 'SELECT * FROM entries WHERE id = ?'
  let params = [id]

  db.query(sql, params, function(err, results){
    if(err){
      console.log("failed to query database", err);
      res.sendStatus(500);
    } else {
      if(results.length == 0){
        res.sendStatus(404);
      } else {
        res.json(results[0]);
      }
    }
  })
};

let deleteEntry = function(){};

let addEntry = function(){};

let updateEntry = function(){};

module.exports = {
  listEntries,
  getEntry,
  deleteEntry,
  addEntry,
  updateEntry
};
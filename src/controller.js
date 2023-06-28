
// Create an object called "db", get a conneciton to the database
let db = require("./db");

// Handles route GET all todos
let listEntries = function(req, res){
  // Should return summary of all entries in database
  
  // The sql query that we want to send to database server
  // that will respond back with summary of the entries in my database 
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

// Handles route GET single entry by ID
let getEntry = function(req, res){

  // 1 We want to get the ID from the requests path param
  // 2 We want to execute the sql statement to get the info for an entry 
  // from the database, but only from that ID

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

// Handles route DELETE single entry by ID
let deleteEntry = function(req, res){
  // Accept an ID from request
  // Delete the row with the matching ID
  let id = req.params.id;

  let sql = "DELETE FROM entries WHERE id = ?";
  let params = [id];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("delete query failed", err);
      res.sendStatus(500);
    } else {
        res.sendStatus(204);
    }
  });

};

// Handles route INSERT into entries (title, notes) values (?, ?)
let addEntry = function(req, res){
  // Read data from request (title, notes)
  // Execute the query that will insert data into the database

  let title = req.body.title;
  let notes = req.body.notes;

  if(!title){
    res.sendStatus(400).json("Title is required");
    return;
  };

  let sql = "INSERT into entries (title, notes) values (?, ?);"
  let params = [title, notes];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("Failed to insert into the database", err);
      res.sendStatus(500);
    } else {
        res.sendStatus(204);
    }
  });
};

// Handles route UPDATE entries, set title = ?, notes = ?, done = ?, where id = ?
let updateEntry = function(req, res){

  // Get the ID from the req path param (like delete, get)
  // Get the rest of the info from the request body (like the post)

  let id = req.params.id;
  let title = req.body.title;
  let notes = req.body.notes;
  let done = req.body.done; 

  if(!title){
    res.sendStatus(400).json("Title is required");
    return;
  }
  let booleanDone = false;
  if(done == true){
    booleanDone = true;
  }

  let sql = "UPDATE entries set title = ?, notes = ?, done = ? where id = ?";
  let params = [title, notes, booleanDone, id];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("Failed to update the database", err);
      res.sendStatus(500);
    } else {
        res.sendStatus(204);
    }
  });
};

// PATCH INSTEAD OF UPDATE
let patchEntry = function(req, res){

  let id = req.params.id;
  let body = req.body;

  let updateTitle = false;
  let updateNotes = false;
  let updateDone = false;

  let snippets = [];
  let params = [];

  if(body.hasOwnProperty('title')){
    updateTitle = true;
    snippets.push("title = ?");
    params.push(body.title);
  }

  if(body.hasOwnProperty('notes')){
    updateNotes = true;
    snippets.push("notes = ?");
    params.push(body.notes);
  }

  if(body.hasOwnProperty('done')){
    updateDone = true;
    snippets.push("done = ?");
    let booleanDone = false;
    if(body.done == true){
      booleanDone = true;
    }
    params.push(body.done);
  }
 
  if(params.length == 0){
    res.status(400).json("You must include at least 1 attribute to update");
    return;
  }

  let sql = "update entries set "+snippets.join(",")+" where id = ?";
  params.push(id);

  db.query(sql, params, function(err, results){
    if(err){
      console.log("Failed to patch the entry", err);
      res.sendStatus(500);
    } else {
        res.sendStatus(204);
    }
  })
};

// Make object that has all functions to export
module.exports = {
  listEntries,
  getEntry,
  deleteEntry,
  addEntry,
  updateEntry,
  patchEntry
};
let express = require("express");

let router = express.Router();

let controller = require("./controller");

// route to get all todo items
router.get("/todos", controller.listEntries);

// route to get item by ID
router.get("/todos/:id", controller.getEntry);

// route to delete item by ID
router.delete("/todos/:id", controller.deleteEntry);

// route to add new item
router.post("/todos", controller.addEntry);

// route to update item
router.put("/todos/:id", controller.updateEntry);

module.exports = router;
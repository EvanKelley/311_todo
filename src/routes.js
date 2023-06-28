let express = require("express");

let router = express.Router();

let controller = require("./controller");

// Route to GET ALL todo items
router.get("/todos", controller.listEntries);

// Route to GET item by ID
router.get("/todos/:id", controller.getEntry);

// Route to DELETE item by ID
router.delete("/todos/:id", controller.deleteEntry);

// Route to ADD new item
router.post("/todos", controller.addEntry);

// Route to UPDATE item
router.put("/todos/:id", controller.updateEntry);

// Route to PATCH item
router.patch("/todos/:id", controller.patchEntry);

// Export above defined routes
module.exports = router;
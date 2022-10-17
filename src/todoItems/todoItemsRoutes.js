const router = require("express").Router();
//import todo model
const todoItemsModel = require("./todoItemsModel");

//Add Todo Item to our database
router.post("/todo/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

// second route -> get data from database
router.get("/todo/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

//Update item
router.put("/todo/item/:id", async (req, res) => {
  try {
    //find the item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });
    res.status(200).json(updateItem);
  } catch (err) {
    res.json(err);
  }
});

//Delete Item
router.delete('/todo/item/:id', async (req, res) => {
    try {
        //find the item by its id and delete it
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Item Deleted")
    }catch(err) {
        res.json(err)
    }
})

//export router
module.exports = router;

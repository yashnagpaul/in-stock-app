const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const inventoryFile = path.join(__dirname, "../db/inventories.json");

function getInventoryFromFile() {
  const data = fs.readFileSync(inventoryFile);
  return JSON.parse(data);
}

function list() {
  return getInventoryFromFile();
}

// PUT/PATCH INVENTORY (ADDED BY YASH)
function patchInventory(req, res) {
  const data = JSON.parse(fs.readFileSync(inventoryFile));
  const itemToEdit = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    warehouse: req.body.warehouse,
  };

  let newListOfItems = data.filter((item) => item.id !== itemToEdit.id);
  newListOfItems.push(itemToEdit);
  fs.writeFileSync(inventoryFile, JSON.stringify(newListOfItems));
  console.log(data);
  res.send(newListOfItems);
}

module.exports = { list, patchInventory };

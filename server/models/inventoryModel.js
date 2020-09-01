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
    warehouseID: req.body.warehouseID,
    itemName: req.body.name,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    warehouseName: req.body.warehouse,
    quantity: req.body.quantity,
  };

  let newListOfItems = data.filter((item) => item.id !== itemToEdit.id);
  newListOfItems.unshift(itemToEdit);
  fs.writeFileSync(inventoryFile, JSON.stringify(newListOfItems));
  console.log(data);
  res.send(newListOfItems);
}

//ADD NEW INVENTORY
function postInventory(req, res) {
  const inventoryData = JSON.parse(fs.readFileSync(inventoryFile));

  let warehouseIdentity;

  if (req.body.warehouse === "Manhattan")
    warehouseIdentity = "2922c286-16cd-4d43-ab98-c79f698aeab0";
  if (req.body.warehouse === "King West")
    warehouseIdentity = "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9";
  if (req.body.warehouse === "Granville")
    warehouseIdentity = "90ac3319-70d1-4a51-b91d-ba6c2464408c";
  if (req.body.warehouse === "San Fran")
    warehouseIdentity = "bfc9bea7-66f1-44e9-879b-4d363a888eb4";
  if (req.body.warehouse === "Santa Monica")
    warehouseIdentity = "89898957-04ba-4bd0-9f5c-a7aea7447963";
  if (req.body.warehouse === "Seattle")
    warehouseIdentity = "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7";
  if (req.body.warehouse === "Boston")
    warehouseIdentity = "150a36cf-f38e-4f59-8e31-39974207372d";
  if (req.body.warehouse === "Montreal")
    warehouseIdentity = "bb1491eb-30e6-4728-a5fa-72f89feaf622";

  const itemToPost = {
    id: req.body.id,
    warehouseID: warehouseIdentity,
    itemName: req.body.name,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
    warehouseName: req.body.warehouse,
  };
  inventoryData.unshift(itemToPost);
  fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData));
  res.send(inventoryData);
}

function searchInventory(searchWord) {
  const inventoryLIst = list();
  let concatInventory = [];

  const returnInventoryByWarehouseName = inventoryLIst.filter(
    (inventory) => inventory.warehouseName === searchWord
  );
  const returnInventoryByitemName = inventoryLIst.filter(
    (inventory) => inventory.itemName === searchWord
  );
  const returnInventoryBycategory = inventoryLIst.filter(
    (inventory) => inventory.category === searchWord
  );
  const returnInventoryBystatus = inventoryLIst.filter(
    (inventory) => inventory.status === searchWord
  );
  const returnInventoryByquantity = inventoryLIst.filter(
    (inventory) => inventory.quantity === parseInt(searchWord)
  );

  const totalInventory = concatInventory
    .concat(returnInventoryByWarehouseName)
    .concat(returnInventoryByitemName)
    .concat(returnInventoryBycategory)
    .concat(returnInventoryBystatus)
    .concat(returnInventoryByquantity);

  const uniqueInventory = Array.from(
    new Set(totalInventory.map((a) => a.id))
  ).map((id) => {
    return totalInventory.find((a) => a.id === id);
  });

  return uniqueInventory;
}

module.exports = { list, patchInventory, postInventory, searchInventory };

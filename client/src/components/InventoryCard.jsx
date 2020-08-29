import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../assets/Icons/chevron_right-24px.svg";
import Trash from "../assets/Icons/delete_outline-24px.svg";
import Edit from "../assets/Icons/edit-24px.svg";
import DeleteConfirm from "./DeleteWarehouse";

const InventoryCard = ({
  warehouseID,
  warehouseName,
  itemName,
  category,
  status,
  quantity,
  popUp
}) => {
  

  return (
    <div className="inventory-card__warehouse-card-container">
      <div className="inventory-card__warehouse-card">
        <div className="inventory-card__warehouse-top">
          <div className="inventory-card__warehouse-name-section">
            <h4 className="inventory-card__warehouse-name-title">ITEM NAME</h4>

            <Link to={`/inventory/${warehouseID}`}>
              <h3 className="inventory-card__warehouse-name">
                {itemName}
                <img src={Arrow}></img>
              </h3>
            </Link>
          </div>
          <div className="inventory-card__contact-name-section">
            <h4 className="inventory-card__contact-name-title">CATEGORY</h4>
            <p className="inventory-card__contact-name">{category}</p>
          </div>
          <div className="inventory-card__address-section">
            <h4 className="inventory-card__address-title">STATUS</h4>
            <p className="inventory-card__address">{status}</p>
          </div>
          <div className="inventory-card__contact-section">
            <h4 className="inventory-card__contact-title">
              QTY
            </h4>
            <p className="inventory-card__contact">
              {quantity}
            </p>
          </div>
          <div className="inventory-card__warehouse-bsection">
            <h4 className="inventory-card__warehouse-btitle">
              WAREHOUSE
            </h4>
            <p className="inventory-card__warehouse-bname">
              {warehouseName}
            </p>
          </div>
        </div>
        <div className="inventory-card__warehouse-bottom">
            <Link to={`/warehouses/delete`}><a 
              className="inventory-card__click"
              onClick={popUp}>
                <img className="inventory-card__warehouse-delete" src={Trash}/>
            </a></Link>
          <Link to={`/warehouses/:id/edit`}>
            <img
              className="inventory-card__warehouse-edit"
              src={Edit}
              alt="Edit"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;

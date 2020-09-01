import React, { Component } from "react";
import { Link } from "react-router-dom";

import WarehouseItemCard from "./WarehouseItemCard";
import axios from "axios";
import LeftIcon from "../assets/Icons/arrow_back-24px.svg";
import Sort from "../assets/Icons/sort-24px.svg";
import Edit from "../assets/Icons/edit-25px.svg";
import DeleteWarehouseInventory from "./DeleteWarehouseInventory";

class WarehouseInventory extends Component {
  state = {
    warehouseDetail: {},
    inventoryList: [],
    showPopUp: false,
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`http://localhost:8080/api/warehouses/${this.props.match.params.id}`)
      .then((response) => {
        console.log("My response", response.data);
        this.setState(
          {
            warehouseDetail: response.data,
          },

          () =>
            this.state.warehouseDetail.id !== undefined &&
            this.getInventoryById(this.state.warehouseDetail.id)
        );
      });
  }

  getInventoryById(id) {
    console.log(id); // warehouse id
    axios
      .get(`http://localhost:8080/api/warehouses/${id}/inventory`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          inventoryList: response.data,
        });
      });
  }

  popUpHandler = () => {
    this.setState({
      showPopUp: !this.state.showPopUp,
    });
  };

  deleteHandler = (id, warehouseID) => {
    console.log(id, warehouseID);
    axios
      .delete(`http://localhost:8080/api/warehouses/${id}/inventory`)
      .then((res) => {
        axios
          .get(`http://localhost:8080/api/warehouses/${warehouseID}/inventory`)
          .then((response) => {
            console.log(response.data);
            this.setState({
              inventoryList: response.data,
            });
          });
      })
      .catch((err) => console.log(err));
  };

  handleSearch() {
    console.log("handle search");
  }

  addWarehouse() {
    console.log("Add Warehouse");
  }

  sortWarehouse() {
    console.log("Sort Warehouse");
  }

  sortAddress() {
    console.log("Sort Address");
  }

  sortContactName() {
    console.log("Sort Contact Name");
  }

  sortContactInformation() {
    console.log("Sort Contact Information");
  }

  render() {
    const inventoryArray = this.state.inventoryList;
    console.log(inventoryArray);

    const contact_name =
      this.state.warehouseDetail && this.state.warehouseDetail.contact
        ? this.state.warehouseDetail.contact.name
        : null;

    const contact_position =
      this.state.warehouseDetail && this.state.warehouseDetail.contact
        ? this.state.warehouseDetail.contact.position
        : null;

    const contact_phone =
      this.state.warehouseDetail && this.state.warehouseDetail.contact
        ? this.state.warehouseDetail.contact.phone
        : null;

    const contact_email =
      this.state.warehouseDetail && this.state.warehouseDetail.contact
        ? this.state.warehouseDetail.contact.email
        : null;

    return (
      <>
        <div className="items-warehouse__container">
          <div className="items-warehouse__header-section">
            <div className="items-warehouse__header-top">
              <div className="items-warehouse__header-top-container">
                <Link to={`/warehouses`} className="items-warehouse__backlink">
                  <img
                    src={LeftIcon}
                    alt="back icon"
                    className="items-warehouse__backlink-icon"
                  />
                </Link>
                <h1 className="items-warehouse__header-name">
                  {this.state.warehouseDetail.name}
                </h1>
                <Link
                  to={`/warehouses/${this.props.match.params.id}/edit`}
                  className="items-warehouse__edit-link"
                >
                  <div className="items-warehouse__edit-circle">
                    <img src={Edit} alt="Edit" />
                  </div>
                </Link>

                <Link
                  to={`/warehouses/${this.props.match.params.id}/edit`}
                  className="items-warehouse__edit-link2"
                >
                  <div className="items-warehouse__edit-circle2">
                    <img src={Edit} alt="Edit" />
                    <h3>Edit</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="items-warehouse__header-bottom">
              <div className="items-warehouse__header-bottom-container">
                <div className="items-warehouse__header-bottom-top">
                  <h4 className="items-warehouse__address-title">
                    WAREHOUSE ADDRESS:
                  </h4>
                  <p>
                    {this.state.warehouseDetail.address}
                    {","}
                    <br />
                    {this.state.warehouseDetail.city}
                    {","}
                    {this.state.warehouseDetail.country}
                  </p>
                </div>

                <div className="items-warehouse__header-bottom-bottom">
                  <div className="items-warehouse__header-bottom-left">
                    <h4>CONTACT NAME:</h4>
                    <p>
                      {contact_name}
                      <br />
                      {contact_position}
                    </p>
                  </div>
                  <div className="items-warehouse__header-bottom-right">
                    <h4>CONTACT INFORMATION:</h4>
                    <p>
                      {contact_phone}
                      <br />
                      {contact_email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="items-warehouse__content-section">
            <div className="items-warehouse__content-container">
              <div className="items-warehouse__content-header">
                <div className="items-warehouse__content-header-container">
                  <h4>
                    INVENTORY ITEM
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={(e) => this.sortWarehouse(e)}
                    />
                  </h4>
                  <h4>
                    CATEGORY
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={this.sortAddress}
                    />
                  </h4>
                  <h4>
                    STATUS
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={this.sortContactName}
                    />
                  </h4>
                  <h4>
                    QUANTITY
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={this.sortContactInformation}
                    />
                  </h4>
                  <h4>ACTIONS</h4>
                </div>
              </div>
              {inventoryArray &&
                inventoryArray.map((inventory) => (
                  <WarehouseItemCard
                    key={inventory.itemName}
                    warehouseID={inventory.warehouseID}
                    warehouseName={inventory.warehouseName}
                    itemName={inventory.itemName}
                    description={inventory.description}
                    category={inventory.category}
                    status={inventory.status}
                    quantity={inventory.quantity}
                    popUp={this.popUpHandler}
                    id={inventory.id}
                  />
                ))}
            </div>
          </div>
          <div className="list-inventory__footer">
            &#169;InStock Inc. All Rights Reserved.
          </div>
        </div>
        {this.state.showPopUp === true ? (
          <DeleteWarehouseInventory
            popUpHandler={this.popUpHandler}
            warehouses={inventoryArray}
            url={this.props.match}
            deleteHandler={this.deleteHandler}
          />
        ) : (
          console.log("no popup")
        )}
      </>
    );
  }
}

export default WarehouseInventory;

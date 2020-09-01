import React, { Component } from "react";
import { Link } from "react-router-dom";

import WarehouseCard from "./WarehouseCard";
import axios from "axios";
import Search from "../assets/Icons/search-24px.svg";
import Sort from "../assets/Icons/sort-24px.svg";
import DeleteWarehouse from "./DeleteWarehouse";

class ListWarehouses extends Component {
  state = {
    warehouses: [],
    originalWarehouses: [],
    activeWarehouse: {},
    showPopUp: false,
  };

  componentDidMount() {
    axios.get("http://localhost:8080/api/warehouses").then((response) => {
      this.setState({
        warehouses: response.data,
        originalWarehouses: response.data,
      });
    });
  }

  popUpHandler = () => {
    this.setState({
      showPopUp: !this.state.showPopUp,
    });
  };

  deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/api/warehouses/${id}`)
      .then((res) => {
        axios.get("http://localhost:8080/api/warehouses").then((response) => {
          this.setState({
            warehouses: response.data,
            showPopUp: false,
          });
        });
      })
      .catch((err) => console.log(err));
  };

  handleSearch = (e) => {
    const searchItem = e.target.value;
    axios
      .post(`http://localhost:8080/api/warehouses/search`, {
        name: `${searchItem}`,
      })
      .then((response) => {
        if (response.data.length > 0 && response.data !== undefined) {
          this.setState({
            warehouses: response.data,
          });
        } else {
          this.setState({ warehouses: this.state.originalWarehouses });
        }
      });
  };

  addWarehouse() {}

  sortWarehouse() {}

  sortAddress() {}

  sortContactName() {}

  sortContactInformation() {}

  render() {
    const warehouseArray = this.state.warehouses;

    return (
      <>
        <div className="list-warehouse__container">
          <div className="list-warehouse__header-section">
            <div className="list-warehouse__header-container">
              <h1 className="list-warehouse__title">Warehouses</h1>
              {/* <form className="list-warehouse__search"> */}
              <input
                type="text"
                placeholder="Search..."
                className="list-warehouse__search-input"
                name="searchItem"
                onKeyUp={this.handleSearch}
              ></input>

              {/* </form> */}
              <Link
                to={"/warehouse/add"}
                className="list-warehouse__add-button-link"
              >
                <button className="list-warehouse__add-button">
                  <h3>+ Add New Warehouse</h3>
                  <img
                    className="list-warehouse__search-icon"
                    alt="Search"
                    src={Search}
                  />
                </button>
              </Link>
            </div>
          </div>

          <div className="list-warehouse__content-section">
            <div className="list-warehouse__content-container">
              <div className="list-warehouse__content-header">
                <div className="list-warehouse__content-header-container">
                  <h4>
                    WAREHOUSE
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={(e) => this.sortWarehouse(e)}
                    />
                  </h4>
                  <h4>
                    ADDRESS
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={this.sortAddress}
                    />
                  </h4>
                  <h4>
                    CONTACT NAME
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={this.sortContactName}
                    />
                  </h4>
                  <h4>
                    CONTACT INFORMATION
                    <img
                      alt="Sort Icon"
                      src={Sort}
                      onClick={this.sortContactInformation}
                    />
                  </h4>
                  <h4>ACTIONS</h4>
                </div>
              </div>
              {warehouseArray &&
                warehouseArray.map((warehouse) => (
                  <WarehouseCard
                    key={warehouse.id}
                    id={warehouse.id}
                    name={warehouse.name}
                    address={warehouse.address}
                    city={warehouse.city}
                    contact={warehouse.contact}
                    country={warehouse.country}
                    popUp={this.popUpHandler}
                  />
                ))}
            </div>
          </div>
          <div className="list-inventory__footer">
            &#169;InStock Inc. All Rights Reserved.
          </div>
        </div>
        {this.state.showPopUp === true ? (
          <DeleteWarehouse
            popUpHandler={this.popUpHandler}
            warehouses={warehouseArray}
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

export default ListWarehouses;

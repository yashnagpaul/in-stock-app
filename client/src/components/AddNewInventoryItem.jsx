import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import arrow from "../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";
import errorIcon from "../assets/Icons/error-24px.svg";

class AddNewInventoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.form = React.createRef();
  }

  state = {
    nameError: false,
    descriptionError: false,
    categoryError: false,
    statusError: false,
    quantityNameError: false,
    warehouseError: false,
  };

  statusUpdated = (e) => {
    const { value } = e.target;
    this.setState({ status: value });
  };

  submitHandler(event) {
    event.preventDefault();

    // RETRIEVE THE VALUES FROM THE FORM
    let id = uuidv4();
    let name = this.form.current.name.value;
    let description = this.form.current.description.value;
    let category = this.form.current.category.value;
    let status = this.form.current.status.value;
    let quantity = this.form.current.quantity.value;
    let warehouse = this.form.current.warehouse.value;

    //VALIDATE THAT WE HAVE ALL THE DATA THAT WE NEED
    if (
      id &&
      name &&
      description &&
      category &&
      status &&
      quantity &&
      warehouse
    ) {
      // POST THE NEW WAREHOUSE DETAILS TO OUR DATABASE
      axios.post("http://localhost:8080/api/inventory", {
        id: id,
        name: name,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
        warehouse: warehouse,
      });

      this.setState({ nameError: false });
      this.setState({ descriptionError: false });
      this.setState({ categoryError: false });
      this.setState({ statusError: false });
      this.setState({ quantityError: false });
      this.setState({ warehouseError: false });

      window.alert("Inventory successfully added!");

      //RESET THE FORM
      event.target.reset();
    } else {
      if (!name) this.setState({ nameError: true });
      if (!description) this.setState({ descriptionError: true });
      if (!category) this.setState({ categoryError: true });
      if (!status) this.setState({ statusError: true });
      if (!quantity) this.setState({ quantityError: true });
      if (!warehouse) this.setState({ warehouseError: true });
    }
  }

  render() {
    return (
      <form
        ref={this.form}
        onSubmit={this.submitHandler}
        className="add-warehouse"
      >
        <div className="add-warehouse__heading-arrow-container">
          <Link to="/inventory">
            <img className="add-warehouse__arrow" src={arrow} alt="arrow" />
          </Link>
          <h1 className="add-warehouse__heading">Add New Inventory Item</h1>
        </div>
        <div className="add-warehouse__details-availability-container">
          <div className="add-warehouse__warehouse-details">
            <h3 className="add-warehouse__subheading">Item Details</h3>
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              name="name"
              className="add-warehouse__name"
              placeholder="Item Name"
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.nameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error icon" />
              This field is required!
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              className="add-warehouse__description"
              placeholder="Please enter a brief item description..."
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.descriptionError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error icon" />
              This field is required!
            </div>

            <label htmlFor="category">Category</label>
            <select
              type="text"
              name="category"
              className="add-warehouse__category"
              placeholder="Please select"
            >
              <option value="Electronics">Electronics</option>
              <option value="Gear">Gear</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
              <option value="Health">Health</option>
            </select>
          </div>

          {/* ITEM AVAILABILITY */}

          <div className="add-warehouse__contact-details">
            <h3 className="add-warehouse__subheading">Item Availability</h3>
            <label htmlFor="status">Status</label>
            <div className="add-inventory__radio-container">
              <input
                type="radio"
                name="status"
                className="add-inventory__radio"
                value="In Stock"
                onInput={this.statusUpdated}
              />

              <label className="radio-label" htmlFor="status">
                In Stock
              </label>

              <input
                type="radio"
                name="status"
                className="add-inventory__radio"
                value="Out of stock"
                onInput={this.statusUpdated}
              />
              <label htmlFor="status">Out of Stock</label>
            </div>
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.statusError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error icon" />
              This field is required!
            </div>

            <div
              style={{
                display: this.state.status === "In Stock" ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <label htmlFor="quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                className="add-warehouse__position"
                placeholder="Quantity"
              />
            </div>

            {/* <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.quantityError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error icon" />
              This field is required!
            </div> */}

            <label htmlFor="warehouse">Warehouse</label>

            <select
              type="text"
              name="warehouse"
              className="add-warehouse__category"
              placeholder="Please select"
            >
              <option value="Manhattan">Manhattan</option>
              <option value="King West">King West</option>
              <option value="Granville">Granville</option>
              <option value="San Fran">San Fran</option>
              <option value="Santa Monica">Santa Monica</option>
              <option value="Seattle">Seattle</option>
              <option value="Boston">Boston</option>
              <option value="Montreal">Montreal</option>
            </select>
          </div>
        </div>
        <div className="add-warehouse__btn-container">
          <Link to="/inventory">
            <button className="add-warehouse__cancel-btn">Cancel</button>
          </Link>
          <button type="submit" className="add-warehouse__save-add-btn">
            + Add Item
          </button>
        </div>
      </form>
    );
  }
}

export default AddNewInventoryItem;

import React from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import errorIcon from "../assets/Icons/error-24px.svg";
import arrow from "../assets/Icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

class AddWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.form = React.createRef();
  }

  state = {
    nameError: false,
    addressError: false,
    cityError: false,
    countryError: false,
    contactNameError: false,
    positionError: false,
    numberError: false,
    emailError: false,
  };

  submitHandler(event) {
    event.preventDefault();

    // RETRIEVE THE VALUES FROM THE FORM
    let id = uuidv4();
    let name = this.form.current.name.value;
    let address = this.form.current.address.value;
    let city = this.form.current.city.value;
    let country = this.form.current.country.value;
    let contactName = this.form.current.contactName.value;
    let position = this.form.current.position.value;
    let number = this.form.current.number.value;
    let email = this.form.current.email.value;

    //VALIDATE THAT WE HAVE ALL THE DATA THAT WE NEED
    if (
      id &&
      name &&
      address &&
      city &&
      country &&
      contactName &&
      position &&
      number &&
      email
    ) {
      // POST THE NEW WAREHOUSE DETAILS TO OUR DATABASE
      axios.post("http://localhost:8080/api/warehouses", {
        id: id,
        name: name,
        address: address,
        city: city,
        country: country,
        contact: {
          name: contactName,
          position: position,
          phone: number,
          email: email,
        },
      });

      this.setState({ nameError: false });
      this.setState({ addressError: false });
      this.setState({ cityError: false });
      this.setState({ countryError: false });
      this.setState({ contactNameError: false });
      this.setState({ positionError: false });
      this.setState({ numberError: false });
      this.setState({ emailError: false });

      window.alert("Warehouse successfully added!");

      //RESET THE FORM
      event.target.reset();
    } else {
      if (!name) this.setState({ nameError: true });
      if (!address) this.setState({ addressError: true });
      if (!city) this.setState({ cityError: true });
      if (!country) this.setState({ countryError: true });
      if (!contactName) this.setState({ contactNameError: true });
      if (!position) this.setState({ positionError: true });
      if (!number) this.setState({ numberError: true });
      if (!email) this.setState({ emailError: true });
    }
  }

  render() {
    return (
      <form
        ref={this.form}
        className="add-warehouse"
        onSubmit={this.submitHandler}
      >
        <div className="add-warehouse__heading-arrow-container">
          <Link to="/warehouses">
            <img className="add-warehouse__arrow" src={arrow} alt="arrow" />
          </Link>
          <h1 className="add-warehouse__heading">Add New Warehouse</h1>
        </div>
        <div className="add-warehouse__details-availability-container">
          <div className="add-warehouse__warehouse-details">
            <h3 className="add-warehouse__subheading">Warehouse Details</h3>
            <label htmlFor="name">Warehouse Name</label>
            <input
              type="text"
              name="name"
              className="add-warehouse__name"
              placeholder="Warehouse Name"
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.nameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              name="address"
              className="add-warehouse__street-address"
              placeholder="Street Address"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.addressError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              className="add-warehouse__city"
              placeholder="City"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.cityError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              className="add-warehouse__country"
              placeholder="Country"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.countryError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>
          </div>

          {/* CONTACT DETAILS */}

          <div className="add-warehouse__contact-details">
            <h3 className="add-warehouse__subheading">Contact Details</h3>
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              name="contactName"
              className="add-warehouse__contact"
              placeholder="Contact Name"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.contactNameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="position">Position</label>
            <input
              type="text"
              name="position"
              className="add-warehouse__position"
              placeholder="Position"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.positionError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="number">Number</label>
            <input
              type="text"
              name="number"
              className="add-warehouse__number"
              placeholder="Number"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.numberError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="add-warehouse__email"
              placeholder="Email"
            />

            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.emailError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>
          </div>
        </div>

        <div className="add-warehouse__btn-container">
          <Link to="/warehouses">
            <button className="add-warehouse__cancel-btn">Cancel</button>
          </Link>
          <button type="submit" className="add-warehouse__save-add-btn">
            + Add Warehouse
          </button>
        </div>
      </form>
    );
  }
}

export default AddWarehouse;

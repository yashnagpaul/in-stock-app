import React from "react";
import axios from "axios";
import arrow from "../assets/Icons/arrow_back-24px.svg";
import { link, Link } from "react-router-dom";

class EditWarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.saveHandler = this.saveHandler.bind(this);
  }

  state = {
    name: "loading",
    address: "loading",
    city: "loading",
    country: "loading",
    contactName: "loading",
    position: "loading",
    number: "loading",
    email: "loading",
  };

  nameUpdated = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  addressUpdated = (e) => {
    const { value } = e.target;
    this.setState({ address: value });
  };
  cityUpdated = (e) => {
    const { value } = e.target;
    this.setState({ city: value });
  };
  countryUpdated = (e) => {
    const { value } = e.target;
    this.setState({ country: value });
  };

  contactNameUpdated = (e) => {
    const { value } = e.target;
    this.setState({ contactName: value });
  };

  positionUpdated = (e) => {
    const { value } = e.target;
    this.setState({ position: value });
  };

  numberUpdated = (e) => {
    const { value } = e.target;
    this.setState({ number: value });
  };

  emailUpdated = (e) => {
    const { value } = e.target;
    this.setState({ email: value });
  };

  saveHandler(event) {
    event.preventDefault();

    let id = this.props.match.params.id;
    let name = this.form.current.name.value;
    let address = this.form.current.address.value;
    let city = this.form.current.city.value;
    let country = this.form.current.country.value;
    let contactName = this.form.current.contact_name.value;
    let position = this.form.current.position.value;
    let number = this.form.current.number.value;
    let email = this.form.current.email.value;

    axios
      .put(
        `http://localhost:8080/api/warehouses/${this.props.match.params.id}`,
        {
          id: id,
          name: name,
          address: address,
          city: city,
          country: country,
          contactName: contactName,
          position: position,
          phone: number,
          email: email,
        }
      )
      .then(window.alert("Changes have been saved."));
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/warehouses")
      .then((response) =>
        response.data.filter(
          (warehouse) => warehouse.id === this.props.match.params.id
        )
      )
      .then((result) =>
        // console.log(result)
        this.setState({
          name: result[0].name,
          address: result[0].address,
          city: result[0].city,
          country: result[0].country,
          contactName: result[0].contact.name,
          position: result[0].contact.position,
          number: result[0].contact.phone,
          email: result[0].contact.email,
        })
      );
  }

  render() {
    return (
      <form
        ref={this.form}
        onSubmit={this.saveHandler}
        className="add-warehouse"
      >
        <div className="add-warehouse__heading-arrow-container">
          <Link to="/warehouses">
            <img className="add-warehouse__arrow" src={arrow} alt="arrow" />
          </Link>
          <h1 className="add-warehouse__heading">Edit Warehouse</h1>
        </div>
        <div className="add-warehouse__details-availability-container">
          <div className="add-warehouse__warehouse-details">
            <h3 className="add-warehouse__subheading">Warehouse Details</h3>
            <label htmlFor="name">Warehouse Name</label>
            <input
              type="text"
              name="name"
              className="add-warehouse__name"
              value={this.state.name}
              onInput={this.nameUpdated}
              required
            />

            <label htmlFor="street-address">Street Address</label>
            <input
              type="text"
              name="address"
              className="add-warehouse__street-address"
              value={this.state.address}
              onInput={this.addressUpdated}
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              className="add-warehouse__city"
              value={this.state.city}
              onInput={this.cityUpdated}
              required
            />

            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              className="add-warehouse__country"
              value={this.state.country}
              onInput={this.countryUpdated}
              required
            />
          </div>

          {/* CONTACT DETAILS */}

          <div className="add-warehouse__contact-details">
            <h3 className="add-warehouse__subheading">Contact Details</h3>
            <label htmlFor="contact-name">Contact Name</label>
            <input
              type="text"
              name="contact_name"
              className="add-warehouse__contact"
              value={this.state.contactName}
              onInput={this.contactNameUpdated}
              required
            />

            <label htmlFor="position">Position</label>
            <input
              type="text"
              name="position"
              className="add-warehouse__position"
              value={this.state.position}
              onInput={this.positionUpdated}
              required
            />

            <label htmlFor="number">Number</label>
            <input
              type="text"
              name="number"
              className="add-warehouse__number"
              value={this.state.number}
              onInput={this.numberUpdated}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="add-warehouse__email"
              value={this.state.email}
              onInput={this.emailUpdated}
              required
            />
          </div>
        </div>
        <div className="add-warehouse__btn-container">
          <Link to="/warehouses">
            <button className="add-warehouse__cancel-btn">Cancel</button>
          </Link>
          <button type="submit" className="add-warehouse__save-add-btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}
export default EditWarehouse;

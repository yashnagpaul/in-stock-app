import React from "react";
export default function AddWarehouse() {
  return (
    <form className="add-warehouse">
      <h1 className="add-warehouse__heading">Add New Warehouse</h1>
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

          <label htmlFor="street-address">Street Address</label>
          <input
            type="text"
            name="street-address"
            className="add-warehouse__street-address"
            placeholder="Street Address"
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            className="add-warehouse__city"
            placeholder="City"
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            className="add-warehouse__country"
            placeholder="Country"
          />
        </div>

        {/* CONTACT DETAILS */}

        <div className="add-warehouse__contact-details">
          <h3 className="add-warehouse__subheading">Contact Details</h3>
          <label htmlFor="contact-name">Contact Name</label>
          <input
            type="text"
            name="contact-name"
            className="add-warehouse__contact"
            placeholder="Contact Name"
          />

          <label htmlFor="position">Position</label>
          <input
            type="text"
            name="position"
            className="add-warehouse__position"
            placeholder="Position"
          />

          <label htmlFor="number">Number</label>
          <input
            type="text"
            name="number"
            className="add-warehouse__number"
            placeholder="Number"
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="add-warehouse__email"
            placeholder="Email"
          />
        </div>
      </div>

      <div className="add-warehouse__btn-container">
        <button className="add-warehouse__cancel-btn">Cancel</button>
        <button className="add-warehouse__save-add-btn">+ Add Warehouse</button>
      </div>
    </form>
  );
}

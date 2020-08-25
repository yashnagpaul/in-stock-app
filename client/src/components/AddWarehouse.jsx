import React from "react";
export default function AddWarehouse() {
  return (
    <form className="add-warehouse">
      <h1>Add New Warehouse</h1>
      <div className="add-warehouse__warehouse-details">
        <h3>Warehouse Details</h3>
        <label for="name">Warehouse Name</label>
        <input
          type="text"
          name="name"
          className="add-warehouse__name"
          placeholder="Warehouse Name"
        />

        <label for="street-address">Street Address</label>
        <input
          type="text"
          name="street-address"
          className="add-warehouse__street-address"
          placeholder="Street Address"
        />

        <label for="city">City</label>
        <input
          type="text"
          name="city"
          className="add-warehouse__city"
          placeholder="City"
        />

        <label for="country">Country</label>
        <input
          type="text"
          name="country"
          className="add-warehouse__country"
          placeholder="Country"
        />
      </div>

      {/* CONTACT DETAILS */}

      <div className="add-warehouse__contact-details">
        <h3>Contact Details</h3>
        <label for="contact-name">Contact Name</label>
        <input
          type="text"
          name="contact-name"
          className="add-warehouse__contact"
          placeholder="Contact Name"
        />

        <label for="position">Position</label>
        <input
          type="text"
          name="position"
          className="add-warehouse__position"
          placeholder="Position"
        />

        <label for="number">Number</label>
        <input
          type="text"
          name="number"
          className="add-warehouse__number"
          placeholder="Number"
        />

        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          className="add-warehouse__email"
          placeholder="Email"
        />
      </div>
      <div className="add-warehouse__btn-container">
        <button>Cancel</button>
        <button>+ Add Warehouse</button>
      </div>
    </form>
  );
}
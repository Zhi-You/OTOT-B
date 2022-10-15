import React, { useState, useEffect } from "react";

const ContactList = () => {
  // Keep track of all of our contacts, initialized to a set of empty objects
  const [contacts, setContact] = useState([
    {
      name: "zhi you",
      email: "test@gmail.com",
      phone: "99999999",
      gender: "Male",
    },
    {
      name: "Buibo",
      email: "test@gmail.com",
      phone: "99999999",
      gender: "Female",
    },
  ]);

  const getContactsToRender = () => {
    return contacts.map((contact, idx) => {
      return (
        <div className="columns contact mt-3 is-vcentered">
          <div className="column">
            <div className="has-icons-left" key={idx}>
              <span className="icon is-small is-left pr-3">
                <i className="fas fa-user"></i>
              </span>
              {contact.name}
            </div>
          </div>
          <div className="column">
            <div className="has-icons-left" key={idx}>
              <span className="icon is-small is-left pr-3">
                <i className="fas fa-envelope"></i>
              </span>
              {contact.email}
            </div>
          </div>
          <div className="column">
            <div className="has-icons-left" key={idx}>
              <span className="icon is-small is-left pr-3">
                <i className="fas fa-phone"></i>
              </span>
              {contact.phone}
            </div>
          </div>
          <div className="column">
            <div key={idx}>{contact.gender}</div>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              <button className="button is-warning">Update</button>
              <button className="button is-danger">Delete</button>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{getContactsToRender()}</div>;
};

export default ContactList;

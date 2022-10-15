import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../configs";

const ContactList = () => {
  // Keep track of all of our contacts, initialized to a default set of contacts
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

  useEffect(() => {
    getAllContacts();
  }, []);

  async function getAllContacts() {
    try {
      const data = await axios.get(`${API_URL}/api/contacts`);

      console.log(data);

      if (data.data.status === "success") {
        var contacts = data.data.data;

        // console.log(contacts);
        // console.log(contacts[0].name);
        // console.log(typeof contacts[0]);

        // console.log((({ name, email }) => ({ name, email }))(contacts[0]));

        var contactList = [];

        contacts.forEach((contact) => {
          contactList.push(
            (({ name, email, phone, gender }) => ({
              name,
              email,
              phone,
              gender,
            }))(contact)
          );
        });

        console.log(contactList);
        setContact(contactList);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const getContactsToRender = () => {
    console.log(contacts);
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

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../configs";
import Alert from "react-popup-alert";
import "../App.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  const [alert, setAlert] = useState({
    type: "error",
    text: "Can only update Existing Contact",
    show: false,
  });

  const [update, setUpdate] = useState(false);

  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [gender, setGender] = useState("");

  // When either Add or Update is clicked, contact data will be passed in as 'event' variable
  const onSubmit = async (event) => {
    console.log(event);

    if (!update) {
      console.log("WE ARE ADDING A CONTACT");

      // Function to handle when user clicks on Submit to add a new contact.
      try {
        await axios
          .post(`${API_URL}/api/contacts`, {
            name: event.name,
            email: event.email,
            phone: event.phone,
            gender: event.gender,
          })
          .then((res) => {
            console.log(res);
            if (res.data.message === "New contact created!") {
              // Refreshes the page to update contact list when useEffect is called in ContactList to get all contacts
              window.location.reload();
              //resetForm();
            }
          });
      } catch (err) {
        console.log("err: ", err);
      }
    } else {
      console.log("WE ARE UPDATING A CONTACT");
      var contact_name = event.name;
      try {
        await axios
          .put(`${API_URL}/api/contacts/${contact_name}`, {
            name: event.name,
            email: event.email,
            phone: event.phone,
            gender: event.gender,
          })
          .then((res) => {
            console.log(res);
            if (res.data.message === "Contact Info updated") {
              // Refreshes the page to update contact list when useEffect is called in ContactList to get all contacts
              window.location.reload();
              //resetForm();
            }
          });
      } catch (err) {
        // If user does not exist, will be catched in here as status returned = 404
        console.log("err: ", err);
        onShowAlert("error");
      }
    }
  };

  // Function to handle when user clicks on Update to update an existing contact.
  var onReset = () => {
    console.log("enter update");
    setUpdate(true);
    console.log(update);
  };

  // Function to handle the case when update boolean is wrongly true
  var resetUpdateValue = () => {
    console.log("enter addition");
    setUpdate(false);
    console.log(update);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", email: "", phone: "", gender: "" });
    }
  }, [formState, reset]);

  var resetForm = () => {
    console.log("Enter reset");
    // document.forms["form"].getElementsByTagName("input").value = "";
    var frm = document.getElementsByName("contact-form")[0];
    frm.reset();
  };

  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: "Can only update Existing Contact",
      show: true,
    });
  }

  return (
    <form
      name="contact-form"
      className="has-text-left"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="field">
        <label className="label">Name</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="text"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 80 })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="hello@mail.com"
            {...register("email", { required: true, maxLength: 80 })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Phone Number</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="98765432"
            {...register("phone", { minLength: 8, maxLength: 8 })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-phone"></i>
          </span>
        </div>
        <p className="help is-primary">
          Phone number has to be exactly 8 digits
        </p>
      </div>
      <div className="field">
        <label className="label">Gender</label>
        <div className="control">
          <label className="radio">
            <input {...register("gender")} type="radio" value="Male" />
            Male
          </label>
          <label className="radio">
            <input {...register("gender")} type="radio" value="Female" />
            Female
          </label>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-link"
            type="submit"
            onClick={resetUpdateValue}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button className="button is-warning" type="submit" onClick={onReset}>
            Update
          </button>
        </div>
        <div className="control">
          <button
            className="button is-link is-light"
            type="button" // to override default behaviour of submitting the form
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="AlertPopup">
        <Alert
          header={"Update Error"}
          btnText={"Close"}
          text={alert.text}
          type={alert.type}
          show={alert.show}
          onClosePress={onCloseAlert}
          pressCloseOnOutsideClick={true}
          showBorderBottom={true}
          alertStyles={{}}
          headerStyles={{}}
          textStyles={{}}
          buttonStyles={{}}
        />
      </div>
    </form>
  );
}

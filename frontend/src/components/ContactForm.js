import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../configs";
import getAllContacts from "./ContactList";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  const [update, setUpdate] = useState(false);

  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [gender, setGender] = useState("");

  const onSubmit = async (event) => {
    console.log(event);

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
  };

  //   function updateContactList() {
  //     getAllContacts();
  //   }

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
          <button className="button is-link" type="submit">
            Submit
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
    </form>
  );
}

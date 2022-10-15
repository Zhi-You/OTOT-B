import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form className="has-text-left" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  );
}

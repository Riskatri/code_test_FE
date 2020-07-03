import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

function Register() {
  const [form, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    redirect: false,
  });

  const handlerSubmit = async (e) => {
    try {
      const result = await axios.post("http://127.0.0.1:7000/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      console.log(result.data);
      if (result.status === 201) {
        alert("register sucessfuly!");
        setStatus({ redirect: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };
  const { register, errors, handleSubmit, getValues } = useForm({
    defaultValues,
  });

  if (status.redirect === true) {
    return <Redirect to="/login" />;
  }
  return (
    <div className=" container row-5  site-title">
      <div className="container col-5 blog-content">
        <h3>REGISTER</h3>
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                value={form.username}
                type="text"
                ref={register({
                  required: "Please, fill your username",
                  minLength: 6,
                  message: "username harus minimal 6",
                })}
                name="username"
                onChange={handleChange}
                class="form-control"
                placeholder="username"
              />
              {errors.username && errors.username.message}
            </div>
            <div className="form-group">
              <input
                value={form.email}
                type="email"
                ref={register({
                  required: "Please, fill your email address",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
                name="email"
                onChange={handleChange}
                class="form-control"
                placeholder="email address"
              />
              {errors.email && errors.email.message}
            </div>
            <div className="form-group">
              <input
                value={form.password}
                type="password"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
                name="password"
                onChange={handleChange}
                class="form-control"
                placeholder="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="form-group">
              <input
                value={form.confirm_password}
                type="password"
                ref={register({
                  required: "Required",
                  validate: (value) => value === getValues().password,
                })}
                name="confirm_password"
                onChange={handleChange}
                class="form-control"
                placeholder="confirm password"
              />
              {errors.password && "password not match"}
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit(handlerSubmit)}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;

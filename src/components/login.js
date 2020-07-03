import React, { useState } from "react";
import axios from "axios";
import { createPersistedState } from "@plq/use-persisted-state";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const [usePersistedState] = createPersistedState(
    "token",
    window.sessionStorage
  );

  const [form, setValues] = useState({
    username: "",
    password: "",
  });
  const [token, getToken] = usePersistedState("token", "");

  const [status, setStatus] = useState({});

  const handlerSubmit = async (e) => {
    try {
      const result = await axios.post("http://127.0.0.1:7000/login", {
        username: form.username,
        password: form.password,
      });
      getToken(result.data);
      setStatus(result.status);
      console.log(result.data.accessToken);
      if (result.status === 200) {
        alert("login sucessfuly!");
        window.location.reload();
      }
    } catch (err) {
      setStatus(err.response.status);
      if (err.response.status === 404) {
        alert("Your account hasbeen blocked");
      } else if (err.response.status === 401) {
        alert("Invalid Password");
      } else if (err.response.status === 400) {
        alert("Invalid Username");
      }
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
    password: "",
  };
  const { register, errors, handleSubmit } = useForm({
    defaultValues,
  });

  if (token) {
    return <Redirect to="/activity" />;
  }
  return (
    <div className=" container row-5 site-title">
      <div className="container col-5 blog-content">
        <h3>LOGIN</h3>
        <div className="card-body ">
          <form onSubmit={(e) => e.preventDefault()}>
            <div class="form-group">
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
                className="form-control"
                placeholder="username"
              />
              {errors.username && errors.username.message}
            </div>
            <div class="form-group">
              <input
                value={form.password}
                type="password"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters",
                  },
                })}
                name="password"
                onChange={handleChange}
                className="form-control"
                placeholder="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit(handlerSubmit)}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

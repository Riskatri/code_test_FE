import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostActivity(props) {
  const [form, setValues] = useState({
    tanggal: "",
    jenis_kegiatan: "",
    durasi: "",
    keterangan: "",
    berat_badan: "",
  });

  //   const [result, setResult] = useState({ status: true, url: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(
        sessionStorage.getItem("persisted_state_hook:token")
      );
      const result = await axios({
        method: "post",
        url: "http://127.0.0.1:7000/activity",
        data: {
          tanggal: form.tanggal,
          jenis_kegiatan: form.jenis_kegiatan,
          durasi: form.durasi,
          keterangan: form.keterangan,
          berat_badan: form.berat_badan,
        },
        headers: {
          Authorization: token.token.accessToken,
        },
      });
      console.log(result);

      if (result.status === 201) {
        alert("Data inserted sucessfuly!");
        window.location.reload("/");
      } else {
        throw new Error("Failed to insert data!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlerChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="container mt-5 ml-10">
        <div className="card-header bg-light">
          {/* <div className="card-header bg-light text-white"> */}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <label> Tanggal: </label>
              <input
                value={form.tanggal}
                type="date"
                required
                pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
                name="tanggal"
                onChange={handlerChange}
                className="style1"
              />

              <div className="form-group">
                <label> Jenis Kegiatan </label>
                <input
                  value={form.jenis_kegiatan}
                  type="text"
                  name="jenis_kegiatan"
                  onChange={handlerChange}
                  className="style"
                />
                <label className="style"> Keterangan </label>
                <input
                  value={form.keterangan}
                  type="text"
                  name="keterangan"
                  onChange={handlerChange}
                  className="style"
                />
              </div>
              <div className="form-group">
                <label> Durasi</label>
                <input
                  value={form.durasi}
                  type="text"
                  name="durasi"
                  onChange={handlerChange}
                  className="style3"
                />
              </div>

              <div className="form-group">
                <label> Berat Badan</label>
                <input
                  value={form.berat_badan}
                  type="text"
                  name="berat_badan"
                  onChange={handlerChange}
                  className="style4"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                save
              </button>

              <Link to={"/activity"}>
                <button className="btn btn-dark">cancel</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default PostActivity;

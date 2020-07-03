import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import { render } from "@testing-library/react";

function showActivity() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [res, setRes] = useState("");

  function deleteActivity(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );

    axios({
      method: "delete",
      url: `http://127.0.0.1:7000/activity/${id}`,
      headers: {
        Authorization: token.token.accessToken,
      },
      data: data,
    });
    alert("Activity has been delete");
    window.location.reload(false);
  }

  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/activity",
        headers: {
          Authorization: token.token.accessToken,
        },
      });
      setData(result.data.data);
      setFiltered(result.data.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
    // console.log(data);
  }, []);

  useEffect(() => {
    const results = filtered.filter((result) =>
      result.jenis_kegiatan.toLowerCase().includes(res)
    );
    setData(results);
  }, [res]);

  onchange = (e) => {
    setRes(e.target.value);
  };

  if (!token) {
    return <Redirect to="/login" />;
  }
  console.log(data);

  const renderTable = () => {
    return data.map((activity, id) => {
      return (
        <tr key={id}>
          <td> {moment(activity.tanggal).format("DD-MM-YYYY")} </td>
          <td> {activity.jenis_kegiatan} </td>
          <td> {activity.durasi} </td>
          <td> {activity.keterangan} </td>
          <td> {activity.berat_badan} </td>
          <td>
            <Link to={"/update/activity/" + activity.id}>
              <button className="button bg-primary">Edit</button>
            </Link>

            <button
              className="button bg-danger"
              onClick={() => deleteActivity(activity.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container mt-5">
      <label> Jenis Kegiatan </label>
      <input
        type="text"
        placeholder="search"
        value={res}
        onChange={onchange}
        className="style"
      />
      <div className="form-group  mt-3">
        <label> Durasi (menit)</label>
        <input
          type="text"
          placeholder="search"
          value={res}
          onChange={onchange}
          className="style"
        />
      </div>

      <div className="container mt-5">
        <Link to={"/post/activity"}>
          <button className="btn btn bg-primary">Tambah Data</button>
        </Link>
        <button className=" btn btn bg-primary">Download </button>
      </div>

      <table className="container table table-striped table-light text-center">
        <tr>
          <th> Tanggal</th>
          <th> Jenis Kegiatan</th>
          <th> Durasi </th>
          <th> Keterangan</th>
          <th> Berat Badan</th>
          <th> Action</th>
        </tr>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default showActivity;

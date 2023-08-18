import React, { useState, useEffect } from "react";
import axios from "axios";
export const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    addressLineOne: "",
    addressLineTwo: "",
    pinCode: "",
    state: "",
  });
  const [updating, setUpdating] = useState(false);
  const [userId, setUserId] = useState(null);

  const getUsers = async () => {
    await axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log({ users });
  useEffect(() => {
    getUsers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const createUser = async () => {
    try {
      const res = await axios.post("/api/users", formData);
      const json = res.data;
      setUsers([...users, json.user]);

      setFormData({
        name: "",
        email: "",
        addressLineOne: "",
        addressLineTwo: "",
        pinCode: "",
        state: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setUserToUpdate = (id) => {
    const user = users.find((m) => m.id === id);
    if (!user) return;

    setUpdating(true);
    setUserId(user.id);

    setFormData(user);
  };
  const updateUser = async () => {
    try {
      const res = await axios.put(`/api/users`, {
        method: "PATCH",
        body: formData,
      });

      if (res.status === 200) {
        const usersCopy = [...users];
        const index = users.findIndex((m) => m.id === userId);
        usersCopy[index] = formData;

        setUsers(usersCopy);
        setFormData({
          name: "",
          email: "",
          addressLineOne: "",
          addressLineTwo: "",
          pinCode: "",
          state: "",
        });
        setUpdating(false);
        setUserId(null);
      } else {
        alert("Data is not updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveData = async (event) => {
    event.preventDefault();
    if (updating) {
      updateUser();
    } else {
      createUser();
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, { method: "DELETE" });

      setUsers(users.filter((m) => m.id !== id));
      setFormData({
        name: "",
        email: "",
        addressLineOne: "",
        addressLineTwo: "",
        pinCode: "",
        state: "",
      });
      setUpdating(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSaveData}>
        <h1>User Information</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address Line 1:</label>
          <textarea
            name="addressLineOne"
            value={formData.addressLineOne}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Address Line 2:</label>
          <textarea
            name="addressLineTwo"
            value={formData.addressLineTwo}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>PinCode:</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
      </form>
      <div className="container mt-4">
        <h2> User Data </h2>
        <table className="table table-striped table-hover">
          <thead className="">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>Pincode</th>
              <th>State</th> */}
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => {
              return (
                <tr key={item.id} className="">
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.addressLineOne}</td>
                  <td>{item.addressLineTwo}</td>
                  <td>{item.pinCode}</td>
                  <td>{item.state}</td>
                  <td>
                    <button
                      className="btn btn-warning me-3"
                      onClick={(e) => setUserToUpdate(item.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger me-3"
                      onClick={(e) => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

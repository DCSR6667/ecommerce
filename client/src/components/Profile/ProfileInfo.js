import { helper } from "../../utils/decode";
import css from "../../css/ProfileInfo.module.css";
import { useState } from "react";
import { backendUrl } from "../../utils/url";

const ProfileInfo = () => {
  // Initial login data fetched from helper()
  const login = helper();

  const [displayData, setDisplayData] = useState({
    name: login.name,
    email: login.email,
    password: login.password,
  });

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: login.name,
    email: login.email,
    old_password: "",
    new_password: "",
    _id: login.id,
  });

  const [msg, setMsg] = useState(null);

  const [updateInfo, setUpdateInfo] = useState(false);

  // Handler to update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateHandler = () => {
    if (!updateInfo) {
      setUpdateInfo(true);
      setFormData({ ...formData, old_password: "", new_password: "" });
    } else {
      fetch(`${backendUrl}/update_info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((result) => {
          if (result.data == null) {
            setMsg(result.msg);
            setTimeout(() => {
              setMsg(null);
            }, 3000);
          } else {
            setDisplayData({
              name: result.data.name,
              email: result.data.email,
              password: result.data.password,
            });

            setMsg(result.msg);
            setTimeout(() => {
              setMsg(null);
            }, 3000);
            setUpdateInfo(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={`container ${css["profile-container"]}`}>
      <div className="row justify-content-center">
        {msg != null && (
          <div className={"col-6 border rounded p-3 " + css["msg"]}>{msg}</div>
        )}
      </div>

      <div className="row justify-content-center">
        <div className={`col-6 ${css["profile-card"]}`}>
          <div className={`row ${css["header"]}`}>Profile Info</div>
          <div className={`row ${css["details"]}`}>
            Name: {displayData.name}
          </div>
          <div className={`row ${css["details"]}`}>
            Email: {displayData.email}
          </div>
          <div className={`row ${css["details"]}`}>
            Password: {displayData.password[0]}******
            {displayData.password[displayData.password.length - 1]}
          </div>

          {updateInfo && (
            <form className={`row ${css["details"]}`}>
              <label className={css["vertical"]}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className={css["vertical"]}
                onChange={handleInputChange}
              />
              <label className={css["vertical"]}>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                className={css["vertical"]}
                onChange={handleInputChange}
              />
              <label className={css["vertical"]}>Old Password</label>
              <input
                type="password"
                name="old_password"
                className={css["vertical"]}
                value={formData.old_password}
                onChange={handleInputChange}
              />
              <label className={css["vertical"]}>New Password</label>
              <input
                type="password"
                name="new_password"
                className={css["vertical"]}
                value={formData.new_password}
                onChange={handleInputChange}
              />
            </form>
          )}

          <div className="row mt-4">
            <button
              onClick={updateHandler}
              className={`btn btn-primary ${css["update-btn"]}`}
            >
              Update Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

import css from "../css/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { helper } from "../utils/decode.js";

const Navbar = () => {
  const navigate = useNavigate();
  var login = helper();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div class={"container-fluid p-2 " + css["box"]}>
      <div class="row ">
        <div className="col-4 mt-1">
          <Link className={css["title1"]} to="/">
            Fashion Verge
          </Link>
        </div>

        <div className="col-8">
          <div className="row">
            <div className="col-3 offset-1">
              <Link to={"/"} className={css["link"]}>
                <div class={css["title_service"] + " p-2"}>Product List</div>
              </Link>
            </div>

            <div className="col-2">
              <Link to="/wish_list" className={css["link"]}>
                <div class={css["title_service"] + " p-2"}>Wish List</div>
              </Link>
            </div>
            <div className="col-2">
              <Link to="/cart" className={css["link"]}>
                <div class={css["title_service"] + " p-2"}>Cart</div>
              </Link>
            </div>

            {/* {login != null && (
              <div className="col-2">
                <Link to="/profile" className={css["link"]}>
                  <div class={css["title_service"] + " p-2"}>Profile</div>
                </Link>
              </div>
            )} */}

            {/* {<div className="col-2">
                <div
                  onClick={logoutHandler}
                  className={css["title_service"] + " p-2"}
                >
                  Logout
                </div>
              </div>
} */}

            {login == null ? (
              <div className="col-2">
                <Link to="/login/null" className={css["link"]}>
                  <div className={css["title_service"] + " p-2"}>Login</div>
                </Link>
              </div>
            ) : (
              <div className="col-3 dropdown">
                <button
                  type="button"
                  className={"btn  dropdown-toggle " + css["button"]}
                  data-bs-toggle="dropdown"
                >
                  {login.name.split(" ")[0]}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className={"dropdown-item "}
                      style={{ color: "black" }}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <div onClick={logoutHandler} className={"dropdown-item "}>
                      Logout
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

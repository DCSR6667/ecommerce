import Navbar from "../Navbar";
import ProfileInfo from "./ProfileInfo";
import { helper } from "../../utils/decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  var login = helper();
  useEffect(() => {
    if (login == null) {
      var msg = "please login to view profile information";
      navigate("/login/" + msg);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <ProfileInfo />
    </div>
  );
};

export default Profile;

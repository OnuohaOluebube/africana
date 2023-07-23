import { useContext } from "react";
import NavBar from "../Common/NavBar";
import ImagesContext from "../Common/stateProvider";
import { MdAssistantPhoto } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import "./Profile.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const context = useContext(ImagesContext);
  return (
    <div className="profile">
      <NavBar />
      {/* style = {{backgroundImage: `url(${image})`}} */}
      <div className="profile-top">
        <div className="profile-img">
          <img src="/images/blank-profile.webp" alt="profile-img" />
        </div>
        <div className="profile-info">
          <div className="profile-info-heading">
            <h2>
              {context.user.firstname} {context.user.firstname}
            </h2>
            <Link to="/Account">
              <span>
                Edit Profile <BsPencil />
              </span>
            </Link>
          </div>
          <div className="profile-info-p">
            <p>
              Download high quality, beautiful photos curated by{" "}
              {context.user.firstname}.
            </p>
          </div>
        </div>
      </div>
      <div className="profile-middle">
        <ul>
          <li>
            <MdAssistantPhoto />
            Photos
          </li>
          <li>
            <BsStack />
            Collections
          </li>
          <li>
            <BiLike />
            Likes
          </li>
          <li>
            {" "}
            <BiLineChart />
            Stats
          </li>
        </ul>
      </div>
      <div className="profile-buttom"></div>
    </div>
  );
};

export default Profile;

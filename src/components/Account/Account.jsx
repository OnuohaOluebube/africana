import { useContext, useState } from "react";
import Button from "../Common/button";
import Footer from "../LandingPage/Footer";
import Input from "../Common/input";
import "./Account.css";
import ImagesContext from "../Common/stateProvider";

const Account = () => {
  const { user } = useContext(ImagesContext);

  const [data, setData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    location: "",
    portfolio: "",
    Bio: "",
    twitterusername: "",
    igusername: "",
    paypalemail: "",
  });

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.title]: input.value });
  };

  return (
    <div className="account">
      <form action="">
        <div className="profile-row">
          <div className="profile-title">
            <h4>Edit Profile</h4>
          </div>
          <div className="profile-img">
            <img src="/images/blank-profile.webp" alt="profile-img" />
            <p>Change profile image</p>
          </div>

          <div className="profile-col">
            <Input
              label="First name"
              title="firstname"
              value={data.firstname}
              onChange={handleChange}
            />

            <Input
              label="Last name"
              title="lastname"
              value={data.lastname}
              onChange={handleChange}
            />

            <Input label="Email" value={data.email} />
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-title">
            <h4>About</h4>
          </div>
          <div className="profile-col">
            <Input
              label="Location"
              title="location"
              value={data.location}
              onChange={handleChange}
            />
            <label htmlFor="">Bio</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>

          <div className="profile-col">
            <Input
              label="Personal Site/Portfolio"
              title="portfolio"
              placeholder="https://"
              value={data.portfolio}
              onChange={handleChange}
            />

            <Input label="Interest (maximum 3)" placeholder="add a tag" />
            <p>
              Your interests are generated from the types of photos you like,
              collect, and contribute.
            </p>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-title">
            <h4>Social</h4>
          </div>
          <div className="profile-col">
            <Input
              title="Instagram username"
              value={data.igusername}
              onChange={handleChange}
            />
            <p>So that we can feature you on @africana</p>
          </div>
          <div className="profile-col">
            <Input
              title="Twitter username"
              value={data.twitterusername}
              onChange={handleChange}
            />
            <p>So that we can feature you on @africana</p>
          </div>
        </div>

        {/* <div className="profile-row">
          <div className="profile-title">
            <h4>Donations</h4>
          </div>
          <div className="profile-col">
            <Input
              title="Paypal username or email for donation"
              placeholder="name@domain.com"
              value={data.paypalemail}
              onChange={handleChange}
            />
            <p>Note: This email/username will be public</p>
          </div>
        </div> */}

        {/* <div className="profile-title">
          <h4>Messages</h4>
        </div>
        <div className="profile-row">
          <div className="profile-col">
            <Input title="" type="checkBox" />
            <p>Messages will be sent to your email</p>
          </div>
        </div> */}

        <Button name="Update Profile" className="account-btn" />
      </form>
      <Footer />
    </div>
  );
};

export default Account;

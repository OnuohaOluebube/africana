import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "./button";
import { FaSearch } from "react-icons/fa";
import ImagesContext from "./stateProvider";

const NavBar = ({}) => {
  let searchRef = useRef();
  let logoRef = useRef();
  let uploadBtnRef = useRef();
  let roundedProfileRef = useRef();

  const [navActive, setNavActive] = useState(false);
  const imgContext = useContext(ImagesContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setNavActive(window.pageYOffset > 82);
  };

  const handleSignOut = () => {
    localStorage.removeItem("africanaToken");
    localStorage.removeItem("africanaUsername");
    imgContext.setLoggedIn(false);
    imgContext.setUsername("");
  };

  return (
    <nav className={`navigation ${navActive && "navigation-active"}`}>
      <div className="nav-left">
        <Link to="/">
          <h5 className="logo" ref={logoRef}>
            Africana
          </h5>
        </Link>
      </div>

      <div className="nav-right">
        {imgContext.loggedIn && (
          <div className="hero-input-container signedIn">
            <FaSearch
              onClick={() => {
                searchRef.current.classList.add("signedIn-inputactive");
                searchRef.current.focus();
                logoRef.current.classList.add("hide");
                uploadBtnRef.current.classList.add("hide");
              }}
            />
            <input
              ref={searchRef}
              onBlur={() => {
                searchRef.current.classList.remove("signedIn-inputactive");
                logoRef.current.classList.remove("hide");
                uploadBtnRef.current.classList.remove("hide");
              }}
              className="nav-input"
              type="text"
              value={imgContext.searchQuery}
              placeholder="Search for Image by Keyword"
              onChange={(e) => imgContext.setSearchQuery(e.target.value)}
            />
            <div className="upl-and-profile" ref={uploadBtnRef}>
              <Link to="/UploadImg">
                <Button name="Upload" className="nav-button" />
              </Link>

              <p className="nav-rounded-profileImg">{imgContext.username[0]}</p>
            </div>
            <p
              onClick={handleSignOut}
              style={{
                fontSize: "15px",
                margin: "10px",
                color: "red",
              }}
            >
              {" "}
              Sign Out
            </p>
          </div>
        )}

        {!imgContext.loggedIn && (
          <div className="nav-sign-up">
            <Link to="/Registration">
              <Button name="Sign Up" />
            </Link>
            <Link to="/Login">
              <p
                style={{
                  color: `${navActive ? "black" : "white"}`,
                }}
              >
                Login
              </p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

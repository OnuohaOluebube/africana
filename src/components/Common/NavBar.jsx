import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "./button";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import ImagesContext from "./stateProvider";

const NavBar = ({}) => {
  let searchRef = useRef();
  let logoRef = useRef();
  let uploadBtnRef = useRef();
  let roundedProfileRef = useRef();

  const [navActive, setNavActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const context = useContext(ImagesContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setNavActive(window.pageYOffset > 5);
  };

  const handleSignOut = () => {
    localStorage.removeItem("africanaToken");
    context.setLoggedIn(false);
    context.setUser("");
  };
  // const handleSearch = (e) =>{
  //   if(e.keyPress === "Enter"){

  //   }
  // }

  const history = useHistory();

  return (
    <nav className={`navigation ${navActive && "navigation-active"}`}>
      <div className="nav-left">
        <Link to="/">
          <h5 className="logo" ref={logoRef}>
            Africana
          </h5>
        </Link>
      </div>

      <div className="nav-center">
        {/* <div className="hero-input-container signedIn"> */}
        {/* <FaSearch
          className="search-icon"
          onClick={() => {
            searchRef.current.focus();
            logoRef.current.classList.add("hide");
            uploadBtnRef.current.classList.add("hide");
          }}
          /> */}
        <input
          ref={searchRef}
          onBlur={() => {
            searchRef.current.classList.remove("signedIn-inputactive");
            logoRef.current.classList.remove("hide");
            uploadBtnRef.current.classList.remove("hide");
            searchRef.current.classList.add("signedIn-inputactive");
          }}
          className="nav-input"
          type="text"
          value={context.searchQuery}
          placeholder="Search for Image by Keyword"
          onChange={(e) => context.setSearchQuery(e.target.value)}
        />
      </div>

      <div className="nav-hamburger">
        <GiHamburgerMenu
          onClick={() => {
            setShowNavMenu(true);
          }}
        />
      </div>
      {showNavMenu && (
        <div className="mobile-navmenu">
          <ul>
            <li>
              {" "}
              <Link to={context.loggedIn ? "/UploadImg" : "/Login"}>
                <Button name="Upload" className="nav-button" />
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="nav-right">
        <div className="upl-and-profile" ref={uploadBtnRef}>
          <Link to={context.loggedIn ? "/UploadImg" : "/Login"}>
            <Button name="Upload" className="nav-button" />
          </Link>
        </div>
        <div className="nav-signup">
          {context.loggedIn ? (
            <FaUserCircle
              onClick={(e) => {
                setShowModal(true);
                // history.push(`@${context?.user?.email}`);
              }}
              className="loggedin-user"
            />
          ) : (
            <div className="nav-sign-up">
              <Link to="/Registration">
                <span> Siginup /</span>
              </Link>
              <Link to="/Login">
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>

        <div
          style={{ position: "absolute", top: 50 }}
          className="loggedin-modal"
          onClick={(e) => {
            setShowModal(false);
          }}
        >
          {showModal && (
            <ul>
              <li>
                {" "}
                <Link to="/Profile">View profile </Link>
              </li>
              <li>Account Setting</li>
              <li onClick={handleSignOut}>log out</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

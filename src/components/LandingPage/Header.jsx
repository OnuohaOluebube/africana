import React, { Component, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../Common/button";
import { FaSearch } from "react-icons/fa";
import ImagesContext from "../Common/stateProvider";

const Header = () => {
  const ImgContext = useContext(ImagesContext);

  return (
    <header id="header">
      <div className="hero">
        <div className="hero-left">
          <h1>Getting indegenous images should not be a hassle</h1>
          <p>
            We are committed to bringing you the best images from all over
            Africa.
          </p>
          <div className="hero-input-container">
            <FaSearch />
            <input
              value={ImgContext.searchQuery}
              className="header-input"
              type="text"
              placeholder="Search for Image by Keyword"
              onChange={(e) => ImgContext.setSearchQuery(e.target.value)}
            />
          </div>
          {
            <Link to="/Feeds">
              <Button type="submit" name="Search" />
            </Link>
          }
        </div>
        <div className="hero-right imageholder">
          <img src="/images/Rectangle 3.png" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;

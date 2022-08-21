import React, { Component, useContext } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import ImagesContext from "./stateProvider";

const ImageCard = ({ image, extraClassName }) => {
  let history = useHistory();
  function titleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
  const firstname = image?.user?.firstname || "";
  const lastname = image?.user?.lastname || "";
  const fulname = titleCase(firstname + " " + lastname);

  const ImgContext = useContext(ImagesContext);

  return (
    <div className={"imagecardcontainer " + extraClassName}>
      <div className="imagecard">
        <img
          src={image.s3Url}
          alt={image.name}
          onClick={() => {
            history.push(`?ImageId=${image?._id}`);
            ImgContext.setShowModal(true);
            const imageDetail = document.getElementById("imageDetails");
            imageDetail &&
              imageDetail.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        />
        <div className="imagecard-bottom">
          <div className="imagecard-bottom-left">
            <p className="rounded-profileImg ">{fulname[0].toUpperCase()}</p>
            <p>
              <p className="img-card-name">{image.name}</p>
              <p className="img-card-user">{fulname}</p>
            </p>
          </div>
          <a href={image.s3Url} download>
            <BsFillArrowDownSquareFill className="download-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

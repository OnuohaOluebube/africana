import React, { Component, useContext } from "react";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import ImagesContext from "./stateProvider";
import { BiLike } from "react-icons/bi";
import endPoints from "../services/EndPoints";

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

  const context = useContext(ImagesContext);

  const handleLike = async (imgId) => {
    const res = await endPoints.likeImage({ imageId: imgId });
    console.log(res);
  };

  return (
    <div className={"imagecardcontainer " + extraClassName}>
      <div className="imagecard">
        <div className="imagecard-img">
          <img
            src={image.s3Url}
            alt={image.name}
            onClick={() => {
              history.push(`?ImageId=${image?._id}`);
              context.setShowModal(true);
              const imageDetail = document.getElementById("imageDetails");
              imageDetail &&
                imageDetail.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
          />
        </div>
        <div className="imagecard-bottom">
          <div className="imagecard-bottom-left">
            <p className="rounded-profileImg ">{fulname[0].toUpperCase()}</p>
            <p>
              <p className="img-card-user">{fulname}</p>
            </p>
          </div>
          <a href={image.s3Url} download>
            <BsFillArrowDownSquareFill className="download-icon" />
          </a>
          <p>
            <BiLike
              onClick={() => {
                handleLike(image?._id);
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

import React, { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Images.css";
import Button from "../Common/button";
import ImagesContext from "../Common/stateProvider";
import ImageCard from "../Common/ImageCard";

const ImageDetails = () => {
  let ImageId = new URLSearchParams(useLocation().search).get("ImageId");

  const context = useContext(ImagesContext);

  const selectedImage = context.images?.find((img) => img._id === ImageId);

  const sameCategory = context.images?.filter(
    (img) =>
      img.category._id === selectedImage?.category._id &&
      img._id !== selectedImage?._id
  );

  return (
    <div className="imagedetails-page">
      <div className="image-details" id="imageDetails">
        <div className="image-details-left">
          <h2> {selectedImage?.name}</h2>
          <p>{selectedImage?.description}</p>
          <a href={selectedImage?.s3Url} download>
            <Button className="image-details-button" name="Download" />
          </a>
          <div className="image-details-left-bottom">
            <p>Tags</p>
            <div className="image-details-left-bottomboxes">
              <div className="bottomboxes-top">
                {selectedImage?.tags &&
                  selectedImage?.tags.split(",").map((t) => <p>{t}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className="image-details-right">
          <img src={selectedImage?.s3Url} alt={selectedImage?.name} />
        </div>
      </div>

      <div className="image-details-bottomcontainer">
        <p>More Like This</p>
        <div className="image-details-bottom">
          {sameCategory.map((image) => (
            <ImageCard
              image={image}
              extraClassName={"image-details-bottomimg"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;

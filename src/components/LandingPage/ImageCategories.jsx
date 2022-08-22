import React, { Component, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImagesContext from "../Common/stateProvider";
import ImageCard from "../Common/ImageCard";
import Button from "../Common/button";

const ImageCategories = () => {
  const imgContext = useContext(ImagesContext);
  const [categorizedImages, setCategorizedImages] = useState([]);

  useEffect(() => {
    console.log({ "categorized images": imgContext.images });
    const categorizedImages = imgContext.selectedImageCategory
      ? imgContext.images
          .filter(
            (image) => image.category._id === imgContext.selectedImageCategory
          )
          .slice(0, 3)
      : imgContext.images.slice(0, 3);
    setCategorizedImages([...categorizedImages]);
  }, [imgContext.images, imgContext.selectedImageCategory]);

  const categorizedImgUI = categorizedImages.map((image) => {
    return (
      <ImageCard
        handleImageSelect={imgContext.handleImageSelect}
        extraClassName={`imageCardCont${image._id}`}
        key={image._id}
        image={image}
        handleShowModal={imgContext.handleShowModal}
      />
    );
  });

  categorizedImgUI.splice(2, 0);

  return (
    <section className="imagescategories">
      <div className="container">
        <h2 className="categoriesh2">
          Explore Thousands of Categories of image
        </h2>
        <div className="categories">
          {imgContext.imagesCategories?.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                imgContext.handleSelectedImageCategory(category._id);
              }}
              className={` ${
                imgContext.selectedImageCategory === category._id
                  ? "category-btn active"
                  : "category-btn"
              }`}
            >
              {category.name}
            </button>
          ))}
          <Link to="/Feeds" className="category-seeall">
            See all
          </Link>
        </div>
        <div className="categoryimagescontainer">{categorizedImgUI}</div>
        <div className="moreimages">
          <Link to="/Feeds">
            <Button className="moreimages-btn" name="View more images" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageCategories;

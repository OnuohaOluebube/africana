import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImagesContext from "../Common/stateProvider";
import ImageCard from "../Common/ImageCard";

const ImageCategories = () => {
  const context = useContext(ImagesContext);
  const [categorizedImages, setCategorizedImages] = useState([]);

  useEffect(() => {
    console.log({ "categorized images": context.images });
    const categorizedImages = context.selectedImageCategory
      ? context.images
          .filter(
            (image) => image.category._id === context.selectedImageCategory
          )
          .slice(0, 3)
      : context.images.slice(0, 3);
    setCategorizedImages([...categorizedImages]);
  }, [context.images, context.selectedImageCategory]);

  const categorizedImgUI = categorizedImages.map((image) => {
    return (
      <ImageCard
        handleImageSelect={context.handleImageSelect}
        extraClassName={`imageCardCont${image._id}`}
        key={image._id}
        image={image}
        handleShowModal={context.handleShowModal}
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
          {context.imagesCategories?.map((category) => (
            <button
              key={category._id}
              onClick={() => {
                context.handleSelectedImageCategory(category._id);
              }}
              className={` ${
                context.selectedImageCategory === category._id
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
            <p>View All Images</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageCategories;

import React, { useContext } from "react";
import "./feeds.css";
import Masonry from "react-masonry-css";
import ImageCard from "../Common/ImageCard";
import NavBar from "../Common/NavBar";
import Footer from "../LandingPage/Footer";
import ImagesContext from "../Common/stateProvider";

const Feeds = () => {
  const imgContext = useContext(ImagesContext);

  const categorizedImgs = imgContext.selectedImageCategory
    ? imgContext.images.filter(
        (i) => i.category._id === imgContext.selectedImageCategory
      )
    : imgContext.images;

  const categorizedQueriedImgs = categorizedImgs?.filter((img) =>
    img.name.toLowerCase().includes(imgContext.searchQuery.toLowerCase())
  );

  console.log(categorizedQueriedImgs);

  const categorizedImgUI = categorizedQueriedImgs.map((image) => (
    <ImageCard key={image._id} image={image} extraClassName="feeds-card" />
  ));
  const breakpointColumnsObj = {
    default: 3,
    768: 2,
    528: 1,
  };

  return (
    <>
      <section className="feeds">
        <NavBar />
        <div className="container">
          <h2 className="categoriesh2">
            Explore Thousands of Categories of image
          </h2>
          <div className="categories">
            {imgContext.imagesCategories?.map((category) => (
              <button
                key={category._id}
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
          </div>
          {imgContext.searchQuery && (
            <>
              <h3 style={{ textAlign: "center" }}>
                showing results for "{imgContext.searchQuery}"
              </h3>
              <br />
            </>
          )}
          <div className="feeds-imageContainer">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {categorizedImgUI}
            </Masonry>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Feeds;

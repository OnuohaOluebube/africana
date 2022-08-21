import React, { useState, useRef, useEffect } from "react";
import "./UploadImg.css";
import { Link } from "react-router-dom";
import Button from "../Common/button";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import ImagesContext from "../Common/stateProvider";
import endPoints from "../services/EndPoints";
import { useHistory } from "react-router-dom";

const UploadImg = () => {
  let history = useHistory();
  const fileInput = useRef(null);
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgData, setImgData] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const imgContext = useContext(ImagesContext);
  const handleSetTags = (e) => {
    const newTags = [...tags];
    if (e.code === "Enter") {
      newTags.push(e.target.value);
      console.log(newTags);
      setTags(newTags);
      e.target.value = "";
    }
    return;
  };

  const handleDelete = (tag) => {
    const oldTags = [...tags];
    const filteredTags = oldTags.filter((t) => t !== tag);
    setTags(filteredTags);
  };

  const handleUploadDelete = () => {
    setSelectedFile(null);
    setIsSelected(false);
  };

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const uploadImageToS3 = async () => {
    const url = await endPoints.getSignedS3Url();
    await endPoints.uploadToS3(selectedFile, url);
    const imgUrl = url.split("?")[0];
    console.log(url);
    return imgUrl;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const s3Url = await uploadImageToS3();
      const data = { ...imgData, tags: tags.join(","), s3Url };
      const res = await endPoints.createImage(data);
      imgContext.setImages([res, ...imgContext.images]);
      history.push(`/?ImageId=${res?._id}`);
      imgContext.setShowModal(true);
      console.log(data, res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const s = selectedFile?.type;
  let isImageFile = s?.split("/")[0] === "image";

  console.log(selectedFile?.type);

  return (
    <div className="upload">
      <div className="upload-left">
        <Link to="/">
          <h5 className="logo">Africana</h5>
        </Link>
        <h3>Upload a Picture</h3>
        {selectedFile && (
          <div className="upload-previewImg">
            {" "}
            {isImageFile && (
              <img src={URL.createObjectURL(selectedFile)} alt="" />
            )}
            <AiOutlineClose onClick={handleUploadDelete} />
          </div>
        )}
        <div className="upload-description">
          <h6>Picture Title</h6>
          <input
            type="text"
            onChange={(e) => setImgData({ ...imgData, name: e.target.value })}
            placeholder=" Put in title for your picture"
            value={imgData.name}
          />
          <h6>Description</h6>
          <input
            onChange={(e) =>
              setImgData({ ...imgData, description: e.target.value })
            }
            type="text"
            value={imgData.description}
            placeholder=" Briefly describe your picture"
          />
          <h6>Select Category</h6>
          <select
            name="category"
            id=""
            onChange={(e) =>
              setImgData({ ...imgData, categoryId: e.target.value })
            }
          >
            {imgContext?.imagesCategories?.map((cat) => (
              <option value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <h6>Tags</h6>

          <div className="upload-tagcontainer">
            {tags.map((tag) => (
              <div className="upload-tag">
                <p>{tag}</p>

                <AiOutlineClose onClick={() => handleDelete(tag)} />
              </div>
            ))}
          </div>
        </div>

        <input
          className="upload-tag-input"
          type="text"
          placeholder="Add tags"
          onKeyPress={handleSetTags}
        />

        <Button
          onClick={handleSubmit}
          loading={loading}
          className="upload-btn"
          name="Upload"
        />
      </div>

      <div className="upload-right">
        <div className="upload-right-drop">
          <p>Drag and drop image here or</p>
          <input
            type="file"
            name="file"
            id="actual-btn"
            onChange={handleFileInput}
            hidden
          />

          <label for="actual-btn">Upload from gallery</label>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;

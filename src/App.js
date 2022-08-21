import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Index from "./components/LandingPage/Index";
import ImagesContext from "./components/Common/stateProvider";
// import { getCategories } from "./components/utils/getCategories";
import { getImages } from "./components/utils/getImages";
import Feeds from "./components/Feeds/Feeds";
import ImageDetails from "./components/ImageDetails/Images";
import ModalPopup from "./components/Modal/Modal";
import ScrollToTop from "./components/Common/useScrollToTop";
import UploadImg from "./components/UploadImg/UploadImg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RegForm from "./components/Forms/Registration";
import LoginForm from "./components/Forms/Login";
import endPoints from "./components/services/EndPoints";

function App() {
  const [imagesCategories, setImagesCategories] = useState([]);
  const [selectedImageCategory, setSelectedImageCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [queriedImg, setQueriedImg] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("africanaToken");
    const username = localStorage.getItem("africanaUsername");
    console.log("token", token);
    if (!token) return;
    setLoggedIn(true);
    setUsername(username);
  }, []);

  const getCategories = async () => {
    const cats = await endPoints.getCategories();
    console.log(cats);
    return cats;
  };

  useEffect(async () => {
    const cats = await getCategories();
    setImagesCategories([...cats]);
  }, []);

  const fetchImages = async () => {
    const images = await endPoints.getImages();
    setImages(images);
  };

  useEffect(fetchImages, []);

  console.log("my images are", images);

  useEffect(() => {
    const QueriedImg = images?.filter((img) =>
      img.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setQueriedImg(QueriedImg);
  }, [searchQuery]);

  const handleSelectedImageCategory = (category) => {
    setSelectedImageCategory(category);
  };

  const handleImageSelect = (img) => [setSelectedImage(img)];

  const handleCloseUploadModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        <ImagesContext.Provider
          value={{
            imagesCategories,
            images,
            setImages,
            selectedImageCategory,
            handleSelectedImageCategory,
            handleImageSelect,
            showModal,
            setShowModal,
            searchQuery,
            setSearchQuery,
            setLoggedIn,
            loggedIn,
            username,
            setUsername,

            handleCloseUploadModal,
          }}
        >
          <ScrollToTop />
          <ModalPopup showModal={showModal} />
          <ToastContainer />
          <Switch>
            <Route
              path="/Images/:id"
              render={(props) => (
                <div>
                  <ImageDetails {...props} />
                </div>
              )}
            />
            <Route path="/UploadImg">
              <UploadImg />
            </Route>
            <Route path="/Registration">
              <RegForm />
            </Route>
            <Route path="/Login">
              <LoginForm />
            </Route>

            <Route path="/Feeds">
              <Feeds />
            </Route>

            <Route exact path="/">
              <Index />
            </Route>
          </Switch>
        </ImagesContext.Provider>
      </div>
    </Router>
  );
}

export default App;

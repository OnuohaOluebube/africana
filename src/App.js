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

import Feeds from "./components/Feeds/Feeds";
import ImageDetails from "./components/ImageDetails/Images";
import Profile from "./components/Profile/Profile";
import Account from "./components/Account/Account";
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
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("africanaToken");

    if (!token) return;
    setLoggedIn(true);

  }, []);
  useEffect(async() => {
  
const user = await endPoints.getSignedinUser();
setUser(user)


}, [loggedIn]);





  const getCategories = async () => {
    const cats = await endPoints.getCategories();
  
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
            user,
            setUser,

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
            <Route path="/Profile">
              <Profile />
            </Route>
            <Route path="/Account">
              <Account />
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

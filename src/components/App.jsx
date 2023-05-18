import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AppStyled } from './App.module';
import { fetchImages } from './API/service';
import { ColorRing } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (!totalHits) {
          console.log(totalHits, hits);
          toast.error('There are no images for your request');
          return;
        }
        const results = hits.map(
          ({ tags, id, webformatURL, largeImageURL }) => ({
            tags,
            id,
            smallImage: webformatURL,
            largeImage: largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...results]);
        setTotalHits(totalHits);
      })
      .catch(error => {
        toast.error('There was an error fetching images');
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const submitHandler = query => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const onLoadMoreButton = () => {
    setPage(prevtPage => prevtPage + 1);
  };

  const onImageClick = activeImage => {
    setActiveImage(activeImage);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveImage(null);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={submitHandler} />
      <ImageGallery images={images} openModal={onImageClick} />
      {totalHits > images.length && !isLoading && (
        <Button onLoadMoreButton={onLoadMoreButton} />
      )}
      {isLoading && <ColorRing wrapperStyle={{ margin: '0 auto' }} />}
      {showModal && activeImage && (
        <Modal image={activeImage} onClose={closeModal}></Modal>
      )}
      <ToastContainer />
    </AppStyled>
  );
}

export default App;

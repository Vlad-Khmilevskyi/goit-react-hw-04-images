import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.module';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItem
          openModal={openModal}
          key={image.id}
          tags={image.tags}
          smallImage={image.smallImage}
          largeImage={image.largeImage}
        />
      ))}
    </ImageGalleryStyled>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.module';

const ImageGalleryItem = ({ tags, smallImage, largeImage, openModal }) => {
  return (
    <GalleryItem
      onClick={() => openModal({ largeUrl: largeImage, targetAlt: tags })}
    >
      <GalleryItemImg
        src={smallImage}
        alt={tags}
        loading="lazy"
        width={480}
        height={260}
      />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.module';

const Button = ({ onLoadMoreButton }) => {
  return (
    <ButtonLoadMore type="button" onClick={onLoadMoreButton}>
      Load more
    </ButtonLoadMore>
  );
};

export default Button;

Button.propTypes = {
  onLoadMoreButton: PropTypes.func.isRequired,
};

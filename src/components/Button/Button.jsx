import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className={css.Button} type="button">
        Load More
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired
} 
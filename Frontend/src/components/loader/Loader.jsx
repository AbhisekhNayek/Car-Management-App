import PropTypes from "prop-types";

const Loader = ({ width, border }) => {
  return (
    <span
      style={{
        borderTopColor: "transparent",
      }}
      className={`aspect-square ${width} ${
        border || "border-2"
      } border-blue-500 rounded-full animate-spin`}
    ></span>
  );
};

Loader.propTypes = {
  width: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
};

export default Loader;

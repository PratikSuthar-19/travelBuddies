import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";

const Card = ({ trip }) => {
  const { name, destination, tripDays, cost, image, location, totalDays } =
    trip;
  return (
    <div
     className="link"
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "50px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth:"360px"
      }}
    >
      <img
        style={{
          maxHeight: "250px",
          width: "100%",

          borderRadius: "50px",
          marginBottom: "10px",
        }}
        src={
          image ? image : "https://topyourtravel.com/images/images/68.jpg"
        }
        alt={name}
      />
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FiMapPin style={{ fontSize: "18px", marginRight: "5px" }} />
        <span>{destination || location}</span>
      </div>
      <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>{name}</h2>
      <p style={{ color: "#888888" }}>
        {tripDays || totalDays} days | &#x20B9; {cost}
      </p>
    </div>
  );
};

Card.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    destination: PropTypes.string,
    tripDays: PropTypes.number,
    cost: PropTypes.number.isRequired,
    image: PropTypes.string,
    location: PropTypes.string,
    totalDays: PropTypes.number,
  }),
};

export default Card;

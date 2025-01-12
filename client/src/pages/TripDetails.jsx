import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CalendarComponent,
  TouristLocationCard,
  HotelCard,
  ImageCarousel,
  InviteFriend,
} from "../components";

// import { fetchImages } from "../services/unsplashApi";

// import {
//   fetchPlaceLocation,
//   fetchTouristPlaces,
//   fetchHotels,
// } from "../services/rapidApi";

import { getTripById, deleteTrip } from "../services/tripApi";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";

const TripDetails = () => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);

  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();


const dateFormate = (d)=>{
  // Given date in ISO 8601 format
const isoDate = d;

// Create a Date object from the ISO date
const date = new Date(isoDate);

// Extract day, month, and year from the Date object
const day = date.getUTCDate();
const month = date.getUTCMonth() + 1; // getUTCMonth returns 0-based index
const year = date.getUTCFullYear();

// Format the date to DD/MM/YYYY
const formattedDate = `${day}/${month}/${year}`;

console.log(formattedDate); // Output: 30/7/2024
return formattedDate

}

const sd = dateFormate(trip?.startDate)
const ed = dateFormate(trip?.endDate);



  useEffect(() => {
    const fetchTripDetails = async () => {
      setIsLoading(true);

      try {
        const trip = await getTripById(id);
        setTrip(trip);
     
        console.log(trip)
        const [fetchedImages, fetchedTouristPlaces, placeProperty] =
          await Promise.all([
            fetchImages(trip.destination),
            fetchTouristPlaces(trip.destination),
            fetchPlaceLocation(trip.destination),
          ]);

        setImages(fetchedImages);
        setTouristPlaces(fetchedTouristPlaces);

        if (placeProperty && placeProperty.lat && placeProperty.lon) {
          const fetchedHotels = await fetchHotels(
            placeProperty.lat,
            placeProperty.lon
          );
          setHotels(fetchedHotels);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleEdit = () => {
    if (trip?.createdBy === user?._id) {
      navigate(`/trips/${id}/edit`);
    } else {
      // Display an error message or show a notification that the user does not have permission to edit the trip
    }
  };

  const handleDelete = () => {
    if (trip?.createdBy === user?._id) {
      deleteTrip(id)
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error deleting trip:", error);
          // Display an error message or show a notification that the trip could not be deleted
        });
    } else {
      // Display an error message or show a notification that the user does not have permission to delete the trip
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="container">Loading...</div>
      ) : (
        <div className="row" style={{ justifyContent: "space-between" }}>
          {/* Left part */}
          <div
            className="inner-container"
            style={{ padding: "2rem", gap: "2rem", minWidth: "60%" ,  border : "1px solid gray", borderRadius : "50px", marginLeft: "1.25rem" }}
          >
            {/* Heading */}
            <div className="row" style={{ width: "100%" }}>
              <div
                className="inner-container"
                style={{ alignItems: "flex-start" }}
              >
                <h1>{trip?.name}</h1>
                <p>{trip?.description}</p>
              </div>
              <div className="row">
                <button className="link" onClick={handleEdit}>Edit</button>
                <button  className="link" onClick={handleDelete}>Delete</button>
                <InviteFriend />
              </div>
            </div>

            {/* Event details */}
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Event Details</h1>
              <div className="row" style={{ gap: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  {[
                    { label: "Start Date", value: sd },
                    { label: "End Date", value: ed },
                    { label: "Created By", value: trip?.createdBy },
                    {
                      label: "Invited friends",
                      value: "No of friends invited",
                    },
                    { label: "Total days", value: `${trip?.totalDays} Days` },
                    { label: "Cost for each", value: trip?.cost },
                  ].map(({ label, value }) => (
                    <div
                      className="glass-effect"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "flex-start",
                        padding: "1rem",
                        borderRadius: "50px",
                        border : "1px solid gray",
                        padding:"1rem"
      
                      }}
                      key={label}
                    >
                      <h4>{label}</h4>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tourist Places */}
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Tourist Places</h1>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {touristPlaces?.slice(0, 3).map((location) => (
                  <TouristLocationCard
                    key={location?.dest_id}
                    image={location?.image_url}
                    description={location?.label}
                    location={`${location?.region}, ${location?.country}`}
                    name={location?.name}
                    numHotels={location?.nr_hotels}
                  />
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Gallery</h1>
              {images?.length > 0 && <ImageCarousel images={images} />}
            </div>
          </div>

          {/* Right part */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "3rem",
              border: "1px solid gray",
              borderRadius : "50px",
              marginRight : "1.25rem"
            }}>


            <div
              className="inner-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              
              }}
            >
              <h1>Trip Duration</h1>
              <div>
                <CalendarComponent
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                />
              </div>
            </div>
            {hotels?.length > 0 && (
              <div
                className="inner-container"
                style={{ alignItems: "flex-start", gap: "1rem" }}
              >
                <h1>Hotels Nearby</h1>
                {hotels?.slice(0, 4).map((hotel) => (
                  <HotelCard
                    key={hotel?.hotel_name}
                    hotelName={hotel?.hotel_name}
                    address={hotel?.address}
                    reviewScore={hotel?.review_score}
                    price={hotel?.min_total_price}
                    imageURL={hotel?.max_photo_url}
                    websiteURL={hotel?.urL}
                    zip={hotel?.zip}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;

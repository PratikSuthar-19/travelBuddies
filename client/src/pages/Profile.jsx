import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserTrips  , getAllTrips} from "../services/tripApi";
import { loginUser, logoutUser } from "../services/userApi";
import { Card } from "../components";



const Profile = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const { user } = userData;

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);


  const gettrips = async() =>{
    await getAllTrips();
  }
  const logout = async() =>{
    await logoutUser();
  }

  // gettrips();


  useEffect(() => {
    setIsLoading(true);

    // Fetch user trips from the server
    getUserTrips(user._id)
      .then((trips) => {
        setTrips(trips);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
        setIsLoading(false);
      });
  }, [user._id]);

  useEffect(() => {
    // Filter trips based on search term
    const filtered = trips.filter((trip) =>
      trip.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrips(filtered);
  }, [trips, searchTerm]);

  const [activeTab, setActiveTab] = useState("trips");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = () => {
    console.log("Edit Profile");
  };

  return (
    <div
      className="container"
      style={{
        padding: "2rem",
      }}
    >
      <div className="row" style={{ gap: "2rem" }}>
        {/* <img
          src="https://source.unsplash.com/random/800x600?people-profilepicture"
          alt="profile pic"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        /> */}
        <div
          className="inner-container"
          style={{
            display : "flex",
            flexDirection : "row",
            gap : "1.5rem",
            alignItems: "flex-end",
            border : "1px solid gray",
            borderRadius : "50px",
            padding : "2rem"

            
          }}
        >
          <h1>{user.name}</h1>
          {/* <p>New Delhi, India</p>
          <p>UI/Visual Design, Product Design, Research</p> */}
          {/* <div className="row">
            <button onClick={handleEdit}>Edit Profile</button>
          </div> */}

<button className="link" onClick={async()=>{await localStorage.clear(); await navigate("/")}}>Logout</button>
        </div>

       
      </div>
      <div
        className="inner-container"
        style={{
          width: "100%",
          padding: "2rem 5rem",
          gap: "2rem",
        }}
      >
        <div className="row" style={{ width: "100%" }}>
          <div
            className="row"
            style={{
              gap: "0.5rem",
            }}
          >
            <button
              // className={`tab ${activeTab === "trips" ? "active" : ""}`}
              // onClick={() => handleTabChange("trips")}
              className="link"
            >
              Your Trips
            </button>

            <div>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="link"
            />
          </div>
          </div>

        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          {/* Render content based on active tab */}
          {activeTab === "trips" && (
            <div
              key={filteredTrips.length}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gridGap: "2rem",
              }}
            >
              {/* Render filtered trips */}
              {
                // If loading, show loading message
                isLoading ? (
                  <p
                    className="row"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2rem",
                    }}
                  >
                    Loading trips...
                  </p>
                ) : // If no trips, show no trips message
                filteredTrips.length === 0 ? (
                  <div
                    className="inner-container"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2rem",
                    }}
                  >
                    <h2>No Trips Found</h2>
                    <Link to="/create-trips" className="link">
                      Create a Trip
                    </Link>
                  </div>
                ) : (
                  // Else, render trips

                  filteredTrips.map((trip) => (
                    <Link key={trip.id} to={`/trips/${trip._id}`}>
                      <Card trip={trip} />
                    </Link>
                  ))
                )
              }
            </div>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default Profile;

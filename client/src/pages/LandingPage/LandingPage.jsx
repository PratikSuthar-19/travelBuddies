import React from 'react'
import { useSelector } from "react-redux";
import { useState , useEffect} from "react";
import { Link } from 'react-router-dom';

import { Card, Header } from "../../components";
import { trips, images, features } from "../../constants";
import {getAllTrips} from "../../services/tripApi"

const LandingPage = () => {

  const [trips , setTrips] = useState([]);

  const getAllTrip = async()=>{
    const trips = await getAllTrips();
    setTrips([... trips]);
  }

 
  useEffect(()=>{
 getAllTrip();
  }, []);
  

  console.log(trips)


  // const user = useSelector((state) => state.user.user);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredTrips = trips?.filter((trip) => {
    console.log(trip.destination)
    const isMatch =
      trip?.destination.toLowerCase().includes(filter.toLowerCase()) ||
      trip?.cost <= parseInt(search);
    return isMatch;
  });

  const displayedTrips = search === "" ? trips : filteredTrips;
  return (

    <>
    <div
    style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor : "white",
      padding: "1.5rem",

      // display: "flex",
      // flexDirection: "column",
      // alignItems: "flex-start",
      // justifyContent: "center",
      // gap: "2rem",
    }}
  >
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="inner-container"
        style={{
          alignItems: "flex-start",
        }}
      >
        {/* <h1>Popular Destinations</h1>
        <p>Vacations to make your experience enjoyable in world</p> */}
      </div>
      <div className="row">
        <input
          className="link"
          type="text"
          id="location-filter"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by location"
        />
        <input
        className="link"
          type="number"
          id="cost-filter"
          value={search}
          onChange={handleSearchChange}
          placeholder="Filter by cost"
        />
      </div>
    </div>
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "2rem",
        marginTop : "1rem"
      }}
    >
      {displayedTrips?.map((trip, index) => {
        return <>
        <Link key={trip.id} to={`/trips/${trip._id}`}>
        <Card key={index} trip={trip} />;
        </Link>
        </>
      })}
    </div>
  </div>

   
      </>

  )
}

export default LandingPage;
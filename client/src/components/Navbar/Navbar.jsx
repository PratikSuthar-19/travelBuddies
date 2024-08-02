import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = ({logOut}) => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
    <div className="navbar-outer">
      <div className="navbar-left">
        <Link to={"/"}>
        <p> TravelBuddy </p>
        </Link>
       
      </div>


      <div className="navbar-right">
        <div className="link">
        <Link> About</Link>
        </div>
        <div className="link">
        <Link to="trips">Trips</Link>
        </div>
       
        {user ? (
         <>
          <div className="link">
          <Link to="/create-trip" >Create Trip</Link>
          </div>
          <div className="link">
          <Link to="/profile">
            Profile
          </Link>
            </div>
        
        </>
       
      ) : (
        <>
         <div className="link">
         <Link to="/login">Login</Link>
            </div>
            <div className="link">
            <Link to="/signup">
            Register
          </Link>
            </div>
        
        </>
      )}
      </div>
    </div>
    </>
  )
}

export default Navbar
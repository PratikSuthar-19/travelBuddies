import { useSelector, useDispatch } from "react-redux";
import { useEffect , useState} from "react";

import { Routes, Route } from "react-router-dom";


import {
  Home,
  Login,
  Signup,
  NotFound,
  CreateTrip,
  Profile,
  TripDetails,
  UpdateTrip, 
} from "./pages";

import {LandingPage} from './pages'





import {  Navbar , FooterBar } from "./components";

import { setUser } from "./store/reducers/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component render
  }, []);

  const[logOut , setLogOut] = useState(true);

  return (
    <div>
      <Navbar logOut={logOut}/>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<LandingPage/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/trips" element={<Trips />} /> */}

        {user && (
          <>
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/trips/:id/edit" element={<UpdateTrip />} />
          </>
        )}

        <Route path="/create-trip" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterBar/>
      {/* <Footer /> */}
    </div>
  );
};

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../store/reducers/userSlice";
import { loginUser } from "../services/userApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    console.log("logi called")
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const user = await loginUser(formData);
      dispatch(setUser(user));
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div  style={{ padding: "1rem" , display: "flex", flexDirection: "column" , gap:"3rem",justifyContent: "center" , alignContent:"center"  , alignItems:"center",marginLeft:"17rem", padding:"8rem 5rem", textAlign : "center", border : "1px solid gray" , borderRadius : "50px" , maxWidth:"60vw"
    }}>
      <h1>Login</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          style={{border: "1px solid gray" , borderRadius : "50px", maxWidth : "50vw" }}
        />

        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleInput}
          style={{border: "1px solid gray" , borderRadius : "50px" , maxWidth : "50vw" }}
        />

        <button type="submit" disabled={isLoading} className="link" >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Link to={"/signup"}>
        <span>or</span> Signup
      </Link>
    </div>
  );
};

export default Login;

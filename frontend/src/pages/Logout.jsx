import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    localStorage.removeItem("persist:root");
    const local = localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      if(isLoggedIn)
      {<button onClick={handleLogout}>Logout</button>}
    </>
  );
};

export default Logout;

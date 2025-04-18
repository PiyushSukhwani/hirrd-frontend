import { Button } from "@mantine/core";
import NavLinks from "./nav-links";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotificationMenu from "./NotificationMenu";
import { setUser } from "../../Slices/UserSlice";
import { jwtDecode } from "jwt-decode";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setupResponseInterceptor(navigate, dispatch);
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token != "") {
      const decodedJwt = jwtDecode(token);
      dispatch(setUser({ ...decodedJwt, email: decodedJwt.sub }));
    }

    if (user && token)
    getProfile(user?.profileId)
      .then((res) => {
        dispatch(setProfile(res));
      })
      .catch((err) => console.error(err));
  }, [token, navigate]);

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-24 flex justify-between items-center font-['poppins']">
      <div className="flex gap-3 items-center">
        <Link to={"/"}>
          <img src="/logo_golden.png" alt="LOGO" className="h-14 w-24" />
        </Link>
      </div>
      {<NavLinks />}
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to={"/login"}>
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
        {user && <NotificationMenu />}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;

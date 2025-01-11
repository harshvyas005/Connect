import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
import "../../App.css";

const Navigation = () => {
  const { auth, theme } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("logout");
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <div>
      <div className={`h-screen sticky top-0 `}>
        <div>
          <div className={`py-5`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="48"
              height="48"
            >
              <path d="M23.44 4.83c-.81.36-1.68.6-2.59.71.93-.56 1.64-1.44 1.97-2.5-.87.52-1.83.9-2.85 1.11a4.508 4.508 0 0 0-7.65 4.11c-3.74-.18-7.06-1.98-9.28-4.72a4.495 4.495 0 0 0-.61 2.26c0 1.56.8 2.92 2.02 3.73-.74-.02-1.44-.23-2.05-.57v.06c0 2.17 1.55 3.99 3.62 4.41-.38.1-.78.15-1.18.15-.29 0-.57-.03-.85-.08.57 1.78 2.24 3.07 4.22 3.11a9.048 9.048 0 0 1-5.59 1.94c-.36 0-.73-.02-1.09-.06 2.02 1.3 4.42 2.05 6.97 2.05 8.36 0 12.98-6.93 12.98-12.98 0-.2 0-.4-.02-.59.89-.64 1.66-1.44 2.27-2.36z" />
            </svg>
          </div>
          <div className={`space-y-6 `}>
            {navigationMenu.map((item) => (
              <div
                className={`cursor-pointer flex space-x-3 items-center`}
                onClick={() =>
                  item.title === "Profile"
                    ? navigate(`/profile/${auth.user?.id}`)
                    : navigate(`/${item.title.toLowerCase()}`)
                }
              >
                {item.icon}
                <p className="text-xl">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="py-10">
            <Button
              sx={{
                padding: "8px 20px",
                borderRadius: "20px",
                bgcolor: "#1e88e5",
                display: "inline-block",
              }}
              variant="contained"
              type="submit"
            >
              Tweet
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar alt="username" src={auth.user?.image} />
            <div>
              <p>{auth.user?.fullName}</p>
              <span className="opacity-70">
                @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
              </span>
            </div>

            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

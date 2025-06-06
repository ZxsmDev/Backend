import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ExploreIcon from "@mui/icons-material/Explore";
import StarIcon from "@mui/icons-material/Star";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Reviews", icon: <StarIcon />, path: "/reviews" },
  { label: "Guides", icon: <ExploreIcon />, path: "/guides" },
  { label: "News", icon: <NewspaperIcon />, path: "/news" },
];

const settings = ["Settings", "Logout"];

export default function Navbar({ toggleDrawer, drawerOpen, drawerWidth }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (setting) => {
    handleCloseUserMenu();
    switch (setting) {
      case "Settings":
        navigate("/account");
        break;
      case "Logout":
        // Add logout logic here
        navigate("/login");
        break;
      default:
        break;
    }
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left group */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: "white" }}
            edge="start"
          >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: 5,
            }}
          >
            <Box
              component="img"
              src="/assets/Logo.svg"
              alt="Logo"
              sx={{
                height: 40,
                width: 40,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "rotate(10deg) scale(1.1)",
                  cursor: "pointer",
                },
              }}
              onClick={() => window.location.reload()}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                color: "text.primary",
                textTransform: "uppercase",
                userSelect: "none",
              }}
            >
              SavePoint
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 5 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => {
                  navigate(page.path);
                }}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {page.icon}
                {page.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Right group */}
        <Box sx={{ display: "flex", alignItems: "center", pr: 0, gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton sx={{ color: "white" }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Favorites">
            <IconButton
              sx={{ color: "white" }}
              onClick={() => {
                navigate("/favorites");
              }}
            >
              <BookmarksIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account Options">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ color: "white", p: 1 }}
            >
              <Avatar
                sx={{
                  bgcolor: getRandomColor(),
                  width: 48,
                  height: 48,
                  color: "white",
                }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{
              mt: "45px",
              "& .MuiPaper-root": {
                borderRadius: 2,
                minWidth: 160,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[900]
                    : theme.palette.background.paper,
                boxShadow:
                  "0px 2px 4px rgba(0,0,0,0.1), 0px 8px 16px rgba(0,0,0,0.15)",
                p: 1,
              },
              "& .MuiMenuItem-root": {
                borderRadius: 1,
                px: 2,
                py: 1,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => {
              let icon;
              switch (setting) {
                case "Settings":
                  icon = <SettingsIcon fontSize="small" />;
                  break;
                case "Logout":
                  icon = <LogoutIcon fontSize="small" />;
                  break;
                default:
                  icon = null;
              }

              return (
                <MenuItem
                  key={setting}
                  onClick={() => handleUserMenuClick(setting)}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {icon}
                  <Typography>{setting}</Typography>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

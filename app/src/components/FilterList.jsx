import * as React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  Checkbox,
  Rating,
  Radio,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StarIcon from "@mui/icons-material/Star";

const radioCategories = ["Star Rating", "Price", "Release Date"];

const filterData = [
  {
    label: "Genre",
    options: ["Action", "Adventure", "RPG", "Simulation", "Strategy", "Puzzle"],
  },
  {
    label: "Platform",
    options: ["PC", "PlayStation", "Xbox", "Switch", "Mobile"],
  },
  {
    label: "Rating",
    options: ["Everyone", "Teen", "Mature", "18+", "Unrated"],
  },
  {
    label: "Features",
    options: ["Multiplayer", "Online Co-op", "Crossplay", "Cloud Saves"],
  },
  {
    label: "Price",
    options: ["Free", "Under $20", "$20 - $50", "$50 - $100", "Over $100"],
  },
  {
    label: "Release Date",
    options: ["Last 30 days", "Last 6 months", "Last year", "Older"],
  },
  {
    label: "Development",
    options: ["Indie", "AAA", "Studio"],
  },
  {
    label: "Popularity",
    options: ["Trending", "Most Played", "Top Rated", "New Releases"],
  },
  {
    label: "Accessibility",
    options: [
      "Subtitles",
      "Colorblind Mode",
      "Audio Descriptions",
      "Customizable Controls",
    ],
  },
  {
    label: "Star Rating",
    options: [
      <Rating
        readOnly
        value={0.5}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={1}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={1.5}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={2}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={2.5}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={3}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={3.5}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={4}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={4.5}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
      <Rating
        readOnly
        value={5}
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />,
    ],
  },
];

export default function FilterList({ drawerOpen, drawerWidth, toggleDrawer }) {
  const [openSections, setOpenSections] = React.useState({});
  const [selectedFilters, setSelectedFilters] = React.useState({});
  const [selectedRadios, setSelectedRadios] = React.useState({});

  const handleToggle = (category) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          pt: "64px",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <FilterAltIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Filters</Typography>
      </Toolbar>

      <Divider />
      <List>
        {filterData.map((category) => (
          <React.Fragment key={category.label}>
            <ListItemButton onClick={() => handleToggle(category.label)}>
              <ListItemText primary={category.label} />
              {openSections[category.label] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={openSections[category.label]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {category.options.map((option, index) => {
                  const optionKey = `${category.label}-${index}`;
                  const isRadio = radioCategories.includes(category.label);
                  const selected = isRadio
                    ? selectedRadios[category.label] === optionKey
                    : !!selectedFilters[optionKey];

                  const handleClick = () => {
                    if (isRadio) {
                      setSelectedRadios((prev) => ({
                        ...prev,
                        [category.label]: optionKey,
                      }));
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [optionKey]: !prev[optionKey],
                      }));
                    }
                  };

                  return (
                    <ListItemButton
                      key={optionKey}
                      sx={{ pl: 4 }}
                      onClick={handleClick}
                    >
                      <ListItemIcon>
                        {isRadio ? (
                          <Radio checked={selected} color="success" />
                        ) : (
                          <Checkbox
                            checked={selected}
                            edge="start"
                            disableRipple
                            color="success"
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

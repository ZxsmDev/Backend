import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0: "No Rating",
  0.5: "Terrible",
  1: "Very Bad",
  1.5: "Bad",
  2: "Poor",
  2.5: "Fair",
  3: "Average",
  3.5: "Decent",
  4: "Good",
  4.5: "Great",
  5: "Masterpiece",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function GameRating({ starRating }) {
  const [value, setValue] = React.useState(starRating);

  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <Rating
        name="hover-feedback"
        readOnly
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  );
}

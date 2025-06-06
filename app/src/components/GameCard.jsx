import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Skeleton,
  Stack,
  IconButton,
  Typography,
  Button,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import GameRating from "./GameRating";

export default function GameCardSkeleton({
  key,
  name,
  price,
  genres,
  starRating,
  rating,
  description,
  banner,
  loaded,
}) {
  const [favourite, setFavorite] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return loaded ? (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: 300,
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
          m: 2,
          backgroundColor: "background.paper",
          position: "relative",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 180, objectFit: "cover" }}
          image={banner || "/assets/Logo.svg"}
          alt="Banner"
        />

        <Tooltip
          title={name.length > 15 ? name : ""}
          placement="top"
          arrow
          followCursor
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              pt: 2,
            }}
          >
            <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
              {name.length > 15 ? `${name.slice(0, 15)}...` : name}
            </Typography>

            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "text.secondary",
                fontWeight: "medium",
              }}
            >
              ${price}
            </Typography>
          </Box>
          <Box sx={{ mt: 0.5, ml: 2 }}>
            {genres.map((genre, i) => (
              <Chip key={i} label={genre} size="small" sx={{ mr: 0.5 }} />
            ))}
          </Box>
        </Tooltip>

        <Box sx={{ position: "relative", flexGrow: 1 }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <GameRating starRating={starRating} />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  opacity: hovered ? 0.25 : 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {description}
              </Typography>
            </Stack>
          </CardContent>

          <Box
            sx={{
              position: "absolute",
              bottom: -10,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              px: 2,
              pb: 3,
              pt: 2,
              gap: 0.5,
              display: "flex",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              zIndex: 10,
            }}
          >
            <Button size="small" color="success">
              Details
            </Button>
            <Button size="small" color="success">
              Reviews
            </Button>
            <Button size="small" color="success">
              Guides
            </Button>
          </Box>
        </Box>

        <Tooltip title={rating} placement="right" arrow>
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 10,
              width: 40,
              height: 40,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              px: 2,
              pb: 2,
              pt: 1,
              textAlign: "center",
              justifyContent: "center",
              borderRadius: 1,
              fontWeight: "bold",
              display: "flex",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              zIndex: 10,
            }}
          >
            {rating[0]}
          </Box>
        </Tooltip>

        <Box
          sx={{
            position: "absolute",
            top: 15,
            right: 10,
            width: 40,
            height: 40,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            px: 2,
            pb: 2,
            pt: 2,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            fontWeight: "bold",
            display: "flex",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: 10,
          }}
        >
          <Tooltip
            title={favourite ? "Remove From Favourites" : "Add To Favourites"}
            placement="left"
            arrow
          >
            <IconButton
              aria-label="favorite"
              onClick={() => setFavorite(!favourite)}
            >
              {favourite ? (
                <FavoriteOutlinedIcon color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    </Box>
  ) : (
    <Card
      sx={{
        width: 300,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        m: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "background.paper",
      }}
    >
      {/* Game Cover Image */}
      <Skeleton variant="rectangular" animation="wave" height={180} />

      {/* Header */}
      <Box
        sx={{ px: 2, pt: 2 }}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Stack width="100%">
          <Skeleton variant="text" height={30} width="60%" />
          <Skeleton variant="text" height={20} width="40%" />
        </Stack>
        <Skeleton
          variant="circular"
          width={30}
          height={30}
          sx={{ borderRadius: "50%" }}
        />
      </Box>

      {/* Body */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          {/* Rating stars */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="circular"
                width={20}
                height={20}
                sx={{ borderRadius: "50%" }}
              />
            ))}
          </Stack>

          {/* Description lines */}
          <Skeleton variant="text" height={15} width="90%" animation="wave" />
          <Skeleton variant="text" height={15} width="95%" animation="wave" />
          <Skeleton variant="text" height={15} width="90%" animation="wave" />
          <Skeleton variant="text" height={15} width="80%" animation="wave" />
        </Stack>
      </CardContent>
    </Card>
  );
}

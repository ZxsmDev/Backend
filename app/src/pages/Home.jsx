import * as React from "react";
import FilterList from "../components/FilterList.jsx";
import AppBar from "../components/AppBar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import GameCard from "../components/GameCard.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const drawerWidth = 300;

function App() {
  const [gameList, setGameList] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  React.useEffect(() => {
    fetch("/data/games.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        try {
          const json = JSON.parse(text);
          setGameList(json);
        } catch (err) {
          console.error("Failed to parse JSON:", err.message);
          console.log("Raw response:", text);
        }
      })
      .catch((err) => console.error("Fetch failed:", err.message));
  }, []);
  

  gameList.forEach((game) => {
    game.starRating = Math.round(game.starRating * 2) / 2
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          toggleDrawer={toggleDrawer}
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
        />
        <FilterList
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 5,
            pt: 3,
            marginTop: "64px",
            transition: "margin-left 0.3s ease",
            marginLeft: !drawerOpen ? `-${drawerWidth}px` : "0px",
          }}
        >
          <Searchbar />

          <Box display="flex" flexWrap="wrap" justifyContent="center" mt={3}>
            {gameList.map((game, index) => (
              <GameCard
                key={index}
                name={game.name}
                price={game.price}
                genres={game.genres}
                starRating={game.starRating}
                rating={game.rating}
                description={game.description}
                banner={game.banner}
                loaded={true}
              />
            ))}
            {[
              ...Array(
                drawerOpen ? 24 - gameList.length : 25 - gameList.length
              ),
            ].map((_, i) => (
              <GameCard key={i} loaded={false} />
            ))}
          </Box>

          <Box display="flex" justifyContent="center" m={5}>
            <Pagination count={10} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

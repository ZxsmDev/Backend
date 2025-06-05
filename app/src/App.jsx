import "./App.css";
import List from "./components/FilterList.jsx";
import AppBar from "./components/AppBar.jsx";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          <List />
        </Grid>
        <Grid item>
          <AppBar />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

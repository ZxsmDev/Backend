import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Favorites from "./pages/Favorites.jsx";
import Guides from "./pages/Guides.jsx";
import Login from "./pages/Login.jsx";
import News from "./pages/News.jsx";
import Reviews from "./pages/Reviews.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  );
}

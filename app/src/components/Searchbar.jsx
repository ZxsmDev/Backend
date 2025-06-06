import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const sampleSuggestions = [
  "apple",
  "banana",
  "orange",
  "grape",
  "watermelon",
  "pineapple",
  "mango",
  "blueberry",
  "strawberry",
];

export default function Searchbar() {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input === "") {
      setFiltered([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }
    const filteredSuggestions = sampleSuggestions.filter((item) =>
      item.toLowerCase().startsWith(input.toLowerCase())
    );
    setFiltered(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
    setActiveIndex(-1);
  }, [input]);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleClear() {
    setInput("");
    setFiltered([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function handleClickSuggestion(suggestion) {
    setInput(suggestion);
    setFiltered([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e) {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filtered.length) {
        handleClickSuggestion(filtered[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", margin: "20px auto" }}>
      <TextField
        fullWidth
        inputRef={inputRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        variant="outlined"
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
        InputProps={{
          endAdornment: input && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {showSuggestions && (
        <Paper
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: 200,
            overflowY: "auto",
          }}
          elevation={3}
        >
          <List dense>
            {filtered.map((suggestion, index) => (
              <ListItem
                key={suggestion}
                disablePadding
                selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                <ListItemButton
                  onClick={() => handleClickSuggestion(suggestion)}
                >
                  {suggestion}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

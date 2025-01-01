import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch, error }) => {
  const [city, setCity] = useState("");
  const isLargeScreen = useMediaQuery("(min-width:1500px)");

  const handleSubmit = () => {
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="center"
      marginBottom={10}
      paddingTop={isLargeScreen ? 0 : 5}
    >
      <TextField
        label="City Name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
      />
      <Box display="flex" gap={2}>
        <Button
          sx={{
            border: "2px solid #283593",
            color: "#283593",
            fontWeight: "600",
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 1,
            paddingBottom: 1,
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#283593",
              color: "#fff",
            },
          }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default SearchBar;

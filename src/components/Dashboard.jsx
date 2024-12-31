import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import WeatherTable from "./WeatherTable";
import { fetchWeatherData } from "../utils/api";
import SearchBar from "./searchBar";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city, unit) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city, unit);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("City not found or API error");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = (cityName) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(cityName)) {
      favorites.push(cityName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  console.log("weather Data:", weatherData);

  return (
    <Box sx={{ padding: 3 }}>
      <SearchBar
        onSearch={handleSearch}
        onAddFavorite={handleAddFavorite}
        error={error}
      />
      {error && <Typography color="error">{error}</Typography>}

      {loading ? (
        <CircularProgress />
      ) : (
        weatherData && <WeatherTable weatherData={weatherData} />
      )}
    </Box>
  );
};

export default Dashboard;

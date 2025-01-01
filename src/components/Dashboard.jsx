import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import WeatherTable from "./WeatherTable";
import { fetchWeatherData } from "../utils/api";
import SearchBar from "./SearchBar";
import { Cookies } from "react-cookie";

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const currentUnit = cookies.get("temperatureUnit") || "metric";
      const data = await fetchWeatherData(city, currentUnit);
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

  return (
    <Box sx={{ padding: 3 }}>
      <SearchBar onSearch={handleSearch} error={error} />
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

import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { fetchWeatherData } from "../utils/api";
import convertTemperature from "../utils/convertTemperature";

const Favorites = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeatherForFavorites = async () => {
      const favoriteCities =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedWeatherData = [];

      for (const cityData of favoriteCities) {
        try {
          const data = await fetchWeatherData(cityData.city, cityData.unit);
          const convertedTemp = convertTemperature(
            data.main.temp,
            cityData.unit
          );

          updatedWeatherData.push({
            city: cityData.city,
            temperature: convertedTemp,
            description: data.weather[0].description,
            unit: cityData.unit,
          });
        } catch (error) {
          console.error(
            "Error fetching weather data for city:",
            cityData.city,
            error
          );
        }
      }

      setWeatherData(updatedWeatherData);
    };

    getWeatherForFavorites();
  }, []); // Run only on component mount

  const removeCity = (cityToRemove) => {
    const favoriteCities = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedCities = favoriteCities.filter(
      (city) => city.city !== cityToRemove
    );
    localStorage.setItem("favorites", JSON.stringify(updatedCities));

    // Update weatherData state instead of reloading the page
    setWeatherData((prevData) =>
      prevData.filter((city) => city.city !== cityToRemove)
    );
  };

  const clearAllCities = () => {
    localStorage.removeItem("favorites");
    setWeatherData([]); // Clear weatherData instead of reloading the page
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginBottom: 2, paddingLeft: 2 }}
      >
        Favorite Cities
      </Typography>

      <Box sx={{ marginBottom: 2, paddingLeft: 2 }}>
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
          onClick={clearAllCities}
        >
          Clear All
        </Button>
      </Box>

      {weatherData.length > 0 ? (
        <List sx={{ paddingLeft: 2 }}>
          {weatherData.map((cityData) => {
            const temperature =
              cityData.temperature && !isNaN(cityData.temperature)
                ? cityData.temperature.toFixed(1)
                : null;

            return (
              <ListItem
                key={cityData.city}
                sx={{
                  paddingLeft: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "600", fontSize: 18 }}
                    >
                      {cityData.city}
                    </Typography>

                    {temperature && (
                      <Typography variant="body2">
                        Temperature: {temperature}°
                        {cityData.unit === "metric" ? "C" : "F"}
                      </Typography>
                    )}

                    <Typography variant="body2">
                      Description: {cityData.description}
                    </Typography>
                  </Box>

                  <IconButton
                    color="error"
                    onClick={() => removeCity(cityData.city)}
                    sx={{
                      padding: 0,
                      marginLeft: 2,
                      alignSelf: "center",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography sx={{ paddingLeft: 2 }}>
          No favorite cities added yet.
        </Typography>
      )}
    </Box>
  );
};

export default Favorites;

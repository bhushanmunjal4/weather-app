import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { Cookies } from "react-cookie";

const WeatherTable = ({ weatherData }) => {
  const [unit, setUnit] = useState("metric");
  const [temperature, setTemperature] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const savedUnit = cookies.get("temperatureUnit");
    if (savedUnit) {
      setUnit(savedUnit);
    } else {
      cookies.set("temperatureUnit", "metric", { path: "/" });
    }
  }, []);

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    cookies.set("temperatureUnit", newUnit, { path: "/" });
  };

  useEffect(() => {
    if (weatherData?.main?.temp !== undefined) {
      setTemperature(
        unit === "metric"
          ? weatherData.main.temp
          : (weatherData.main.temp * 9) / 5 + 32
      );
    }
  }, [unit, weatherData]);

  console.log("Weather Data:", weatherData);

  const { name, weather } = weatherData;

  const addCityToFavorites = (city, unit) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const cityExists = currentFavorites.some((fav) => fav.city === city);

    if (!cityExists) {
      currentFavorites.push({
        city,
        unit,
      });

      localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    } else {
      console.log(`${city} is already in your favorites.`);
    }
  };

  if (!weatherData || temperature === null) return null;

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: 20, border: "1px solid #ddd" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}
            >
              City
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                borderBottom: "2px solid black",
                width: 180,
              }}
            >
              Temperature
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                borderBottom: "2px solid black",
                width: 220,
              }}
            >
              Unit
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                borderBottom: "2px solid black",
                width: 220,
              }}
            >
              Add to Favorites
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>
              {temperature.toFixed(1)}° {unit === "metric" ? "C" : "F"}
            </TableCell>
            <TableCell>{weather[0].description}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color={unit === "metric" ? "primary" : "secondary"}
                onClick={toggleUnit}
                sx={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  textTransform: "none",
                  backgroundColor: unit === "metric" ? "#1976d2" : "#f50057",
                  color: "white",
                  "&:hover": {
                    backgroundColor: unit === "metric" ? "#1565c0" : "#d81b60",
                  },
                  width: "100%",
                }}
              >
                Toggle to {unit === "metric" ? "Fahrenheit" : "Celsius"}
              </Button>
            </TableCell>
            <TableCell>
              <Tooltip title="Add this city to your favorites">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => addCityToFavorites(name, unit)}
                  sx={{
                    padding: "8px 24px",
                    borderRadius: "20px",
                    textTransform: "none",
                    backgroundColor: "#388e3c",
                    "&:hover": {
                      backgroundColor: "#2c6e2c",
                    },
                    width: "100%",
                  }}
                >
                  Add to Favorites
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

WeatherTable.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default WeatherTable;

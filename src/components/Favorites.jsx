import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Favorites = () => {
  const favoriteCities = JSON.parse(localStorage.getItem("favorites")) || [];

  const removeCity = (cityToRemove) => {
    const updatedCities = favoriteCities.filter(
      (city) => city.city !== cityToRemove
    );
    localStorage.setItem("favorites", JSON.stringify(updatedCities));
    window.location.reload();
  };

  const clearAllCities = () => {
    localStorage.removeItem("favorites");
    window.location.reload();
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

      {favoriteCities.length > 0 ? (
        <List sx={{ paddingLeft: 2 }}>
          {favoriteCities.map((cityData, index) => {
            const temperature =
              cityData.temperature && !isNaN(cityData.temperature)
                ? cityData.temperature.toFixed(1)
                : null;

            const description = cityData.description || null;

            return (
              <ListItem
                key={index}
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
                        Temperature: {temperature}°{" "}
                        {cityData.unit === "metric" ? "C" : "F"}
                      </Typography>
                    )}

                    {description && (
                      <Typography variant="body2">
                        Description: {description}
                      </Typography>
                    )}
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

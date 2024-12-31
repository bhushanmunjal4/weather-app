import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Favorites = () => {
  const favoriteCities = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginBottom: 2, paddingLeft: 2 }}
      >
        Favorite Cities
      </Typography>
      {favoriteCities.length > 0 ? (
        <List sx={{ paddingLeft: 2 }}>
          {favoriteCities.map((cityData, index) => {
            const temperature =
              cityData.temperature && !isNaN(cityData.temperature)
                ? cityData.temperature.toFixed(1)
                : null;

            const description = cityData.description || null;

            return (
              <ListItem key={index} sx={{ paddingLeft: 0 }}>
                <ListItemText
                  primary={cityData.city}
                  secondary={
                    <>
                      {temperature && (
                        <span>
                          Temperature: {temperature}°{" "}
                          {cityData.unit === "metric" ? "C" : "F"}{" "}
                        </span>
                      )}
                      {description && <span>| Description: {description}</span>}
                    </>
                  }
                />
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

const API_KEY = "f9fbb7c4c1f988da90449c0ff0358d5c";

export const fetchWeatherData = async (city, unit) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("City not found or API error");
  return await response.json();
};

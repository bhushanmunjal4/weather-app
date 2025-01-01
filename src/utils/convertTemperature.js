const convertTemperature = (temp, unit) =>
  unit === "metric" ? temp : (temp * 9) / 5 + 32;

export default convertTemperature;

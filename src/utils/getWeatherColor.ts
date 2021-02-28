import { colors } from '../styles/colors';

const getWeatherColorFromDay = (hours: number): string => {
  const isNight = hours >= 19 || hours <= 7;
  const isMorning = hours > 7 && hours < 11;

  if (isNight) {
    return 'Night';
  }
  if (isMorning) {
    return 'Morning';
  }
  return 'Afternoon';
};

export default function getWeatherColor(weather: string): string[] {
  const weatherTime = weather + getWeatherColorFromDay(new Date().getHours());

  switch (weatherTime) {
    case 'clearMorning':
      return colors.sunnyMorning;
    case 'clearAfternoon':
      return colors.sunny;
    case 'clearNight':
      return colors.moonNight;
    case 'cloudsMorning':
    case 'cloudsAfternoon':
      return colors.clouds;
    case 'cloudsNight':
      return colors.cloudyNight;
    case 'rainMorning':
    case 'rainAfternoon':
      return colors.rainy;
    case 'rainNight':
      return colors.rainyNight;
    case 'snowMorning':
    case 'snowAfternoon':
      return colors.snow;
    case 'snowNight':
      return colors.snowNight;
    default:
      return colors.rainy;
  }
}

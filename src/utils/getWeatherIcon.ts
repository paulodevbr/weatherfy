export default function getWeatherIcon(weather: string): string {
  const isNight = new Date().getHours() >= 19 || new Date().getHours() <= 7;

  switch (weather) {
    case 'clear':
      return isNight ? 'moon-outline' : 'sunny-outline';
    case 'clouds':
      return 'cloud-outline';
    case 'rain':
      return 'rainy-outline';
    case 'snow':
      return 'snow-outline';
    default:
      return 'sunny-outline';
  }
}
